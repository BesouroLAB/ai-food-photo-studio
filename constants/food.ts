// constants/food.ts
import { Option, StudioPreset } from '../types';
import { 
    DessertIcon, MeatIcon, SaladIcon, DrinkIcon, BurgerIcon, PastaIcon, PizzaIcon, 
    SushiIcon, BrazilianFoodIcon, BakeryIcon, BowlIcon, CoffeeIcon,
    CameraIcon,
    TopDownAngleIcon, FortyFiveDegreeAngleIcon, EyeLevelAngleIcon, HighAngleIcon, LowAngleIcon,
    SideViewAngleIcon, ExtremeCloseUpAngleIcon, PovAngleIcon,
    UltraShallowDofIcon, ShallowDofIcon, MediumDofIcon, DeepDofIcon, TiltShiftDofIcon, SelectiveFocusIcon,
    SoftDiffusedLightIcon, BacklightIcon, GoldenHourIcon, LowKeyIcon, StudioLightIcon, SideLightIcon, 
    CandlelightIcon, FlashBounceIcon, MixedLightIcon, NeonLightIcon,
} from '../components/icons';

const FOOD_CAMERAS: Option[] = [
    {
        name: "Hasselblad X2D 100C + 90mm f/2.5",
        short_info: "Médio formato para tons suaves e detalhes macro.",
        keywords: ["hasselblad x2d 100c", "90mm f/2.5 lens", "f/2.5 aperture", "medium format", "soft tones", "pastel colors", "macro detail", "texture accent", "creamy highlights", "soft shadows"],
        negative_keywords: ["non photorealistic", "cartoon", "illustration", "3d render", "oversharpened", "digital look", "harsh shadows", "direct sunlight", "artificial lighting", "sharp background", "deep focus", "everything in focus", "plastic look", "waxy", "rubbery", "greasy glare", "soggy", "overglazed", "unnatural gloss", "halo around dessert", "color cast pink/red shift"],
        icon: CameraIcon,
        technical_details: {
            title: "Hasselblad X2D: A Arte da Cor e Detalhe",
            description: "Uma câmera de médio formato que oferece cores ricas e detalhes surreais. Ideal para sobremesas delicadas, onde a textura e os tons pastéis são cruciais para um resultado etéreo e luxuoso.",
            pro_tips: ["A profundidade de cor de 16-bits captura transições tonais suaves, perfeitas para glacês e cremes.", "A lente de 90mm oferece uma perspectiva natural com compressão suave, ideal para close-ups.", "Use para criar um look editorial e de alta classe."]
        }
    },
    {
        name: "Nikon Z8 + 85mm f/1.8",
        short_info: "Compressão dramática para carnes e pratos robustos.",
        keywords: ["nikon z8", "85mm f/1.8 lens", "f/1.8 aperture", "mirrorless full-frame", "grill char detail", "moist interior", "glistening surface", "smoky highlights", "rich contrast"],
        negative_keywords: ["non photorealistic", "cartoon", "illustration", "bright scene", "flat lighting", "no shadows", "sharp background", "deep focus", "everything in focus", "greasy glare", "overexposed fat", "underexposed meat", "plastic look", "waxy meat surface", "under/overcooked appearance"],
        icon: CameraIcon,
        technical_details: {
            title: "Nikon Z8: O Mestre do Drama",
            description: "Uma combinação poderosa para criar um look dramático e focado. A lente 85mm comprime o fundo, isolando o prato e realçando a textura de carnes grelhadas e assados de forma impactante.",
            pro_tips: ["Ideal para criar um look 'moody' e masculino.", "A compressão da lente torna o fundo cremoso e sem distrações.", "Excelente para capturar o brilho e a suculência da carne."]
        }
    },
    {
        name: "Canon EOS R5 + 50mm f/2.8",
        short_info: "Alta resolução para flat lays nítidos e vibrantes.",
        keywords: ["canon eos r5", "50mm f/2.8 lens", "f/4 aperture", "high resolution", "food photography", "vibrant greens", "fresh texture", "natural sheen", "ingredient detail"],
        negative_keywords: ["non photorealistic", "blurry", "out of focus", "low resolution", "grainy", "noisy", "hard shadows", "direct light", "high contrast", "dramatic", "low key", "blurry background", "shallow depth of field", "plastic look", "oversaturation", "wilted leaves"],
        icon: CameraIcon,
        technical_details: {
            title: "Canon R5: Clareza de Cima a Baixo",
            description: "Com seu sensor de alta resolução de 45MP, a R5 é perfeita para fotos de flat lay onde cada ingrediente precisa estar perfeitamente nítido. A lente de 50mm oferece uma perspectiva natural para composições equilibradas.",
            pro_tips: ["Use para saladas e pratos onde a frescura dos ingredientes é o ponto principal.", "A ciência de cores da Canon garante tons vibrantes e realistas.", "Ideal para fotos que precisam de recortes e ampliações."]
        }
    },
    {
        name: "Panasonic Lumix S5 II + 85mm f/1.8",
        short_info: "Look cinematográfico para bebidas e cenas com pouca luz.",
        keywords: ["panasonic lumix s5 ii", "85mm f/1.8 lens", "f/1.8 aperture", "cinematic color", "low light", "warm tones", "liquid clarity", "droplets", "glass reflections", "rim lighting"],
        negative_keywords: ["non photorealistic", "cartoon", "illustration", "front lighting", "flat light", "sharp background", "deep focus", "everything in focus", "glare", "specular hotspots", "reflection artifacts", "plastic look", "excessive foam", "unnatural bubbles"],
        icon: CameraIcon,
        technical_details: {
            title: "Lumix S5 II: O Mestre do Ambiente Cinematográfico",
            description: "Conhecida por sua ciência de cores de vídeo, a Lumix S5 II cria um look cinematográfico e rico. Combinada com uma lente 85mm, é perfeita para capturar a atmosfera de bebidas em um bar ou restaurante.",
            pro_tips: ["Excelente para capturar o brilho de líquidos com contraluz.", "O desempenho em baixa luz garante imagens limpas mesmo em ambientes escuros.", "Cria um bokeh suave e agradável que isola o copo."]
        }
    },
    {
        name: "Canon EOS R3 + 50mm f/1.4",
        short_info: "Foco rápido e look profissional para lanches.",
        keywords: ["canon eos r3", "50mm f/1.4 lens", "f/1.4 aperture", "balanced colors", "texture", "juicy interior", "melting cheese", "crisp lettuce", "layered structure"],
        negative_keywords: ["non photorealistic", "oversaturated", "dull colors", "cool tones", "blue light", "midday sun", "sharp background", "deep focus", "everything in focus", "soggy bun", "flattened layers", "plastic texture"],
        icon: CameraIcon,
        technical_details: {
            title: "Canon R3: Velocidade e Textura",
            description: "Uma câmera profissional ultrarrápida, ideal para capturar o momento perfeito, como o queijo derretendo. A lente de 50mm f/1.4 oferece um desfoque cremoso e excelente desempenho em baixa luz.",
            pro_tips: ["Aberturas amplas como f/1.4 criam um desfoque de fundo dramático.", "A ciência de cores da Canon é ideal para tons de comida quentes e convidativos.", "Captura detalhes de textura com nitidez impressionante."]
        }
    },
    {
        name: "Canon EOS R6 II + 85mm f/2.0",
        short_info: "Desempenho incrível em baixa luz para pratos quentes.",
        keywords: ["canon eos r6 ii", "85mm f/2.0 lens", "f/2.0 aperture", "low light", "warm tones", "noodle texture", "sauce reflection", "steam detail", "broth clarity"],
        negative_keywords: ["non photorealistic", "harsh shadows", "direct sunlight", "artificial lighting", "sharp background", "deep focus", "everything in focus", "soggy noodles", "unnatural gloss"],
        icon: CameraIcon,
        technical_details: {
            title: "Canon R6 II: A Rainha da Baixa Luz",
            description: "Uma das melhores câmeras para ambientes escuros, como restaurantes. Captura imagens limpas e detalhadas, perfeitas para pratos quentes como massas e ramen, realçando o vapor e o brilho dos molhos.",
            pro_tips: ["A lente 85mm f/2.0 Macro permite tanto retratos do prato quanto detalhes de perto.", "Excelente para criar uma atmosfera aconchegante e convidativa.", "Mantém as cores ricas mesmo em ISOs altos."]
        }
    },
    {
        name: "Sony A7 IV + 35mm f/2.8",
        short_info: "Versátil e nítida para pizzas e flat lays.",
        keywords: ["sony a7 iv", "35mm f/2.8 lens", "f/2.8 aperture", "balanced colors", "texture", "cheese stretch", "crust detail", "melted edges", "pizza toppings sharp"],
        negative_keywords: ["non photorealistic", "oversaturated", "dull colors", "burned cheese", "plastic look", "cheese glare", "floating slice"],
        icon: CameraIcon,
        technical_details: {
            title: "Sony A7 IV: A Workhorse Versátil",
            description: "Uma câmera híbrida fantástica que equilibra resolução e desempenho. A lente de 35mm é ideal para flat lays, capturando a pizza inteira e o ambiente ao redor com clareza.",
            pro_tips: ["Ótima para criar um look de 'food blog' e de estilo de vida.", "A resolução de 33MP oferece flexibilidade para recortes.", "Cores equilibradas que são fáceis de editar."]
        }
    },
    {
        name: "Ricoh GR IIIx + 40mm f/2.8",
        short_info: "Look minimalista e nítido para comida japonesa.",
        keywords: ["ricoh gr iii x", "40mm f/2.8 lens", "f/2.8 aperture", "minimalism", "clean composition", "rice grain detail", "sashimi gloss", "negative space"],
        negative_keywords: ["non photorealistic", "bright scene", "flat lighting", "no shadows", "sharp background", "deep focus", "everything in focus", "plastic sushi look"],
        icon: CameraIcon,
        technical_details: {
            title: "Ricoh GR IIIx: A Essência do Minimalismo",
            description: "Uma câmera compacta de culto com uma lente incrivelmente nítida. A distância focal de 40mm é perfeita para uma perspectiva natural, e sua renderização de imagem favorece composições limpas e minimalistas, ideais para a estética da culinária japonesa.",
            pro_tips: ["Incentiva composições cuidadosas e o uso de espaço negativo.", "A renderização de cores é única e favorece um look sutil e dramático.", "Perfeita para destacar detalhes como o grão do arroz ou o brilho do peixe."]
        }
    },
    {
        name: "Canon EOS R6 II + 50mm f/1.8",
        short_info: "Look natural e quente para comida brasileira.",
        keywords: ["canon eos r6 ii", "50mm f/1.8 lens", "f/2.0 aperture", "low light", "warm tones", "rustic food detail", "rich stew texture", "cultural plating"],
        negative_keywords: ["non photorealistic", "harsh shadows", "direct sunlight", "artificial lighting", "color cast", "oversaturation", "plastic look"],
        icon: CameraIcon,
        technical_details: {
            title: "Canon R6 II + 50mm: O Combo Aconchegante",
            description: "Combinando o excelente desempenho em baixa luz da R6 II com a perspectiva natural da lente 50mm, esta é a configuração ideal para capturar a alma da comida caseira e rústica, como a brasileira.",
            pro_tips: ["Cria uma atmosfera convidativa e familiar.", "Excelente para capturar a textura de pratos como feijoada e moqueca.", "A abertura ampla permite um belo desfoque de fundo."]
        }
    },
    {
        name: "Sony A1 + 105mm f/2.8",
        short_info: "Resolução máxima para texturas de pães.",
        keywords: ["sony a1", "105mm f/2.8 lens", "f/2.8 aperture", "high resolution", "crust detail", "flour dust", "crumb texture", "backlit texture"],
        negative_keywords: ["non photorealistic", "cool tones", "blue light", "midday sun", "sharp background", "deep focus", "everything in focus", "plastic bread", "burnt crust"],
        icon: CameraIcon,
        technical_details: {
            title: "Sony A1: O Rei da Resolução",
            description: "A câmera topo de linha da Sony, com 50MP, captura cada detalhe. Combinada com uma lente macro, é a escolha definitiva para revelar a textura da crosta, as migalhas e a poeira de farinha em pães artesanais.",
            pro_tips: ["Ideal para publicidade e imagens que exigem o máximo de detalhes.", "Use com contraluz para realçar a textura da crosta.", "A alta resolução permite grandes impressões e recortes agressivos."]
        }
    },
    {
        name: "Sigma fp L + 35mm f/2.0",
        short_info: "Cores precisas e detalhes para bowls.",
        keywords: ["sigma fp l", "35mm f/2.0 lens", "f/4 aperture", "color accurate", "fruit detail", "granola texture", "smooth açaí surface"],
        negative_keywords: ["non photorealistic", "oversaturated", "dull colors", "harsh shadows", "direct light", "high contrast", "dramatic", "low key", "plastic fruit", "blurry background"],
        icon: CameraIcon,
        technical_details: {
            title: "Sigma fp L: A Precisão das Cores",
            description: "Com um sensor de 61MP e uma ciência de cores renomada por sua precisão, esta câmera é ideal para pratos coloridos como bowls de açaí, onde a representação fiel das cores das frutas é essencial.",
            pro_tips: ["Perfeita para flat lays onde cada ingrediente precisa estar nítido e com a cor correta.", "A lente de 35mm oferece uma perspectiva ampla e agradável para composições de bowls.", "Seu tamanho compacto incentiva a criatividade."]
        }
    },
    {
        name: "Fujifilm X-H2S + 35mm f/1.4",
        short_info: "Look de filme aconchegante para cafeterias.",
        keywords: ["fujifilm x-h2s", "35mm f/1.4 lens", "f/1.4 aperture", "film look", "soft tones", "pastel colors", "coffee crema detail", "cozy atmosphere", "steam rising"],
        negative_keywords: ["non photorealistic", "harsh colors", "digital look", "oversharpened", "harsh shadows", "direct sunlight", "artificial lighting", "sharp background", "deep focus", "everything in focus"],
        icon: CameraIcon,
        technical_details: {
            title: "Fujifilm X-H2S: A Alma Analógica",
            description: "A combinação do corpo rápido da X-H2S com a lente mágica 35mm f/1.4 da Fuji. É a receita perfeita para criar um look de filme, com cores suaves e uma atmosfera aconchegante, ideal para cenas de cafeteria.",
            pro_tips: ["Use as simulações de filme 'Astia' ou 'Classic Chrome' para um look autêntico.", "A grande abertura de f/1.4 cria um bokeh de fundo incrivelmente suave.", "Excelente para capturar o vapor subindo do café."]
        }
    },
    {
        name: "Sony A7 IV + 100mm f/2.8",
        short_info: "Nitidez e cores equilibradas para frutos do mar.",
        keywords: ["sony a7 iv", "100mm f/2.8 lens", "f/2.8 aperture", "balanced colors", "texture", "shell detail", "moist seafood surface", "garnish sharpness"],
        negative_keywords: ["non photorealistic", "oversaturated", "dull colors", "harsh shadows", "direct sunlight", "artificial lighting", "sharp background", "deep focus", "everything in focus"],
        icon: CameraIcon,
        technical_details: {
            title: "Sony A7 IV: O Equilíbrio Perfeito",
            description: "Uma câmera versátil que oferece excelente qualidade de imagem. A lente macro de 100mm é perfeita para capturar os detalhes delicados e as texturas de frutos do mar, desde a casca de um camarão até o brilho de um peixe fresco.",
            pro_tips: ["A compressão da lente de 100mm ajuda a isolar o prato.", "Cores equilibradas que representam com fidelidade a frescura dos ingredientes.", "Ideal para destacar os detalhes de guarnições e molhos."]
        }
    },
    {
        name: "Google Pixel 8 Pro",
        short_info: "Look computacional realista para café da manhã.",
        keywords: ["google pixel 8 pro", "smartphone camera", "hdr", "realistic color", "morning light", "crumbs detail", "breakfast layout"],
        negative_keywords: ["non photorealistic", "harsh colors", "digital look", "oversharpened", "hard shadows", "direct light", "high contrast", "dramatic", "low key", "sharp background", "deep focus", "everything in focus"],
        icon: CameraIcon,
        technical_details: {
            title: "Pixel 8 Pro: Fotografia Realista",
            description: "O Pixel é conhecido por sua fotografia computacional que visa o realismo. É excelente para capturar cenas de café da manhã em flat lay, com cores precisas e um ótimo alcance dinâmico (HDR) que lida bem com a luz da manhã.",
            pro_tips: ["O look é natural e 'pronto para postar'.", "Lida muito bem com cenas de alto contraste, como luz entrando pela janela.", "Captura pequenos detalhes como migalhas com nitidez."]
        }
    },
    {
        name: "Panasonic Lumix S5 II + 50mm f/1.8",
        short_info: "Look cinematográfico e quente para sopas.",
        keywords: ["panasonic lumix s5 ii", "50mm f/1.8 lens", "f/2.0 aperture", "low light", "warm tones", "steam detail", "broth texture", "bowl reflection"],
        negative_keywords: ["non photorealistic", "front lighting", "flat light", "glare", "reflection hotspots", "overexposed liquid"],
        icon: CameraIcon,
        technical_details: {
            title: "Lumix S5 II: O Mestre do Vapor e Textura",
            description: "Perfeita para pratos quentes, esta câmera captura o vapor e a textura de sopas e caldos com uma qualidade cinematográfica. A lente de 50mm oferece uma perspectiva natural e um belo desfoque.",
            pro_tips: ["Use contraluz para destacar o vapor e a textura do caldo.", "Excelente desempenho em baixa luz para criar uma atmosfera aconchegante.", "As cores quentes e ricas são ideais para comfort food."]
        }
    },
    {
        name: "iPhone 15 Pro",
        short_info: "Look vibrante e nítido para comida mexicana.",
        keywords: ["iphone 15 pro", "smartphone photography", "f/1.8 aperture", "hdr", "vibrant", "social media look", "sharp", "tortilla texture", "salsa gloss", "lime garnish"],
        negative_keywords: ["non photorealistic", "dslr look", "film grain", "soft focus", "analog", "vintage", "soft light", "diffused light", "no shadows", "sharp background", "deep focus", "everything in focus"],
        icon: CameraIcon,
        technical_details: {
            title: "iPhone 15 Pro: Cores Vibrantes para Redes Sociais",
            description: "O iPhone cria imagens prontas para as redes sociais: nítidas, vibrantes e com cores que saltam da tela. É perfeito para pratos coloridos como comida mexicana, onde o HDR ajuda a equilibrar todos os elementos.",
            pro_tips: ["O look é polido e moderno.", "Use a luz direta para realçar o brilho e as texturas dos ingredientes.", "Excelente para close-ups que mostram todos os detalhes de tacos e burritos."]
        }
    },
];

