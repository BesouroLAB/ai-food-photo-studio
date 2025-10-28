// services/geminiService.ts
import { GoogleGenAI, Modality, Chat, Type, GenerateContentResponse, Part } from "@google/genai";
import { ImagePrompt, Slide, ImageObject, ChatMessage, ReferenceObject, StudioType, Option } from "../types";
import { STUDIO_CONFIGS, RANDOM_PROMPT_PARTS } from '../constants/index';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const chatInstances = new Map<string, Chat>();

const getChatInstance = (studioType: StudioType): Chat => {
    if (chatInstances.has(studioType)) {
        return chatInstances.get(studioType)!;
    }
    const studioConfig = STUDIO_CONFIGS[studioType];
    const specialty = studioConfig.specialty || 'fotografia';

    const systemInstruction = `Você é um assistente especialista em ${specialty} para a plataforma 'Estúdio AI'. Sua missão é guiar os usuários a criar imagens excepcionais. Responda APENAS a perguntas sobre ${specialty} e sobre como usar as funcionalidades da plataforma. Seja conciso, amigável e técnico. QUANDO você sugerir uma configuração específica e acionável (câmera, ângulo, iluminação ou foco), você DEVE embutir um bloco de ação JSON no final da sua resposta. O formato DEVE ser exatamente: [ACTION]{"type":"APPLY_SETTING","payload":{"setting":"<SETTING_TYPE>","value":"<OPTION_NAME>"}}[/ACTION]. Valores para <SETTING_TYPE>: 'camera', 'angle', 'depthOfField', 'lighting'. <OPTION_NAME> DEVE ser o nome exato de uma das opções. Se a pergunta for sobre qualquer outro assunto, recuse educadamente.`;

    const newChatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
    });

    chatInstances.set(studioType, newChatInstance);
    return newChatInstance;
};

const handleError = (error: any, message: string): never => {
    console.error(message, error);
    if (error instanceof Error) {
        const geminiError = (error as any);
        if (geminiError.message) {
             throw new Error(`${message}: ${geminiError.message}`);
        }
        throw new Error(`${message}: ${error.message}`);
    }
    throw new Error(message);
};

const getPhotographyType = (studioType: StudioType | null): string => {
    if (!studioType) return 'professional photography';
    const specialtyMap: Record<StudioType, string> = {
        food: 'food photography',
        jewelry: 'jewelry photography',
        cosmetics: 'cosmetics photography',
        electronics: 'electronics photography',
        fashion: 'fashion photography',
        people: 'portrait photography',
    };
    return specialtyMap[studioType] || 'professional photography';
};

export const generateStyleSuggestions = async (studioType: StudioType, presetName: string): Promise<string[]> => {
    const photographyType = getPhotographyType(studioType);
    const instruction = `Você é um diretor de arte especialista em ${photographyType}. Para uma foto de '${presetName}', gere 3 sugestões de cenários (style prompts) distintas, criativas e visualmente ricas, em português do Brasil. Cada sugestão deve ter MENOS de 20 palavras. Responda APENAS com um array JSON de strings, e nada mais.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: instruction }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                    },
                },
            }
        });

        const jsonStr = response.text.trim().replace(/```json\n?|\n?```/g, '');
        const suggestions = JSON.parse(jsonStr);
        // Ensure it's an array of strings
        if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'string')) {
            return suggestions;
        }
        throw new Error("A resposta da IA não estava no formato de array de strings esperado.");

    } catch (error) {
        handleError(error, "Falha ao gerar sugestões de estilo.");
    }
};


export const filterConflictingNegativeKeywords = async (sceneDescription: string, negativeKeywords: string[]): Promise<string[]> => {
    if (!sceneDescription.trim()) {
        return negativeKeywords;
    }

    const instruction = `Você é um filtro inteligente para um modelo de IA de geração de imagem. Sua tarefa é analisar a "Descrição da Cena" do usuário e a "Lista de Keywords Negativas" fornecida. Remova da lista CADA keyword negativa que entre em conflito direto com a intenção explícita do usuário no prompt. Por exemplo, se o prompt pede "uma mão segurando uma maçã", você DEVE remover keywords como "mão", "mãos", "dedos", "figura humana". Seja rigoroso. Responda APENAS com a lista final de keywords em formato de um array JSON de strings, e nada mais.

Descrição da Cena: "${sceneDescription}"

Lista de Keywords Negativas: ${JSON.stringify(negativeKeywords)}
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: instruction }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                },
            }
        });
        
        const jsonStr = response.text.trim().replace(/```json\n?|\n?```/g, '');
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Falha ao filtrar keywords negativas, retornando a lista original.", error);
        return negativeKeywords; // Fallback to original list on error
    }
};

