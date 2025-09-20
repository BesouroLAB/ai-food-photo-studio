import { GoogleGenAI, Modality } from "@google/genai";
import { ImagePrompt, Slide, ImageObject } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const constructFullPrompt = (prompt: ImagePrompt): string => {
    const keywords = [
        prompt.subject,
        prompt.style,
        ...prompt.camera.prompt_keywords,
        prompt.angle,
        ...prompt.depthOfField.prompt_keywords,
        ...prompt.lighting.prompt_keywords,
        prompt.extraDetails
    ];
    return keywords.filter(Boolean).join(', ');
};

const handleApiError = (error: unknown, context: string): never => {
    console.error(`Error in ${context}:`, error);
    if (error instanceof Error) {
        // Check for specific API error messages if available
        if (error.message.includes('API key not valid')) {
            throw new Error('Chave de API inválida. Verifique suas credenciais.');
        }
        throw new Error(`Falha em ${context}: ${error.message}`);
    }
    throw new Error(`Um erro desconhecido ocorreu durante ${context}.`);
};

export const generateImageFromText = async (prompt: ImagePrompt): Promise<ImageObject> => {
    const fullPrompt = constructFullPrompt(prompt);
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `Professional food photography of ${fullPrompt}`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        const image = response.generatedImages?.[0];
        if (!image?.image?.imageBytes) {
             throw new Error("A API não retornou dados de imagem válidos.");
        }
        return { base64: image.image.imageBytes, mimeType: 'image/jpeg' };
    } catch (error) {
        return handleApiError(error, 'geração de imagem a partir de texto');
    }
};

export const generateSceneFromImage = async (slide: Slide): Promise<ImageObject> => {
    if (!slide.originalImage || !slide.workMode) {
        throw new Error("Imagem original ou modo de trabalho não especificado.");
    }
    
    const basePrompt = constructFullPrompt(slide.prompt);
    let instruction = '';

    if (slide.workMode === 'retoucher') {
        instruction = `Você é uma retocadora digital de elite. Sua tarefa é aprimorar esta fotografia. Regra Crítica: preserve 100% o ângulo da câmera, a composição e a direção da iluminação originais. O prato principal é intocável e deve ser perfeitamente preservado. Com base no prompt "${basePrompt}", aplique as melhorias de estilo, como aprimorar a qualidade da iluminação, ajustar cores e melhorar o fundo para um nível de excelência profissional.`;
    } else { // editor
        instruction = `Você é uma editora de fotos virtual. A imagem fornecida é sua referência visual do produto. Regra Crítica: recrie o prato com 100% de fidelidade em uma cena fotográfica completamente nova, mas PRESERVE O ESTILO E A DIREÇÃO DA ILUMINAÇÃO DA FOTO ORIGINAL. Altere a cena com base nas outras especificações do prompt "${basePrompt}", como o novo ângulo da câmera e o cenário. Ignore as palavras-chave de iluminação no prompt e foque em manter a iluminação original.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
              parts: [
                { inlineData: { data: slide.originalImage.base64, mimeType: slide.originalImage.mimeType } },
                { text: instruction },
              ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (!imagePart?.inlineData) {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            const refusalMessage = textPart?.text || "O modelo não retornou uma imagem. Pode ter recusado o pedido.";
            throw new Error(`Falha na edição da imagem: ${refusalMessage}`);
        }
        return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
    } catch (error) {
        return handleApiError(error, 'geração de cena a partir de imagem');
    }
};


export const refineOrEditGeneratedImage = async (
    generatedImage: ImageObject,
    refinePrompt: string,
    mode: 'refine' | 'edit'
): Promise<ImageObject> => {
    
    const instruction = mode === 'refine'
        ? `Você é uma retocadora digital. Aplique este ajuste sutil à imagem: "${refinePrompt}". Não altere a composição principal, ângulo ou iluminação.`
        : `Você é uma editora de fotos. Altere a imagem com base nesta instrução: "${refinePrompt}". Tente preservar a estética geral da cena se possível.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
              parts: [
                { inlineData: { data: generatedImage.base64, mimeType: generatedImage.mimeType } },
                { text: instruction },
              ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (!imagePart?.inlineData) {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            const refusalMessage = textPart?.text || "O modelo não retornou uma imagem.";
            throw new Error(`Falha no refinamento: ${refusalMessage}`);
        }
        return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
    } catch (error) {
        return handleApiError(error, 'refinamento de imagem');
    }
};