const FOOD_DEPTHS_OF_FIELD: Option[] = [
    { 
        name: "DoF Profundo (Tudo em Foco)", 
        short_info: "Todos os elementos da cena nítidos.", 
        keywords: ["deep depth of field", "sharp everywhere", "f/11", "f/16", "flat lay photography", "table scene focus", "everything in focus"], 
        negative_keywords: ["blurry background", "shallow focus", "lack of context", "out of focus background"],
        icon: DeepDofIcon, 
        technical_details: { title: "Profundidade de Campo Profunda (f/11)", description: "Utilizando uma abertura de lente pequena (ex: f/11, f/16), esta técnica maximiza a área de foco, garantindo que tanto o primeiro plano quanto o fundo da cena fiquem nítidos. É usado quando o cenário é tão importante quanto o prato.", pro_tips: ["Perfeito para fotos de 'flat lay' onde todos os elementos na mesa devem estar nítidos.", "Requer mais luz, então é ideal para ambientes bem iluminados ou uso de tripé.", "Use para contar uma história maior, mostrando o prato em seu contexto."] } 
    },
    { 
        name: "DoF Médio (Foco Equilibrado)", 
        short_info: "Equilíbrio entre prato e fundo.", 
        keywords: ["balanced focus", "f/5.6", "subject and background visible", "natural storytelling focus", "moderate depth of field", "clear subject with blurred background"], 
        negative_keywords: ["too much background blur", "distracting background", "poor separation between food and context", "lack of balance"],
        icon: MediumDofIcon, 
        technical_details: { title: "Profundidade de Campo Moderada (f/5.6)", description: "Um meio-termo (ex: f/5.6) que mantém o prato principal como o foco claro, mas permite que o fundo seja reconhecível, embora suavemente desfocado. É uma escolha versátil e natural para muitas situações.", pro_tips: ["Ótimo para mostrar o prato em um ambiente de restaurante sem que o fundo distraia.", "Funciona bem para ângulos de 45 graus.", "É um bom ponto de partida se você não tem certeza de qual escolher."] } 
    },
    { 
        name: "DoF Raso (Fundo Desfocado)", 
        short_info: "Destaca o prato, borrando o fundo.", 
        keywords: ["shallow depth of field", "blurred background", "creamy bokeh", "f/2.8", "isolated food focus", "gourmet food look", "texture focus"], 
        negative_keywords: ["unfocused background", "overexposed subject", "too much blur", "subject out of focus", "lack of sharpness"],
        icon: ShallowDofIcon, 
        technical_details: { title: "Profundidade de Campo Rasa (f/2.8)", description: "Esta técnica usa uma abertura de lente grande (ex: f/1.8, f/2.8) para criar uma área de foco pequena. O resultado é que o sujeito (o prato) fica nítido, enquanto o fundo se transforma em um borrão suave e artístico, conhecido como 'bokeh'.", pro_tips: ["Ideal para isolar o prato do ambiente e direcionar o olhar do espectador.", "Funciona melhor quando há alguma distância entre o prato e o fundo.", "Luzes no fundo criam um bokeh especialmente bonito."] } 
    },
    { 
        name: "DoF Ultra Raso (Desfoque Extremo)", 
        short_info: "Desfoque máximo para um look etéreo.", 
        keywords: ["ultra shallow depth of field", "dreamy bokeh", "ethereal food photo", "f/1.2", "artistic blur", "extreme focus on detail", "creamy blur"], 
        negative_keywords: ["lack of context", "too much blur", "overexposed subject", "out of focus subject", "shallow subject isolation"],
        icon: UltraShallowDofIcon, 
        technical_details: { title: "DoF Ultra Raso (f/1.2): Desfoque Extremo", description: "Leva o 'fundo desfocado' a um novo nível, simulando lentes com aberturas extremas (f/1.2). Apenas uma fina fatia do prato fica em foco, enquanto o fundo se dissolve em um 'bokeh' suave e cremoso, criando um look sonhador e artístico.", pro_tips: ["Ideal para um look sonhador e de alta classe.", "Foque em um detalhe textural muito específico.", "Cria uma separação dramática entre o sujeito e o fundo."] } 
    },
    { 
        name: "DoF Seletivo (Foco em Detalhe Específico)", 
        short_info: "Apenas um detalhe específico em foco.", 
        keywords: ["selective focus", "one detail sharp", "ingredient focus", "focus on texture", "isolated detail", "dramatic food shot", "f/1.8 macro lens style"], 
        negative_keywords: ["lack of subject balance", "background too sharp", "disproportionate focus", "background clutter"],
        icon: SelectiveFocusIcon, 
        technical_details: { title: "DoF Seletivo: Destaque em Detalhe", description: "O objetivo é destacar um único ingrediente ou elemento de um prato maior, deixando o resto em um desfoque suave. Direciona a atenção do espectador para um ponto específico de interesse.", pro_tips: ["Ideal para focar na cereja do bolo ou na erva que decora o prato.", "Cria uma sensação de cuidado e atenção aos detalhes.", "Funciona bem em composições complexas para guiar o olhar."] } 
    },
    {
        name: "DoF Hiperdinâmico",
        short_info: "Foco extremamente seletivo para alto impacto.",
        keywords: ["hyper selective depth of field", "extreme focus transition", "deep food detail", "precise focus shot", "isolated sharpness"],
        negative_keywords: ["unnatural sharpness", "overexposed sharp focus", "disjointed focus areas", "lack of smooth transition"],
        icon: SelectiveFocusIcon,
        technical_details: {
            title: "DoF Hiperdinâmico: O Foco Cirúrgico",
            description: "Uma técnica avançada que cria uma transição de foco muito rápida e dramática, isolando um ponto minúsculo com nitidez extrema e deixando o resto em um desfoque intenso. O efeito é quase surreal.",
            pro_tips: ["Use para destacar um único grão de sal, uma gota de molho ou a semente de uma fruta.", "Cria um efeito visual de alto impacto, quase abstrato.", "Requer uma composição cuidadosa para não parecer um erro."]
        }
    },
    {
        name: "DoF Cinemático",
        short_info: "Look de filme com foco suave e artístico.",
        keywords: ["cinematic depth of field", "soft focus background", "film-style food shot", "depth with bokeh", "smooth blur effect"],
        negative_keywords: ["harsh background blur", "overexposed focus areas", "unnatural light transitions", "sharp background distractions"],
        icon: ShallowDofIcon,
        technical_details: {
            title: "DoF Cinemático: A Narrativa Visual",
            description: "Combina um foco relativamente profundo no assunto principal com um desfoque de fundo suave e com características de lentes de cinema (anamórficas). O resultado é uma imagem que parece um frame de filme.",
            pro_tips: ["Ideal para criar uma atmosfera de 'storytelling'.", "Funciona bem com iluminação 'golden hour' ou 'moody'.", "O desfoque não é apenas sobre a quantidade, mas sobre a qualidade e a forma."]
        }
    },
    {
        name: "DoF Criativo",
        short_info: "Foco artístico em múltiplos pontos da cena.",
        keywords: ["creative depth of field", "focus on specific food element", "artistic bokeh", "isolated ingredient focus", "artistic selective focus"],
        negative_keywords: ["out of focus subject", "cluttered composition", "poor separation between food and background", "overexposed subject"],
        icon: TiltShiftDofIcon,
        technical_details: {
            title: "DoF Criativo: O Jogo de Foco",
            description: "Permite focar em múltiplos elementos específicos da composição, mesmo que estejam em planos diferentes, criando um efeito surreal e artístico. É como pintar com o foco para guiar o olhar.",
            pro_tips: ["Use para conectar visualmente dois ingredientes diferentes em uma cena.", "Funciona bem em flat lays complexos para criar um caminho visual.", "Quebra as regras da ótica tradicional para um efeito de alto impacto."]
        }
    },
    {
        name: "DoF Natural",
        short_info: "Look orgânico e realista.",
        keywords: ["natural depth of field", "organic focus shot", "realistic food photography", "subtle background blur", "balanced scene focus"],
        negative_keywords: ["too much blur", "overexposed background", "unnatural background separation", "harsh light on subject"],
        icon: MediumDofIcon,
        technical_details: {
            title: "DoF Natural: O Efeito Realista",
            description: "Simula a forma como nossos olhos focam naturalmente. O assunto principal é nítido, com uma transição suave para um fundo levemente desfocado, criando um look realista e sem esforço.",
            pro_tips: ["Ideal para fotografia de lifestyle e 'comfort food'.", "Evita o look excessivamente 'perfeito' da fotografia comercial.", "Transmite autenticidade e realismo."]
        }
    },
    {
        name: "DoF Dimensional",
        short_info: "Cria uma sensação de profundidade 3D.",
        keywords: ["dimensional depth of field", "3D food shot", "textured focus effect", "depth perception in food", "enhanced food texture"],
        negative_keywords: ["flat food appearance", "lack of depth", "blurry foreground", "poor texture emphasis"],
        icon: MediumDofIcon,
        technical_details: {
            title: "DoF Dimensional: O Efeito 3D",
            description: "Utiliza micro-contraste e uma renderização de foco específica para criar uma forte sensação de profundidade e tridimensionalidade, fazendo o prato 'saltar' da imagem.",
            pro_tips: ["Funciona bem com iluminação lateral para esculpir ainda mais o prato.", "Ideal para dar volume e presença a alimentos mais planos.", "Cria uma imagem imersiva e tátil."]
        }
    },
];

