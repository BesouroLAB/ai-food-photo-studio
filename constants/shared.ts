// constants/shared.ts
import { Look, StudioType } from '../types';

export const GENERAL_NEGATIVE_KEYWORDS = [
    // Qualidade & Estilo
    "não fotorrealista", "desenho animado", "cartum", "renderização 3d", "desenho", "ilustração", "pintura", "cgi", "vfx",
    "feio", "deformado", "desfigurado", "embaçado", "desfocado", "baixa qualidade", "pixelado", "artefatos jpeg",

    // --- TERMOS RELACIONADOS A TEXTO (PROIBIDO) ---
    // Português
    "texto", "textos", "tipografia", "letras", "caracteres", "escrita", "palavras", "frases",
    "marca d'água", "marcas d'água", "assinatura", "assinaturas", "rubrica",
    "rótulo", "rótulos", "etiqueta", "etiquetas", "logotipo", "logotipos", "logo", "logos",
    "nome de usuário", "nomes de usuário", "fonte", "fontes", "manuscrito",
    "artefato de texto", "texto ilegível", "erros tipográficos", "texto sobreposto", "legenda", "legendas",
    "números", "dígitos", "inscrição",

    // Inglês (para maior abrangência do modelo)
    "text", "typography", "letters", "characters", "writing", "words", "sentences",
    "watermark", "watermarks", "signature", "signatures",
    "label", "labels", "logo", "logos",
    "username", "usernames", "font", "fonts", "handwriting",
    "text artifacts", "unreadable text", "typographical errors", "text overlay", "caption", "captions",
    "numbers", "digits", "inscription"
];

export const STUDIO_NEGATIVE_KEYWORDS: Record<StudioType, string[]> = {
    food: [
        "plastic-looking", "fake food", "waxy texture", "unrealistic shine",
        "cropped plate", "messy food", "extra fingers", "multiple forks", "duplicated items",
        "unnatural colors", "oversaturated", "neon tones",
        "cartoonish", "3D render", "painting style", "low quality", "blurry",
        "pessoa", "homem", "mulher", "rosto", "mãos", "dedos", "figura humana"
    ],
    jewelry: [
        "blurry details", "low resolution", "pixelated edges",
        "extra gems", "duplicated reflections", "distorted shapes", "asymmetry",
        "overexposed", "underexposed", "blown highlights", "flat lighting",
        "plastic look", "fake shine", "cartoon", "illustration", "3D render"
    ],
    cosmetics: [
        "distorted bottles", "deformed labels", "text unreadable", "duplicated caps",
        "neon colors", "oversaturated", "unnatural gloss", "cartoonish textures",
        "stretched shapes", "floating bottles", "warped packaging",
        "3D render", "painting", "plastic toy look", "blurry"
    ],
    electronics: [
        "distorted buttons", "wrong ports", "duplicated screens", "extra logos",
        "warped edges", "stretched screens", "broken perspective",
        "plastic toy look", "unrealistic shine", "matte glitch",
        "cartoon", "sketch", "3D render", "game asset", "low quality"
    ],
    fashion: [
        "deformed fabric", "melted textures", "duplicated buttons/zippers", "messy folds",
        "extra arms/legs", "distorted hands", "unnatural posture", "floating clothes",
        "cartoonish", "illustration", "3D render", "bad anatomy", "unrealistic proportions",
        "low quality", "blurry", "out of frame", "cropped face"
    ],
    people: [
        "extra fingers", "missing limbs", "distorted faces", "asymmetry",
        "waxy skin", "plastic look", "oversmoothed", "blotchy textures",
        "unnatural smile", "creepy eyes", "blank stare",
        "cartoon", "painting", "sketch", "3D render", "mannequin look", "low quality"
    ],
};


export const ASPECT_RATIOS = [
    { value: '1:1', label: 'Quadrado' },
    { value: '3:4', label: 'Vertical' },
    { value: '9:16', label: 'Stories' },
    { value: '16:9', label: 'Horizontal' },
];