export const getHarmonizedKeywords = (prompt: ImagePrompt | null): string[] => {
    if (!prompt) return [];

    // This regex identifies any aperture-related keywords (e.g., "f/1.8", "f/11", "f/2.8 aperture").
    const apertureRegex = /f\/\d+(\.\d+)?(\s?aperture)?/i;

    // 1. The user's choice for Depth of Field is the SINGLE SOURCE OF TRUTH for aperture.
    // We take all keywords from this selection as they are.
    const focusKeywords = prompt.depthOfField.keywords;

    // 2. We take keywords from other settings (camera, angle, lighting),
    // but INTELLIGENTLY FILTER OUT any aperture-related keywords from them.
    // This prevents a camera's default "f/1.8" keyword from conflicting with the user's explicit choice of "f/11" from the focus selector.
    const cameraKeywords = prompt.camera.keywords.filter(kw => !apertureRegex.test(kw));
    const angleKeywords = prompt.angle.keywords.filter(kw => !apertureRegex.test(kw));
    const lightingKeywords = prompt.lighting.keywords.filter(kw => !apertureRegex.test(kw));

    // 3. Combine all keywords. The focusKeywords (containing the correct aperture) are included.
    // Using a Set automatically handles any other simple duplicates (e.g., "soft light" appearing in multiple places).
    const allKeywords = new Set([
        ...cameraKeywords,
        ...angleKeywords,
        ...lightingKeywords,
        ...focusKeywords, // Add the source of truth for aperture here.
    ]);

    // 4. Convert the Set back to an array. The result is a clean, non-conflicting list of keywords.
    return Array.from(allKeywords);
};