const FOOD_LIGHTING_STYLES: Option[] = [
    { 
        name: "Luz Lateral Difusa (Janela)", 
        short_info: "Suave, natural, realça texturas.", 
        keywords: ["soft side light", "natural light", "diffused light", "food styling light", "window lighting", "shadows for texture"], 
        negative_keywords: ["harsh shadows", "overexposed highlights", "flat lighting", "too much contrast"],
        icon: SoftDiffusedLightIcon, 
        technical_details: { title: "Luz Lateral Difusa (Janela)", description: "A luz mais cobiçada na fotografia de alimentos. É a luz suave e indireta que vem de uma janela, posicionada ao lado do prato. Ela cria sombras suaves que revelam texturas e produzem cores realistas e apetitosas.", pro_tips: ["A iluminação lateral é a chave para dar volume e dimensão à comida.", "Use um rebatedor branco no lado oposto à luz para suavizar as sombras.", "Evite a luz solar direta, que cria sombras duras."] } 
    },
    { 
        name: "Backlight (Contraluz para Brilho)", 
        short_info: "Luz por trás, realça vapor e líquidos.", 
        keywords: ["backlight", "rim light", "steam visible", "glowing drinks", "translucent liquids", "cinematic food light"], 
        negative_keywords: ["too dark foreground", "overexposed background", "lack of front focus", "too much shadow detail"],
        icon: BacklightIcon, 
        technical_details: { title: "Contraluz (Backlight)", description: "A principal fonte de luz é posicionada atrás do prato. Essa técnica é fantástica para realçar texturas, o brilho de líquidos, o vapor de pratos quentes e criar um contorno luminoso (rim light) ao redor da comida.", pro_tips: ["Use um rebatedor na frente para preencher as sombras e não deixar a frente do prato muito escura.", "Ideal para sopas, bebidas, saladas com molho e qualquer prato com elementos translúcidos.", "Pode criar um efeito dramático e apetitoso."] } 
    },
    { 
        name: "Golden Hour (Luz Quente Suave)", 
        short_info: "Tom quente e aconchegante de fim de tarde.", 
        keywords: ["golden hour", "warm tones", "cozy food scene", "sunset light", "rustic ambiance"], 
        negative_keywords: ["overexposed highlights", "flat color", "unbalanced lighting", "too warm for some dishes"],
        icon: GoldenHourIcon, 
        technical_details: { title: "Golden Hour (Luz Quente Suave)", description: "A luz suave, quente e dourada do sol logo após o nascer ou antes do pôr do sol. Cria sombras longas e suaves e banha a cena em um tom aconchegante e nostálgico.", pro_tips: ["Posicione o prato de forma que a luz venha de lado ou por trás (backlight) para maximizar o efeito.", "Ideal para pratos de verão, piqueniques e bebidas refrescantes.", "Cria uma atmosfera convidativa e calorosa."] } 
    },
    { 
        name: "Low-Key (Luz Dramática e Contraste)", 
        short_info: "Alto contraste e sombras marcadas.", 
        keywords: ["low key", "high contrast", "dramatic food photo", "shadows", "fine dining photography style"], 
        negative_keywords: ["too much shadow", "overexposed highlights", "poor separation", "lack of balance"],
        icon: LowKeyIcon, 
        technical_details: { title: "Luz Dramática (Low-Key)", description: "Esta técnica usa uma única fonte de luz forte e um fundo escuro para criar um alto contraste entre luz e sombra. O resultado é uma imagem 'moody', sofisticada e misteriosa.", pro_tips: ["Funciona muito bem para pratos escuros, como carnes, chocolates ou café.", "Use um fundo preto ou de cor escura para intensificar o efeito.", "A iluminação lateral ou traseira (backlight) é a mais eficaz."] } 
    },
    { 
        name: "Luz de Estúdio Branca (Catálogo)", 
        short_info: "Limpa e uniforme, para e-commerce.", 
        keywords: ["studio white light", "e-commerce food photo", "clean lighting", "multiple softboxes", "neutral look"], 
        negative_keywords: ["unrealistic colors", "harsh lighting", "flat image", "too much fill light"],
        icon: StudioLightIcon, 
        technical_details: { title: "Luz de Estúdio Branca (Catálogo)", description: "Cria uma iluminação limpa, uniforme e quase sem sombras. É o padrão para fotos de produtos e e-commerce, onde o objetivo é mostrar o prato de forma clara e objetiva.", pro_tips: ["Geralmente requer múltiplas fontes de luz (softboxes) para eliminar todas as sombras.", "Garante que as cores do produto sejam reproduzidas com a máxima fidelidade.", "Ideal para o modo 'recortar fundo' em apps de delivery."] } 
    },
    { 
        name: "Luz Lateral Dura (Textura Intensa)", 
        short_info: "Realça texturas com alto contraste.", 
        keywords: ["hard side light", "texture enhancing", "deep shadows", "high contrast food", "rustic food photography"], 
        negative_keywords: ["too harsh", "lack of smooth transitions", "overexposed areas", "distorted textures"],
        icon: SideLightIcon, 
        technical_details: { title: "Luz Lateral Dura: Esculpindo com Sombras", description: "Uma única fonte de luz forte e sem difusão, posicionada ao lado do prato. Ela cria sombras longas e bem definidas que esculpem a comida. É a melhor técnica para revelar texturas em pães e carnes grelhadas.", pro_tips: ["Use um rebatedor preto no lado oposto para aprofundar as sombras e aumentar o drama.", "Ideal para um look rústico, masculino ou 'moody'.", "Funciona bem para destacar as marcas de grelhado em um bife."] } 
    },
    { 
        name: "Luz Contínua Quente (Ambiente de Restaurante)", 
        short_info: "Luz quente, como de um restaurante.", 
        keywords: ["warm continuous light", "tungsten mood", "cozy restaurant atmosphere", "food ambiance light"], 
        negative_keywords: ["too orange", "unbalanced warm tones", "overexposed highlights", "harsh shadowing"],
        icon: CandlelightIcon, 
        technical_details: { title: "Luz Contínua Quente (Ambiente)", description: "Simula a luz de lâmpadas incandescentes ou de velas. Cria uma atmosfera quente, íntima e acolhedora, perfeita para recriar a sensação de um jantar em um restaurante ou em casa.", pro_tips: ["Ideal para pratos de outono/inverno, como assados, sopas e massas.", "Cuidado para não deixar a cor excessivamente laranja.", "Combine com elementos de madeira na cena."] } 
    },
    { 
        name: "Flash Direto (Estilo Cru/Party)", 
        short_info: "Look cru, moderno e de alto contraste.", 
        keywords: ["direct flash", "raw food shot", "harsh shadows", "party aesthetic", "casual photography look"], 
        negative_keywords: ["flat lighting", "too intense", "unnatural shadows", "too saturated"],
        icon: FlashBounceIcon, 
        technical_details: { title: "Flash Direto (Estilo Cru/Party)", description: "Uma escolha estilística ousada que usa o flash da câmera diretamente no assunto. Cria sombras duras, alto contraste e cores saturadas. O resultado é um look 'cru', editorial e moderno.", pro_tips: ["Funciona bem para criar um clima de festa ou para dar um toque de 'realismo' à cena.", "Pode ser muito eficaz para coquetéis e lanches.", "Abrace os reflexos e brilhos como parte da estética."] } 
    },
    {
        name: "Luz de Estúdio Criativa (Cor e Sombra)",
        short_info: "Usa cores e sombras para um look artístico.",
        keywords: ["creative studio lighting", "colored gels", "dramatic shadows", "artistic food light", "colorful food photography"],
        negative_keywords: ["over-saturated colors", "unnatural light spill", "lack of focus", "too much color contrast"],
        icon: MixedLightIcon,
        technical_details: {
            title: "Luz de Estúdio Criativa: Pintando com Luz",
            description: "Esta técnica usa ferramentas como géis coloridos para tingir a luz e 'gobos' (go-betweens) para projetar padrões de sombra. O resultado é uma imagem de comida artística, editorial e de alto impacto, que foge do realismo tradicional.",
            pro_tips: ["Combine cores complementares (ex: azul e laranja) para um efeito vibrante.", "Use padrões de sombra para adicionar textura e interesse visual ao fundo.", "Ideal para campanhas conceituais e editoriais de revistas."]
        }
    },
    {
        name: "Luz de Neon (Urbano e Colorido)",
        short_info: "Cores vibrantes para um look urbano.",
        keywords: ["neon light", "vibrant food photography", "colorful gels", "cyberpunk food", "street food look"],
        negative_keywords: ["unnatural neon glow", "excessive color contrast", "disorienting lighting", "too intense colors"],
        icon: NeonLightIcon,
        technical_details: {
            title: "Luz de Neon: O Brilho Urbano",
            description: "Usa luzes de neon ou géis coloridos para criar um look urbano, noturno e vibrante, com cores saturadas e reflexos intensos. É uma escolha estilística e moderna.",
            pro_tips: ["Ideal para street food, drinks, pratos asiáticos modernos e sobremesas com um tema 'cyberpunk'.", "Combine cores complementares para um efeito visualmente impactante.", "Abrace os reflexos brilhantes na superfície dos alimentos."]
        }
    },
    {
        name: "Luz Suave de Velas",
        short_info: "Romântica e Aconchegante.",
        keywords: ["candlelight", "soft warm light", "romantic food light", "intimate food scene", "warm and cozy"],
        negative_keywords: ["overexposed highlights", "too warm for fresh food", "lack of sharpness", "too much yellow light"],
        icon: CandlelightIcon,
        technical_details: {
            title: "Luz Suave de Velas: O Toque Romântico",
            description: "Simula a luz quente e bruxuleante de velas. Cria uma atmosfera extremamente íntima, romântica e acolhedora, com sombras muito suaves e um tom dourado profundo.",
            pro_tips: ["Perfeito para jantares românticos, sobremesas e vinho.", "Cuidado para não deixar a cor excessivamente laranja.", "Cria reflexos quentes e convidativos em taças e talheres."]
        }
    }
];