export const LOOKS: Look[] = [
    {
        id: 'brilho_natural',
        name: 'Brilho Natural',
        description: 'Aumenta o brilho natural da foto, realçando as cores e o aspecto fresco do prato.',
        adjustments: { brightness: 10, contrast: 5, saturation: 15, warmth: -5, vignette: 0, sharpness: 10 }
    },
    {
        id: 'vibrante_e_apetitoso',
        name: 'Vibrante e Apetitoso',
        description: 'Aumenta a saturação das cores e ajusta os contrastes para dar uma aparência mais vibrante e apetitosa ao prato.',
        adjustments: { brightness: 5, contrast: 15, saturation: 35, warmth: 10, vignette: 5, sharpness: 15 }
    },
    {
        id: 'cinematico',
        name: 'Cinemático',
        description: 'Dá à imagem um toque cinematográfico com um leve desfoque nas bordas e cores mais quentes e suaves.',
        adjustments: { brightness: -5, contrast: 10, saturation: -10, warmth: 15, vignette: 20, sharpness: 5 }
    },
    {
        id: 'preto_e_branco_classico',
        name: 'Preto e Branco Clássico',
        description: 'Transforma a foto em preto e branco, dando um toque clássico e atemporal à imagem.',
        adjustments: { brightness: 0, contrast: 25, saturation: -100, warmth: 0, vignette: 10, sharpness: 15 }
    },
    {
        id: 'vintage',
        name: 'Vintage',
        description: 'Dá à foto uma sensação nostálgica com tons mais quentes e suaves, como uma foto tirada com uma câmera analógica.',
        adjustments: { brightness: -5, contrast: 15, saturation: -20, warmth: 25, vignette: 15, sharpness: 0 }
    },
    {
        id: 'brilho_de_estudio',
        name: 'Brilho de Estúdio',
        description: 'Dá à foto um brilho intenso com contraste refinado, destacando as texturas e as cores do prato.',
        adjustments: { brightness: 15, contrast: 10, saturation: 5, warmth: 0, vignette: 0, sharpness: 10 }
    },
    {
        id: 'sombra_intensa',
        name: 'Sombra Intensa',
        description: 'Cria uma atmosfera dramática, aumentando o contraste e as sombras, o que traz um aspecto mais robusto ao prato.',
        adjustments: { brightness: -10, contrast: 25, saturation: -15, warmth: -10, vignette: 20, sharpness: 20 }
    },
    {
        id: 'brilho_suave',
        name: 'Brilho Suave',
        description: 'Aumenta a suavidade da luz, criando uma sensação acolhedora e agradável.',
        adjustments: { brightness: 10, contrast: -5, saturation: 10, warmth: 10, vignette: 10, sharpness: 0 }
    },
    {
        id: 'cores_destacadas',
        name: 'Cores Destacadas',
        description: 'Destaca uma cor específica do prato, enquanto o resto da imagem permanece em tons neutros.',
        adjustments: { brightness: 10, contrast: 25, saturation: 60, warmth: 15, vignette: 0, sharpness: 20 }
    },
    {
        id: 'clareza_natural',
        name: 'Clareza Natural',
        description: 'Aumenta a nitidez e a clareza do prato, destacando as texturas e detalhes mais finos.',
        adjustments: { brightness: 0, contrast: 5, saturation: 0, warmth: 0, vignette: 0, sharpness: 30 }
    },
    {
        id: 'pos_impressao',
        name: 'Pós-Impressão',
        description: 'Dá um toque de suavidade e profundidade à imagem, como se fosse uma foto impressa.',
        adjustments: { brightness: 0, contrast: 10, saturation: -15, warmth: 10, vignette: 5, sharpness: 5 }
    },
    {
        id: 'alto_contraste',
        name: 'Alto Contraste',
        description: 'Aumenta o contraste da imagem, tornando as áreas escuras mais profundas e as claras mais intensas.',
        adjustments: { brightness: 0, contrast: 40, saturation: 10, warmth: 0, vignette: 0, sharpness: 20 }
    },
    {
        id: 'suave_e_neutro',
        name: 'Suave e Neutro',
        description: 'Cria uma aparência suave, com cores neutras e uma iluminação suave, criando um look clean e minimalista.',
        adjustments: { brightness: 5, contrast: -10, saturation: -30, warmth: -5, vignette: 0, sharpness: 0 }
    },
    {
        id: 'textura_profunda',
        name: 'Textura Profunda',
        description: 'Realça as texturas dos alimentos, aumentando o contraste e destacando as superfícies mais detalhadas.',
        adjustments: { brightness: -5, contrast: 20, saturation: 5, warmth: 0, vignette: 10, sharpness: 40 }
    },
    {
        id: 'escurecer_e_envelhecer',
        name: 'Escurecer e Envelhecer',
        description: 'Cria um efeito envelhecido, com cores mais escuras e um toque de suavização, perfeito para um look vintage.',
        adjustments: { brightness: -15, contrast: 10, saturation: -25, warmth: 20, vignette: 30, sharpness: 0 }
    }
];