const translateToEnglish = async (text: string): Promise<string> => {
    if (!text || !text.trim()) {
        return "";
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following Portuguese text to English. Respond only with the translated text, nothing else. Text: "${text}"`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Translation to English failed, using original text.", error);
        return text; // Fallback to original text on error
    }
};

export const buildFullPrompt = async (prompt: ImagePrompt, studioType: StudioType): Promise<string> => {
    const harmonizedKeywords = getHarmonizedKeywords(prompt);

    const [englishSceneDescription, englishExtraDetails] = await Promise.all([
        translateToEnglish(prompt.sceneDescription),
        translateToEnglish(prompt.extraDetails || '')
    ]);
    
    const mainDescription = `A photorealistic, high-quality, 8k photograph of ${englishSceneDescription}.${englishExtraDetails ? ` ${englishExtraDetails}.` : ''}`;

    let cleanCameraName = prompt.camera.name
        .replace(/\s*\(.*\)\s*/, '')
        .trim();

    const hardwareAndTechRegex = /\b(canon|nikon|sony|fujifilm|fuji|hasselblad|leica|panasonic|ricoh|sigma|pentax|om system|google pixel|iphone|eos|alpha|a7|gr iii|lumix|z7|z8|r5|r6|d850|x2d|xf|iq4|gfx|xt-4|a1|k-1|s3|fp l|\d+mm(\s?f\/\d\.\d)?|f\/\d\.\d(\s?aperture)?|lens|aperture)\b/i;
    const descriptiveKeywords = harmonizedKeywords.filter(kw => !hardwareAndTechRegex.test(kw));
    
    const styleKeywordsPart = descriptiveKeywords.length > 0 
        ? `Style Keywords: ${[...new Set(descriptiveKeywords)].join(', ')}.` 
        : '';
        
    const shotOnPart = `Shot on: ${cleanCameraName}. Angle: ${prompt.angle.name}. Focus: ${prompt.depthOfField.name}. Lighting: ${prompt.lighting.name}. Aspect Ratio: ${prompt.aspectRatio}.`;
    
    const negativeKeywordsPart = `Negative Keywords: ${prompt.negativeKeywords.join(', ')}.`;

    const finalPrompt = [
        mainDescription,
        styleKeywordsPart,
        shotOnPart,
        negativeKeywordsPart,
    ].filter(Boolean).join(' ');

    return finalPrompt;
};

const buildContentRequest = (slide: Slide, extraPrompt: string): { parts: Part[] } => {
    const parts: Part[] = [];

    // 1. Add all image parts first. Order is important.
    if (slide.originalImage) {
        parts.push({ inlineData: { data: slide.originalImage.base64, mimeType: slide.originalImage.mimeType } });
    }
    if (slide.isolationMask) {
        parts.push({ inlineData: { data: slide.isolationMask.base64, mimeType: slide.isolationMask.mimeType } });
    }
    if (slide.referenceObjects && slide.referenceObjects.length > 0) {
        for (const ref of slide.referenceObjects) {
            parts.push({ inlineData: { data: ref.image.base64, mimeType: ref.image.mimeType } });
        }
    }

    // 2. Build the consolidated text prompt.
    let fullPromptText = extraPrompt;
    if (slide.referenceObjects && slide.referenceObjects.length > 0) {
        const refDescriptions = slide.referenceObjects.map(ref => 
            `Use a imagem de referência de um '${ref.role}' com a seguinte instrução: ${ref.description || 'analise visualmente.'}`
        ).join(' ');
        fullPromptText += ` ${refDescriptions}`;
    }
    
    // 3. Add the single, final text part.
    parts.push({ text: fullPromptText });

    return { parts };
};


const processImageResponse = (response: GenerateContentResponse): ImageObject => {
    // Check for safety blocks or other non-SUCCESS finish reasons
    const finishReason = response?.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
         const safetyRatings = response.candidates[0].safetyRatings?.map(r => `${r.category}: ${r.probability}`).join(', ');
        throw new Error(`A geração da imagem falhou. Motivo: ${finishReason}. ${finishReason === 'SAFETY' ? `Detalhes: ${safetyRatings || 'Não especificado'}` : ''}`);
    }

    const imagePart = response?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
        return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
    }
    
    // If we are here, no image was found. Let's provide a more detailed error.
    console.error("Resposta completa da IA (sem imagem):", JSON.stringify(response, null, 2));
    
    // Safely access the text content for a more informative error.
    const textContent = response?.candidates?.[0]?.content?.parts?.find(p => p.text)?.text;

    let errorMessage = '(nenhum conteúdo de imagem ou texto retornado pela IA)';
    if (textContent) {
        errorMessage = `Resposta de texto: ${textContent}`;
    }
    
    throw new Error(`A IA não retornou uma imagem válida. ${errorMessage}`);
};


export const generateImageFromText = async (fullPrompt: string, numberOfImages: 1 | 2 | 4, aspectRatio: string, referenceObjects: ReferenceObject[] = []): Promise<ImageObject[]> => {
    try {
        const parts: Part[] = [];
        let promptText = `Gere uma imagem com base na seguinte descrição: "${fullPrompt}"`;

        if (referenceObjects && referenceObjects.length > 0) {
            const refDescriptions = referenceObjects.map(ref => 
                `Para a imagem de referência de um '${ref.role}', siga esta instrução: ${ref.description || 'use-a como inspiração visual.'}`
            ).join(' ');
            promptText += `\n\nInstruções de Referência: ${refDescriptions}`;
            
            for (const ref of referenceObjects) {
                parts.push({ inlineData: { data: ref.image.base64, mimeType: ref.image.mimeType } });
            }
        }
        
        parts.push({ text: promptText });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const image = processImageResponse(response);
        return [image]; // Retorna um array com a única imagem gerada

    } catch (error) {
        handleError(error, "Falha ao gerar imagem a partir do texto e referências.");
    }
    
    return []; // Should not be reached
};

export const generateSceneFromImage = async (slide: Slide, fullPrompt: string): Promise<ImageObject> => {
    if (!slide.originalImage || !slide.prompt || !slide.studioType) throw new Error("Imagem original e prompt são necessários.");
    const content = buildContentRequest(slide, `Recrie a cena inteira da imagem fornecida. Use o seguinte prompt de estilo como sua principal inspiração para a nova estética: "${slide.prompt.sceneDescription}"`);
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: content, config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao gerar cena a partir da imagem.");
    }
};

export const refineOrEditGeneratedImage = async (image: ImageObject, prompt: string, mode: 'refine' | 'edit', aspectRatio: string, referenceObjects: ReferenceObject[] = []): Promise<ImageObject> => {
    const mainInstruction = mode === 'refine'
        ? `Refine sutilmente a imagem fornecida com esta instrução: "${prompt}"`
        : `Edite a imagem para corresponder a esta nova cena: "${prompt}"`;
    
    const parts: Part[] = [
        { inlineData: { data: image.base64, mimeType: image.mimeType } },
    ];
    
    let fullPromptText = mainInstruction;
    
    if (referenceObjects && referenceObjects.length > 0) {
        for (const ref of referenceObjects) {
            parts.push({ inlineData: { data: ref.image.base64, mimeType: ref.image.mimeType } });
        }
        const refDescriptions = referenceObjects.map(ref => 
            `Use a imagem de referência de um '${ref.role}' com a seguinte instrução: ${ref.description || 'analise visualmente.'}`
        ).join(' ');
        fullPromptText += ` ${refDescriptions}`;
    }
    
    parts.push({ text: fullPromptText });
    
    const content = { parts };
    
    try {
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash-image', 
            contents: content, 
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } 
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, `Falha ao ${mode === 'refine' ? 'refinar' : 'editar'} a imagem.`);
    }
};

export const swapMainElementInImage = async (contextImage: ImageObject, newElementImage: ImageObject, studioType: StudioType): Promise<ImageObject> => {
    const personBasedStudios: StudioType[] = ['fashion', 'people'];
    const isPersonSwap = personBasedStudios.includes(studioType);

    const promptText = isPersonSwap
        ? `Tarefa: Trocar Pessoa. Use a primeira imagem como cena de fundo. Use a segunda imagem como o novo modelo. Na primeira imagem, substitua a pessoa original pelo modelo da segunda imagem. Mantenha o cenário, iluminação, pose e roupas. A integração deve ser fotorrealista.`
        : `Tarefa: Trocar Objeto. Use a primeira imagem como cena de fundo. Use a segunda imagem como o novo objeto. Na primeira imagem, substitua o objeto principal pelo objeto da segunda imagem. Mantenha o estilo do cenário. Adapte sombras e reflexos de forma realista.`;

    const content = {
        parts: [
            { inlineData: { data: contextImage.base64, mimeType: contextImage.mimeType } },
            { inlineData: { data: newElementImage.base64, mimeType: newElementImage.mimeType } },
            { text: promptText }
        ]
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: content,
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] }
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao trocar o elemento principal da imagem.");
    }
};

export const inpaintImage = async (sourceImage: ImageObject, mask: ImageObject, prompt: string, aspectRatio: string): Promise<ImageObject> => {
    const content = { parts: [
        { inlineData: { data: sourceImage.base64, mimeType: sourceImage.mimeType } },
        { inlineData: { data: mask.base64, mimeType: mask.mimeType } },
        { text: `Na área mascarada (branca), aplique a seguinte edição: ${prompt}. Mantenha o resto da imagem inalterado.` }
    ]};
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: content, config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao aplicar inpainting.");
    }
};

export const generateSceneWithIsolation = async (slide: Slide, fullPrompt: string): Promise<ImageObject> => {
    if (!slide.originalImage || !slide.isolationMask || !slide.prompt || !slide.studioType) throw new Error("Faltam dados para gerar a cena isolada.");
    
    const instruction = `Mantenha a área da máscara (segunda imagem) da imagem original (primeira imagem) intacta. Crie um novo cenário ao redor com este estilo: "${slide.prompt.sceneDescription}". Use estes detalhes técnicos: Câmera ${slide.prompt.camera.name}, Ângulo ${slide.prompt.angle.name}, Iluminação ${slide.prompt.lighting.name}.`;
    const content = buildContentRequest(slide, instruction);

    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: content, config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao gerar cena com isolamento.");
    }
};

export const harmonizeIsolatedImage = async (image: ImageObject): Promise<ImageObject> => {
    const content = { 
        parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: "Tarefa: Harmonizar Cena. Analise a imagem e harmonize as cores, iluminação, sombras e reflexos para que o objeto principal se integre perfeitamente ao cenário. A integração deve ser fotorrealista e impecável, fazendo com que o objeto pareça pertencer 100% naturalmente à cena." }
        ] 
    };
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: content, config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao harmonizar a imagem.");
    }
};

export const makeImageMoreNatural = async (image: ImageObject, withImperfections: boolean): Promise<ImageObject> => {
    const instruction = withImperfections
        ? "Tarefa: Aprimorar Fotorrealismo (com Imperfeições). Analise a imagem e torne-a mais autêntica adicionando imperfeições sutis do mundo real. Mantenha a composição e o assunto principal. Adicione detalhes como: micro-assimetrias, variações leves de textura, pequenas partículas de poeira ou pequenos arranhões em superfícies, e uma iluminação ligeiramente menos 'perfeita'. O objetivo é quebrar a perfeição digital da IA e fazer com que pareça uma foto real e humana."
        : "Tarefa: Aprimorar Fotorrealismo (Sutil). Analise a imagem e melhore sutilmente a iluminação, texturas e micro-detalhes para torná-la indistinguível de uma fotografia real de alta qualidade. Mantenha a composição e o assunto principal intactos. O resultado deve ser limpo e polido, mas hiper-realista.";

    const content = { 
        parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: instruction }
        ] 
    };
    try {
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash-image', 
            contents: content, 
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } 
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao tornar a imagem mais natural.");
    }
};

export const subtleUpscaleImage = async (image: ImageObject): Promise<ImageObject> => {
    const content = { 
        parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: "Tarefa: Aumente a resolução da imagem fornecida (upscale 2x). Instruções: Recrie a imagem com o dobro da definição e nitidez. Mantenha a composição, cores e todos os elementos originais com fidelidade absoluta. Remova qualquer artefato de compressão ou ruído digital. O resultado deve ser uma versão limpa, detalhada e de alta resolução da imagem original, sem nenhuma alteração criativa." }
        ] 
    };
    try {
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash-image', 
            contents: content, 
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } 
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao aplicar upscale sutil na imagem.");
    }
};

export const creativeUpscaleImage = async (image: ImageObject): Promise<ImageObject> => {
    const content = { 
        parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: "Tarefa: Aumente a resolução da imagem fornecida (upscale 2x) de forma criativa. Instruções: Mantenha a composição e os elementos principais da imagem original. Ao recriar a imagem em alta definição, adicione detalhes fotorrealistas e micro-texturas que enriqueçam a cena. Por exemplo, adicione texturas mais finas a tecidos, superfícies de madeira, metais, ou detalhes mais nítidos em alimentos e plantas. O objetivo é uma versão de alta resolução que seja visivelmente mais detalhada, complexa e realista que a original, como se tivesse sido fotografada com uma câmera de resolução superior." }
        ] 
    };
    try {
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash-image', 
            contents: content, 
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } 
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao aplicar upscale criativo na imagem.");
    }
};

export const regenerateImage = async (baseImage: ImageObject, settingsOverride: Partial<ImagePrompt>): Promise<ImageObject> => {
    const settingLabels: Partial<Record<keyof ImagePrompt, string>> = {
        camera: 'câmera',
        angle: 'ângulo',
        depthOfField: 'foco',
        lighting: 'iluminação',
    };

    const changes = (Object.keys(settingsOverride) as Array<keyof ImagePrompt>)
        .map(key => {
            const value = settingsOverride[key];
            if (key in settingLabels && typeof value === 'object' && value !== null && 'name' in value) {
                // @ts-ignore
                return `mude ${settingLabels[key]} para "${value.name}"`;
            }
            return null;
        })
        .filter(Boolean)
        .join(', ');

    if (!changes) {
        throw new Error("Nenhuma configuração foi alterada para regenerar a imagem.");
    }

    const instruction = `Recrie a imagem fornecida para refletir as seguintes mudanças: ${changes}. Mantenha o assunto principal e o estilo geral o mais próximo possível do original, mas priorize a aplicação das novas configurações de forma clara.`;

    const content = {
        parts: [
            { inlineData: { data: baseImage.base64, mimeType: baseImage.mimeType } },
            { text: instruction }
        ]
    };
    try {
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash-image', 
            contents: content, 
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } 
        });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao regenerar a imagem com novas configurações.");
    }
};

export const refineImageFocus = async (image: ImageObject, focusLevel: string): Promise<ImageObject> => {
    const content = { 
        parts: [
            { inlineData: { data: image.base64, mimeType: image.mimeType } }, 
            { text: `Ajuste o foco do fundo da imagem para criar um efeito de ${focusLevel}. O objeto principal deve permanecer nítido.` }
        ] 
    };
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: content, config: { responseModalities: [Modality.IMAGE, Modality.TEXT] } });
        return processImageResponse(response);
    } catch (error) {
        handleError(error, "Falha ao refinar o foco.");
    }
};

export const convertFinalPromptToJson = (slide: Slide, finalPromptText: string): string => {
    // This function shows the structure that would be sent to gemini-2.5-flash-image (nano-banana).
    try {
        const parts: Part[] = [];
        const truncate = (b64: string) => b64.substring(0, 40) + '...[TRUNCATED]';

        // Add a placeholder instruction text for clarity
        const instructionPrefix = `[This is a representation of the API payload. The actual instruction text depends on the action taken (e.g., 'Refine', 'Edit', 'Retouch')]. Work Mode: '${slide.workMode || 'creator'}'. Base Style Prompt: `;
        let fullText = instructionPrefix + finalPromptText;

        // In creator mode, there's no originalImage. For others, it's the base.
        const baseImage = slide.workMode !== 'creator' ? slide.originalImage : null;
        if (baseImage) {
            parts.push({ inlineData: { data: truncate(baseImage.base64), mimeType: baseImage.mimeType } });
        }

        if (slide.isolationMask) {
            parts.push({ inlineData: { data: truncate(slide.isolationMask.base64), mimeType: slide.isolationMask.mimeType } });
        }
        
        // Add reference objects and append their descriptions to the text part
        if (slide.referenceObjects && slide.referenceObjects.length > 0) {
            const refDescriptions = slide.referenceObjects.map(ref => {
                parts.push({ inlineData: { data: truncate(ref.image.base64), mimeType: ref.image.mimeType } });
                return `Use the reference image for '${ref.role}' with this instruction: ${ref.description || 'visual analysis.'}`;
            }).join(' \n');
            fullText += `\n\n[Reference Instructions]\n${refDescriptions}`;
        }
        
        parts.push({ text: fullText });

        const apiPayload = {
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT]
            }
        };

        return JSON.stringify(apiPayload, null, 2);

    } catch (error) {
        // Since this is synchronous, it's unlikely to throw an API error, but good practice.
        handleError(error, "Falha ao construir o payload JSON.");
    }
};

export const getChatResponseStream = async function* (history: ChatMessage[], newMessage: string, studioType: StudioType) {
    const formattedHistory = history.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));
    
    try {
        const studioConfig = STUDIO_CONFIGS[studioType];

        const systemInstruction = `Você é um assistente especialista em ${studioConfig.specialty} para a plataforma 'Estúdio AI'. Sua missão é guiar os usuários a criar imagens excepcionais. Responda APENAS a perguntas sobre ${studioConfig.specialty} e sobre como usar as funcionalidades da plataforma. Seja conciso, amigável e técnico. QUANDO você sugerir uma configuração específica e acionável (câmera, ângulo, iluminação ou foco), você DEVE embutir um bloco de ação JSON no final da sua resposta. O formato DEVE ser exatamente: [ACTION]{"type":"APPLY_SETTING","payload":{"setting":"<SETTING_TYPE>","value":"<OPTION_NAME>"}}[/ACTION]. Valores para <SETTING_TYPE>: 'camera', 'angle', 'depthOfField', 'lighting'. <OPTION_NAME> DEVE ser o nome exato de uma das opções. Se a pergunta for sobre qualquer outro assunto, recuse educadamente.`;
        
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: [...formattedHistory, { role: 'user', parts: [{ text: newMessage }] }],
            config: { systemInstruction },
        });
        
        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        handleError(error, "Falha na comunicação com o assistente.");
    }
};