const FOOD_CAMERA_ANGLES: Option[] = [
    { 
        name: "Flat Lay 90° (Vista de Cima)", 
        short_info: "Ideal para mesas, pizzas e bowls.", 
        keywords: ["flat lay", "overhead shot", "top down", "90-degree angle", "styled table", "ingredient arrangement", "top view composition", "food arrangement", "flat lay styling", "organized food shot", "minimalist food layout"], 
        negative_keywords: ["cluttered composition", "overlapping elements", "distracting background", "too much symmetry", "flat lighting", "sharp focus on background", "blurry food texture"],
        icon: TopDownAngleIcon, 
        technical_details: { title: "Flat Lay 90° (Vista de Cima)", description: "A câmera é posicionada diretamente acima do prato, a 90 graus. Este ângulo é perfeito para mostrar composições em uma superfície plana e destaca formas geométricas.", pro_tips: ["Ideal para pizzas, bowls, saladas e qualquer prato onde os ingredientes são arranjados no topo.", "A iluminação deve ser difusa e uniforme para evitar sombras da câmera.", "A composição e organização dos elementos é a chave para o sucesso."] } 
    },
    { 
        name: "Ângulo 45° (Visão da Mesa)", 
        short_info: "A vista mais natural e versátil.", 
        keywords: ["45-degree food shot", "natural perspective", "table view", "lifestyle", "bowls and pasta photography", "realistic food shot", "plate in context", "food scene", "tabletop food shot", "dining perspective"], 
        negative_keywords: ["unnatural perspective", "disproportionate plate size", "overexposed shadows", "poor table styling", "too much background noise", "high contrast on food only", "blurry background"],
        icon: FortyFiveDegreeAngleIcon, 
        technical_details: { title: "Ângulo de 45° (Mesa)", description: "Este é o ângulo mais comum e natural, pois simula como vemos o prato quando estamos sentados à mesa. É versátil e funciona para a maioria dos alimentos.", pro_tips: ["Excelente para pratos com altura moderada, como massas e bowls.", "Combine com uma profundidade de campo rasa para desfocar o fundo.", "É um ângulo seguro e eficaz, difícil de errar."] } 
    },
    { 
        name: "Nível do Olhar 0° (Visão Frontal)", 
        short_info: "Para hambúrgueres, bolos e sanduíches.", 
        keywords: ["eye-level food shot", "burger layers", "sandwich hero", "cake slices", "profile shot food photography", "hero food angle", "top food layers", "centered food", "direct food shot", "profile perspective", "food focus"],
        negative_keywords: ["distorted layers", "overexposed highlights", "unfocused food layers", "excessive background details", "poor separation between food and background", "low sharpness"],
        icon: EyeLevelAngleIcon, 
        technical_details: { title: "Nível do Olhar 0° (Frontal)", description: "A câmera está no mesmo nível do prato, fotografando-o de frente. É ideal para mostrar a altura e as camadas de um prato de forma impactante.", pro_tips: ["A escolha número um para hambúrgueres, sanduíches, bolos em camadas e pilhas de panquecas.", "A composição do fundo é importante, pois ele estará bem visível.", "Use um fundo desfocado para manter a atenção no prato."] } 
    },
    { 
        name: "Ângulo Baixo (Visão Imponente)", 
        short_info: "De baixo para cima, torna o prato imponente.", 
        keywords: ["low angle food shot", "hero perspective", "drinks on table", "towering dessert", "dramatic composition", "low angle perspective", "food power shot", "drinks close-up", "food hero shot", "powerful food shot"],
        negative_keywords: ["too aggressive perspective", "unnatural subject size", "distracting background", "wrong subject orientation", "poor lighting shadows", "too shallow depth of field"],
        icon: LowAngleIcon, 
        technical_details: { title: "Ângulo Baixo (Imponente)", description: "A câmera é posicionada abaixo do nível do prato, olhando para cima. Este ângulo faz com que o prato pareça maior, mais imponente e 'heroico'.", pro_tips: ["Use para fazer um hambúrguer parecer gigantesco ou uma sobremesa parecer majestosa.", "Funciona bem para pratos altos e bebidas.", "Pode criar uma perspectiva dramática e poderosa."] } 
    },
    { 
        name: "Close-up/Macro (Detalhe)", 
        short_info: "Foco em texturas e detalhes.", 
        keywords: ["close up", "extreme detail", "texture", "dripping sauce", "food photography macro shot", "ingredient focus", "macro texture", "intimate food shot", "up-close food details", "food texture focus", "fine details shot"],
        negative_keywords: ["over-sharpened details", "unnatural bokeh", "low resolution", "disproportionate focus", "overexposed texture", "incorrect texture emphasis", "blurry detail"],
        icon: ExtremeCloseUpAngleIcon, 
        technical_details: { title: "Close-Up/Macro (Detalhe)", description: "Um enquadramento fechado que foca em uma parte do prato para destacar as texturas, cores e detalhes que tornam a comida apetitosa.", pro_tips: ["Perfeito para mostrar o queijo derretido, a suculência de uma carne ou o brilho de um molho.", "A iluminação lateral é excelente para realçar a textura neste ângulo.", "Use para fazer o espectador sentir que pode quase saborear a comida."] } 
    },
    {
        name: "Ângulo de Abertura",
        short_info: "Visão criativa através de um objeto no cenário.",
        keywords: ["food shot through glass", "looking through food container", "drink through glass", "through a cup shot", "view from inside food container", "transparent food perspective", "inside glass food shot"],
        negative_keywords: ["distorted glass reflection", "blurred glass edge", "unnatural object framing", "overexposed through object", "inconsistent transparency", "distracting glass reflections"],
        icon: PovAngleIcon,
        technical_details: {
            title: "Ângulo de Abertura: A Visão Através",
            description: "A câmera captura a cena através de um elemento em primeiro plano (como um copo, uma planta ou uma janela), criando uma moldura natural que adiciona profundidade e contexto à imagem.",
            pro_tips: ["Use para criar uma sensação de 'espiar' uma cena íntima e real.", "O objeto em primeiro plano geralmente fica desfocado para guiar o olhar para o prato.", "Ideal para contar uma história e tornar a foto mais imersiva."]
        }
    },
    {
        name: "Ponto de Vista Alto (Bird's Eye)",
        short_info: "Visão ampla de cima, mostrando a mesa toda.",
        keywords: ["bird's eye view food shot", "wide overhead shot", "high angle food perspective", "food scene from above", "overview food composition", "top view wide shot", "wide table food shot"],
        negative_keywords: ["too wide of a frame", "poor scene organization", "background distractions", "uncentered food", "unfocused food arrangement", "cluttered scene"],
        icon: HighAngleIcon,
        technical_details: {
            title: "Ponto de Vista Alto: A Cena Completa",
            description: "Similar a um flat lay, mas de uma distância maior, capturando uma visão mais ampla da mesa ou da cena. É excelente para mostrar a interação entre vários pratos e elementos.",
            pro_tips: ["Funciona bem para mesas de banquete, tábuas de frios ou cenas de café da manhã completas.", "A composição e o arranjo dos elementos são cruciais para o sucesso.", "Garante que o espectador tenha uma visão geral de toda a refeição."]
        }
    },
    {
        name: "Ângulo de Perfil (Side Profile)",
        short_info: "Mostra o lado do prato, revelando camadas.",
        keywords: ["side profile food shot", "lateral view food shot", "food in profile", "food side perspective", "profile shot food layers", "profile dessert shot", "side view food composition"],
        negative_keywords: ["awkward side angle", "overexposed side view", "poor side focus", "flat food side view", "disjointed side perspective", "unbalanced food layers"],
        icon: SideViewAngleIcon,
        technical_details: {
            title: "Ângulo de Perfil: A Arquitetura do Prato",
            description: "A câmera é posicionada exatamente ao lado do prato, capturando seu perfil lateral. É a melhor maneira de mostrar a altura, as camadas e a estrutura de alimentos empilhados.",
            pro_tips: ["Essencial para lasanhas, bolos em camadas, hambúrgueres altos e sanduíches.", "Use iluminação lateral para destacar as texturas de cada camada.", "Revela a construção e o cuidado na montagem do prato."]
        }
    },
    {
        name: "Close-up de Textura",
        short_info: "Foco extremo na textura da superfície.",
        keywords: ["texture close-up food shot", "extreme food detail", "food texture focus", "close-up food surface", "close-up texture shot", "ingredient surface close-up", "extreme close-up food detail"],
        negative_keywords: ["unfocused texture", "poor texture emphasis", "overexposed close-up", "low resolution detail", "unrealistic texture rendering", "disproportionate texture focus"],
        icon: ExtremeCloseUpAngleIcon,
        technical_details: {
            title: "Close-up de Textura: O Toque da Comida",
            description: "Um ângulo macro focado inteiramente na superfície do alimento para revelar sua textura. O objetivo não é mostrar o prato, mas a sensação tátil de um ingrediente específico.",
            pro_tips: ["Perfeito para a crosta de um pão, a casca de uma fruta, ou a cristalização do açúcar.", "Iluminação lateral rasante é crucial para destacar as micro-texturas.", "Cria imagens abstratas e de alto impacto que evocam o paladar."]
        }
    },
];