export const RANDOM_PROMPT_PARTS: Record<StudioType, {
    templates: string[];
    locations: string[];
    details: string[];
    atmospheres: string[];
}> = {
    food: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'em uma mesa de madeira rústica', 'num balcão de mármore branco de uma cozinha moderna', 'em uma toalha de piquenique xadrez',
            'num café parisiense charmoso', 'em uma bandeja de ardósia escura', 'em uma mesa de fazenda ao ar livre'
        ],
        details: [
            'com frutas vermelhas frescas espalhadas', 'ao lado de talheres de prata vintage e um guardanapo de linho',
            'com ingredientes frescos como manjericão e tomate cereja', 'com uma leve camada de farinha polvilhada',
            'com gotas de azeite e sal grosso', 'com flores comestíveis delicadas'
        ],
        atmospheres: [
            'luz de fim de tarde dourada', 'uma iluminação de estúdio limpa e clara', 'um look dramático com sombras profundas',
            'uma atmosfera aconchegante de manhã de inverno', 'luz natural suave vinda de uma janela grande', 'um brilho quente de velas'
        ],
    },
    jewelry: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'sobre um pedestal de veludo preto', 'em uma superfície de mármore polido', 'sobre uma rocha coberta de musgo em uma floresta',
            'em uma penteadeira antiga com frascos de perfume', 'dentro de uma concha do mar na areia molhada', 'em um bloco de gelo com bolhas de ar presas'
        ],
        details: [
            'com reflexos sutis de uma vitrine de luxo', 'com pétalas de rosa delicadas espalhadas ao redor',
            'com o brilho de um tecido de seda amassado ao fundo', 'com gotas de água criando pequenos prismas de luz',
            'ao lado de cristais brutos e minerais', 'com um fundo de fumaça etérea'
        ],
        atmospheres: [
            'uma única luz de spot dramática', 'luz suave e difusa como a de um dia nublado', 'o brilho quente da golden hour',
            'uma iluminação limpa de estúdio para e-commerce', 'reflexos de luz de neon colorida', 'uma atmosfera subaquática com cáusticos de luz'
        ],
    },
    cosmetics: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'em uma pia de banheiro minimalista com azulejos brancos', 'sobre uma superfície de acrílico holográfico', 'em uma bandeja de espelho com reflexos infinitos',
            'flutuando em água clara com fatias de frutas', 'em uma bancada de laboratório limpa e científica', 'sobre areia rosa texturizada'
        ],
        details: [
            'com uma toalha de linho e uma folha de monstera', 'com pinceladas de textura do produto ao lado',
            'com um fundo de tecido de seda amassado', 'com bolhas de ar e um brilho subaquático',
            'com pipetas e béqueres de vidro ao fundo', 'com sombras geométricas fortes e arquitetônicas'
        ],
        atmospheres: [
            'luz natural de uma janela de banheiro', 'luz dura e direta criando brilhos intensos', 'uma iluminação suave e sonhadora',
            'contraluz que faz o líquido brilhar', 'uma iluminação clínica e de alta tecnologia', 'um brilho suave de fim de tarde'
        ],
    },
    electronics: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'em uma mesa de escritório de design minimalista', 'sobre uma superfície de concreto polido', 'em uma mesa de madeira escura ao lado de um disco de vinil',
            'em um suporte de metal em um estúdio fotográfico', 'em uma bancada de trabalho de ficção científica com hologramas', 'sobre uma rocha no topo de uma montanha'
        ],
        details: [
            'ao lado de um notebook de alumínio e uma xícara de café', 'com sombras arquitetônicas projetadas sobre o produto',
            'com um brilho quente de uma lâmpada Edison', 'com linhas de luz de LED refletindo na superfície',
            'com um fundo de circuito digital brilhante', 'com um vale enevoado e o sol da manhã ao fundo'
        ],
        atmospheres: [
            'ambiente de trabalho limpo e moderno', 'um look industrial e de alto contraste', 'uma atmosfera retrô e aconchegante',
            'uma iluminação de estúdio dramática e premium', 'um ambiente futurista e de alta tecnologia', 'luz natural e aventureira de uma paisagem épica'
        ],
    },
    fashion: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'em um loft industrial em Nova York com janelas grandes', 'em um beco urbano com paredes de grafite', 'em um deserto ao pôr do sol',
            'em um palácio barroco com detalhes dourados', 'em uma rua de paralelepípedos de uma cidade europeia', 'em um estúdio fotográfico com fundo de papel colorido'
        ],
        details: [
            'com sombras arquitetônicas projetadas no fundo', 'com o vento soprando levemente o tecido',
            'com a luz dourada criando um brilho no cabelo', 'com o chão refletindo a arquitetura',
            'com pombos voando ao fundo', 'com uma iluminação de estúdio limpa e precisa'
        ],
        atmospheres: [
            'uma atmosfera editorial de alta moda', 'um look de street style casual e autêntico', 'uma vibe cinematográfica e sonhadora',
            'um ambiente de luxo e opulência', 'uma atmosfera romântica e nostálgica', 'um look vibrante e de alto contraste'
        ],
    },
    people: {
        templates: [
            "[LOCATION], [DETAIL], com [ATMOSPHERE].",
            "Uma cena [ATMOSPHERE] em [LOCATION], destacando [DETAIL].",
            "[LOCATION] com [DETAIL], sob [ATMOSPHERE]."
        ],
        locations: [
            'em uma cafeteria aconchegante com paredes de tijolo', 'em uma biblioteca silenciosa com estantes de livros antigas', 'em um parque ensolarado durante o outono',
            'em um escritório moderno com vista para a cidade', 'em uma varanda com muitas plantas e luz natural', 'em um beco urbano à noite com luzes de neon'
        ],
        details: [
            'lendo um livro com uma xícara de café ao lado', 'com um olhar pensativo para a janela',
            'rindo espontaneamente com amigos', 'concentrado em um laptop',
            'cuidando das plantas com um regador', 'com reflexos coloridos no rosto'
        ],
        atmospheres: [
            'luz suave da janela iluminando a cena', 'o brilho quente de uma lâmpada de filamento', 'a luz dourada e suave do fim de tarde',
            'uma iluminação de escritório limpa e profissional', 'luz natural filtrada por folhas de plantas', 'uma iluminação urbana e vibrante'
        ],
    },
};