const FOOD_PRESETS: StudioPreset[] = [
    { name: 'Sobremesas & Doces', description: 'Cores suaves e foco em detalhes delicados.', icon: DessertIcon, preset: { cameraName: 'Hasselblad X2D 100C + 90mm f/2.5', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Close-up/Macro (Detalhe)', stylePlaceholder: 'Torta de frutas vermelhas em um prato de cerâmica, com foco na textura do creme, luz suave da janela criando um brilho etéreo.' }, examples: ["Close-up de um bolo de chocolate fofinho com cobertura de ganache escorrendo, em um prato de cerâmica rústica.", "Macarons coloridos em tons pastel dispostos em uma torre, com fundo suavemente desfocado.", "Uma fatia de cheesecake de morango, com calda brilhante, em uma mesa de mármore branco."] },
    { name: 'Carnes & Churrasco', description: 'Realça a suculência e as marcas de grelhado.', icon: MeatIcon, preset: { cameraName: 'Nikon Z8 + 85mm f/1.8', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Dura (Textura Intensa)', angle: 'Ângulo Baixo (Visão Imponente)', stylePlaceholder: 'Picanha grelhada suculenta em uma tábua de madeira rústica, com marcas de grelhado bem definidas, fumaça leve subindo.' }, examples: ["Picanha fatiada em uma tábua de madeira rústica, com sal grosso e um ramo de alecrim.", "Costelas de porco com molho barbecue brilhante, fumaça subindo, em um fundo escuro e dramático.", "Espeto de churrasco com carnes e legumes coloridos, sobre uma grelha quente."] },
    { name: 'Saladas & Pratos Leves', description: 'Luz limpa para destacar o frescor e as cores.', icon: SaladIcon, preset: { cameraName: 'Canon EOS R5 + 50mm f/2.8', depthOfFieldName: 'DoF Profundo (Tudo em Foco)', lightingName: 'Luz de Estúdio Branca (Catálogo)', angle: 'Flat Lay 90° (Vista de Cima)', stylePlaceholder: 'Salada de verão vibrante em uma tigela branca, sobre um fundo de mármore claro, com todos os ingredientes nítidos.' }, examples: ["Salada Caesar com frango grelhado e croutons, vista de cima, com ingredientes frescos e vibrantes.", "Bowl de salmão com abacate, manga e folhas verdes, em um flat lay colorido e organizado.", "Prato de carpaccio com alcaparras e parmesão, em uma composição minimalista."] },
    { name: 'Bebidas & Drinks', description: 'Realça o brilho e a refrescância dos líquidos.', icon: DrinkIcon, preset: { cameraName: 'Panasonic Lumix S5 II + 85mm f/1.8', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Backlight (Contraluz para Brilho)', angle: 'Nível do Olhar 0° (Visão Frontal)', stylePlaceholder: 'Caipirinha em um copo de cristal, com gelo e uma rodela de limão, em um balcão de bar escuro no Rio de Janeiro, luz de fundo fazendo o líquido brilhar.' }, examples: ["Copo de Negroni com uma casca de laranja, em um bar com iluminação baixa e dramática.", "Suco verde refrescante em um copo alto com condensação, com frutas e vegetais desfocados ao fundo.", "Taça de vinho tinto com a luz passando pelo líquido, criando um brilho rubi."] },
    { name: 'Hambúrgueres & Lanches', description: 'Captura todas as camadas de forma heroica.', icon: BurgerIcon, preset: { cameraName: 'Canon EOS R3 + 50mm f/1.4', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Golden Hour (Luz Quente Suave)', angle: 'Nível do Olhar 0° (Visão Frontal)', stylePlaceholder: 'Hambúrguer artesanal com queijo derretendo, em uma hamburgueria artesanal em Pinheiros (São Paulo), com a luz dourada do pôr do sol.' }, examples: ["Hambúrguer duplo com queijo cheddar derretendo e bacon crocante, em uma mesa de madeira.", "Sanduíche de pastrami com pão de centeio, mostrando todas as camadas, em um ambiente de delicatessen.", "Taco com recheios coloridos, fotografado de perto para mostrar a textura dos ingredientes."] },
    { name: 'Massas & Pratos Asiáticos', description: 'Cria uma atmosfera quente e reconfortante.', icon: PastaIcon, preset: { cameraName: 'Canon EOS R6 II + 85mm f/2.0', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Ângulo 45° (Visão da Mesa)', stylePlaceholder: 'Prato de carbonara cremoso em uma tigela de cerâmica rústica, ao lado de uma janela com luz suave, vapor subindo delicadamente.' }, examples: ["Prato fundo de espaguete à bolonhesa com manjericão fresco, vapor subindo.", "Tigela de ramen com ovo cozido, naruto e cebolinha, em uma mesa de restaurante japonês.", "Risoto de cogumelos cremoso, finalizado com azeite trufado e parmesão."] },
    { name: 'Pizza', description: 'Look rústico que destaca a crocância e o calor.', icon: PizzaIcon, preset: { cameraName: 'Sony A7 IV + 35mm f/2.8', depthOfFieldName: 'DoF Médio (Foco Equilibrado)', lightingName: 'Luz Contínua Quente (Ambiente de Restaurante)', angle: 'Flat Lay 90° (Vista de Cima)', stylePlaceholder: 'Pizza recém-saída do forno em uma tábua de madeira, com queijo derretido e manjericão fresco, em uma cantina italiana no Bixiga (São Paulo), com toalha xadrez.' }, examples: ["Pizza de calabresa em uma tábua de madeira, com uma fatia sendo retirada e o queijo esticando.", "Pizza margherita com borda crocante, vista de cima, com ingredientes frescos.", "Fatia de pizza em um prato, com o fundo de uma pizzaria movimentada desfocado."] },
    { name: 'Comida Japonesa', description: 'Estilo elegante e minimalista para pratos delicados.', icon: SushiIcon, preset: { cameraName: 'Ricoh GR IIIx + 40mm f/2.8', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Low-Key (Luz Dramática e Contraste)', angle: 'Ângulo 45° (Visão da Mesa)', stylePlaceholder: 'Prato de sushi minimalista em uma placa de ardósia escura, com iluminação dramática destacando o brilho do peixe.' }, examples: ["Combinado de sushi e sashimi em uma travessa de cerâmica japonesa, com hashi ao lado.", "Peças de niguiri de salmão dispostas em linha, com foco no brilho do peixe.", "Temaki de atum, fotografado de perto para mostrar os ingredientes frescos."] },
    { name: 'Comida Brasileira', description: 'Luz natural para um look autêntico e convidativo.', icon: BrazilianFoodIcon, preset: { cameraName: 'Canon EOS R6 II + 50mm f/1.8', depthOfFieldName: 'DoF Médio (Foco Equilibrado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Ângulo 45° (Visão da Mesa)', stylePlaceholder: 'Feijoada servida em uma panela de barro sobre uma mesa de madeira, com luz natural de uma janela, criando uma atmosfera familiar.' }, examples: ["Prato de moqueca baiana com coentro fresco, em uma panela de barro, com farofa e arroz ao lado.", "Acarajé crocante com vatapá e camarão, em um cenário que remete à Bahia.", "Pão de queijo quentinho em uma cesta de vime, com uma xícara de café ao fundo."] },
    { name: 'Padaria & Pães', description: 'Realça a textura da crosta e o miolo macio.', icon: BakeryIcon, preset: { cameraName: 'Sony A1 + 105mm f/2.8', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Golden Hour (Luz Quente Suave)', angle: 'Close-up/Macro (Detalhe)', stylePlaceholder: 'Close-up de um pão de fermentação natural com crosta crocante, polvilhado com farinha, com a luz quente do fim de tarde realçando a textura.' }, examples: ["Croissant folhado com amêndoas, em uma mesa de confeitaria francesa.", "Pão de fermentação natural recém-assado, com a crosta crocante em destaque.", "Cesta com uma variedade de pães artesanais, em uma padaria com fundo rústico."] },
    { name: 'Açaí & Bowls', description: 'Cores vibrantes e foco nos toppings frescos.', icon: BowlIcon, preset: { cameraName: 'Sigma fp L + 35mm f/2.0', depthOfFieldName: 'DoF Profundo (Tudo em Foco)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Flat Lay 90° (Vista de Cima)', stylePlaceholder: 'Bowl de açaí colorido com frutas frescas brasileiras e granola, fotografado de cima com luz brilhante e uniforme.' }, examples: ["Tigela de açaí com banana, morango e granola, vista de cima em um flat lay vibrante.", "Poke bowl de salmão com ingredientes coloridos, em uma composição organizada.", "Smoothie bowl decorado com sementes e frutas exóticas, em um cenário de café da manhã saudável."] },
    { name: 'Cafeteria', description: 'Cria uma atmosfera "moody" e aconchegante.', icon: CoffeeIcon, preset: { cameraName: 'Fujifilm X-H2S + 35mm f/1.4', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Ângulo 45° (Visão da Mesa)', stylePlaceholder: 'Xícara de cappuccino com latte art em uma mesa de madeira de uma cafeteria charmosa no Rio de Janeiro, com luz suave vinda da janela.' }, examples: ["Xícara de café com vapor subindo, em uma mesa de cafeteria com um livro ao lado.", "Latte art em um cappuccino, visto de cima, com a espuma cremosa em destaque.", "Café coado sendo servido em uma xícara, com o ambiente de uma cafeteria descolada ao fundo."] },
    { name: 'Frutos do Mar', description: 'Estilo limpo e fresco para destacar a qualidade.', icon: BowlIcon, preset: { cameraName: 'Sony A7 IV + 100mm f/2.8', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Ângulo 45° (Visão da Mesa)', stylePlaceholder: 'Prato de camarões grelhados com limão e ervas, com luz natural destacando o brilho e a textura, em um restaurante na beira da praia.' }, examples: ["Prato de ostras frescas com gelo e limão, em um cenário de mercado de peixes.", "Lagosta grelhada servida com manteiga de ervas, com foco na carne suculenta.", "Paella com frutos do mar vibrantes, em uma grande panela, vista de cima."] },
    { name: 'Café da Manhã', description: 'Cena matinal, leve e arejada.', icon: CoffeeIcon, preset: { cameraName: 'Google Pixel 8 Pro', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Difusa (Janela)', angle: 'Flat Lay 90° (Vista de Cima)', stylePlaceholder: 'Mesa de café da manhã de hotel brasileiro com pão de queijo, mamão e suco de laranja, com luz matinal brilhante e suave.' }, examples: ["Pilha de panquecas com mel escorrendo e frutas vermelhas, em um prato branco.", "Tábua de café da manhã com ovos, bacon, torradas e abacate.", "Waffles com chantilly e morangos, em um cenário de brunch de domingo."] },
    { name: 'Sopas & Caldos', description: 'Destaca o vapor e a textura dos ingredientes.', icon: BowlIcon, preset: { cameraName: 'Panasonic Lumix S5 II + 50mm f/1.8', depthOfFieldName: 'DoF Médio (Foco Equilibrado)', lightingName: 'Backlight (Contraluz para Brilho)', angle: 'Flat Lay 90° (Vista de Cima)', stylePlaceholder: 'Tigela de caldo verde quente, com vapor subindo, iluminada por trás para realçar a textura cremosa.' }, examples: ["Sopa de abóbora cremosa com sementes tostadas, em uma tigela rústica.", "Caldo de feijão com bacon e cebolinha, em uma cumbuca de cerâmica.", "Sopa de tomate com um fio de azeite e manjericão, com pão torrado ao lado."] },
    { name: 'Comida Mexicana', description: 'Cores vibrantes e texturas em close-up.', icon: BurgerIcon, preset: { cameraName: 'iPhone 15 Pro', depthOfFieldName: 'DoF Raso (Fundo Desfocado)', lightingName: 'Luz Lateral Dura (Textura Intensa)', angle: 'Close-up/Macro (Detalhe)', stylePlaceholder: 'Close-up de um taco com ingredientes frescos e coloridos, com luz direta criando um look vibrante e de alto contraste.' }, examples: ["Tacos al pastor com abacaxi e coentro, em uma autêntica taqueria mexicana.", "Prato de nachos com guacamole, sour cream e jalapeños, perfeito para compartilhar.", "Burrito generoso, cortado ao meio para mostrar o recheio colorido."] }
];

export const foodStudioConfig = {
    id: 'food' as const,
    name: "Estúdio & Sabor AI",
    specialty: "fotografia gastronômica",
    presets: FOOD_PRESETS,
    cameras: FOOD_CAMERAS,
    angles: FOOD_CAMERA_ANGLES,
    depthsOfField: FOOD_DEPTHS_OF_FIELD,
    lightingStyles: FOOD_LIGHTING_STYLES,
};