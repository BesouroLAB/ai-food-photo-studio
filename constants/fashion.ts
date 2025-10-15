// constants/fashion.ts
import { Option, StudioPreset } from '../types';
import { 
    CameraIcon, FashionIcon, TshirtIcon, ShoesIcon, LingerieIcon, PeopleIcon, JewelryIcon,
    TopDownAngleIcon, FortyFiveDegreeAngleIcon, EyeLevelAngleIcon, LowAngleIcon,
    SideViewAngleIcon, ExtremeCloseUpAngleIcon, DutchAngleIcon, PovAngleIcon, HighAngleIcon,
    SelectiveFocusIcon, ShallowDofIcon, MediumDofIcon, DeepDofIcon, UltraShallowDofIcon,
    StudioLightIcon, LowKeyIcon, HardLightIcon, GoldenHourIcon, NaturalWindowLightIcon,
    BacklightIcon, NeonLightIcon, OverheadLightIcon, CandlelightIcon, HighKeyIcon, SideLightIcon,
} from '../components/icons';

const FASHION_CAMERAS: Option[] = [
    { 
        name: "Sony A7 IV 35mm f/1.4 (Estilo Urbano)", 
        short_info: "Perspectiva ampla para fotos de contexto.", 
        keywords: ["sony 35mm", "wide perspective", "editorial fashion", "environmental portrait", "storytelling"], 
        negative_keywords: ["oversaturated colors", "soft focus"],
        icon: CameraIcon, 
        technical_details: { title: "Sony 35mm: A Contadora de Histórias", description: "Uma lente grande-angular que captura mais do ambiente, ideal para fotos editoriais que contam uma história. Permite mostrar a peça de roupa como parte de um look completo ou de uma cena urbana maior.", pro_tips: ["Use para criar composições dinâmicas e envolventes.", "Excelente para campanhas de moda e conteúdo para redes sociais."] } 
    },
    { 
        name: "Canon R5 + 100mm Macro (Detalhes Precisos)", 
        short_info: "Cores vivas e detalhes incríveis em tecidos.", 
        keywords: ["canon r5", "100mm macro", "color accuracy", "dynamic range", "studio fashion", "true-to-life color"], 
        negative_keywords: ["distortion", "incorrect color representation", "poor lighting"],
        icon: CameraIcon, 
        technical_details: { title: "Canon R5 Macro: A Mestra das Cores e Texturas", description: "Famosa por sua fidelidade de cor e tons de pele agradáveis, esta opção é perfeita para lookbooks de estúdio e e-commerce. A lente macro revela a textura e os detalhes dos tecidos com precisão.", pro_tips: ["Excelente para fotografar peças contra fundos brancos puros para e-commerce.", "Use para close-ups de botões, costuras e texturas de tecido."] } 
    },
    { 
        name: "Fujifilm X-T4 (Look Cinemático)", 
        short_info: "Look cinematográfico para moda conceitual.", 
        keywords: ["fujifilm x-t4", "film look", "analog mood", "cinematic fashion", "moody", "artisanal"], 
        negative_keywords: ["overexposed", "hard shadows", "blurry details"],
        icon: CameraIcon, 
        technical_details: { title: "Fujifilm: A Alma Analógica", description: "Famosa por suas simulações de filme, esta opção oferece cores com uma qualidade quase analógica. É perfeita para criar uma atmosfera 'moody' e artística, com tons suaves, ideal para moda conceitual ou com um toque vintage.", pro_tips: ["Cria um look único que se destaca da fotografia de moda tradicional.", "Excelente para marcas com uma forte identidade visual e narrativa."] } 
    },
    { 
        name: "Fuji GFX 100 II (Luxo e Detalhes)", 
        short_info: "Qualidade de médio formato para campanhas.", 
        keywords: ["fujifilm gfx 100 ii", "medium format", "102mp", "luxury fashion", "editorial look", "unmatched detail", "deep color tones"], 
        negative_keywords: ["oversaturation", "distorted proportions", "unrealistic lighting"],
        icon: CameraIcon, 
        technical_details: { title: "Fuji GFX 100 II: O Padrão do Luxo", description: "Um sistema de médio formato que define o padrão para fotografia de luxo. O sensor maior produz imagens com uma profundidade tridimensional e riqueza de cores impossíveis de replicar em câmeras menores.", pro_tips: ["Ideal para campanhas publicitárias e editoriais de revistas de luxo.", "As cores são ricas e profundas, perfeitas para tecidos nobres."] } 
    },
    { 
        name: "Sony 35mm f/1.4 (Estilo Editorial)", 
        short_info: "Perspectiva ampla para fotos de contexto.", 
        keywords: ["sony 35mm", "wide perspective", "editorial fashion", "environmental portrait", "storytelling"], 
        negative_keywords: ["soft focus", "blurry background", "overexposed highlights"],
        icon: CameraIcon, 
        technical_details: { title: "Sony 35mm: A Visão Ampla", description: "Uma lente grande-angular que captura mais do ambiente, ideal para fotos editoriais que contam uma história. Permite mostrar a peça de roupa como parte de um look completo ou de uma cena maior.", pro_tips: ["Use para criar composições dinâmicas e envolventes.", "Excelente para campanhas de moda e conteúdo para redes sociais."] } 
    },
    { 
        name: "Nikon Z8 + 70-200mm f/2.8 (Captura Rápida)", 
        short_info: "Compressão e desfoque para retratos de moda.", 
        keywords: ["nikon z8", "telephoto lens", "background compression", "creamy bokeh", "fashion portrait"], 
        negative_keywords: ["motion blur", "poor focus", "washed out colors"],
        icon: CameraIcon, 
        technical_details: { title: "Nikon Z8 + 70-200mm: O Retrato de Moda Clássico", description: "A lente teleobjetiva comprime o fundo, criando um desfoque intenso e destacando o modelo. É o look clássico para retratos de moda e fotos de rua onde o foco é total na pessoa e na roupa.", pro_tips: ["Afaste-se do modelo para enquadrar.", "O bokeh é extremamente suave, isolando o sujeito do fundo de forma elegante."] } 
    },
    { 
        name: "Phase One XF IQ4 (Máxima Definição)", 
        short_info: "Padrão de outdoor, detalhe e cor insuperáveis.", 
        keywords: ["phase one xf iq4", "150MP", "medium format", "ultimate detail", "luxury advertising", "commercial fashion photography"], 
        negative_keywords: ["overexposed", "loss of texture", "incorrect color tones"],
        icon: CameraIcon, 
        technical_details: { title: "Phase One XF IQ4: O Ápice da Fotografia Comercial", description: "Simula o sistema de câmera usado nas campanhas de moda mais luxuosas do mundo. O sensor de 150MP captura um nível de detalhe surreal, e a tecnologia de cor garante a representação mais precisa possível de tecidos e tons de pele.", pro_tips: ["A escolha para outdoors e impressões de altíssima qualidade.", "Os arquivos de 16-bit oferecem uma latitude de edição incomparável."] } 
    },
    { 
        name: "Hasselblad X2D 100C (Cores Naturais)", 
        short_info: "Cores realistas e tons de pele perfeitos.", 
        keywords: ["hasselblad x2d 100c", "medium format", "true-to-life color", "perfect skin tones", "high-end editorial"], 
        negative_keywords: ["harsh lighting", "distorted colors", "excessive sharpening"],
        icon: CameraIcon, 
        technical_details: { title: "Hasselblad X2D 100C: A Ciência da Cor", description: "Esta opção é lendária por sua ciência de cores. A 'Hasselblad Natural Colour Solution' é projetada para produzir cores incrivelmente precisas e tons de pele belíssimos, tornando-a ideal para fotos de moda com modelos.", pro_tips: ["A melhor escolha para quando a precisão da cor do tecido e do tom de pele é a prioridade.", "Excelente para capturar a interação natural entre a roupa e a pele."] } 
    },
    { 
        name: "Canon R5 + 100mm Macro (Cores Naturais)", 
        short_info: "Cores vivas e detalhes incríveis em tecidos.", 
        keywords: ["canon r5", "100mm macro", "color accuracy", "dynamic range", "studio fashion", "true-to-life color"], 
        negative_keywords: ["oversaturated", "bad background", "grainy details"],
        icon: CameraIcon, 
        technical_details: { title: "Canon R5 Macro: A Mestra das Cores e Texturas", description: "Famosa por sua fidelidade de cor e tons de pele agradáveis, esta opção é perfeita para lookbooks de estúdio e e-commerce. A lente macro revela a textura e os detalhes dos tecidos com precisão.", pro_tips: ["Excelente para fotografar peças contra fundos brancos puros para e-commerce.", "Use para close-ups de botões, costuras e texturas de tecido."] } 
    },
    { 
        name: "OM System OM-1 (Detalhes Preciso)", 
        short_info: "Compacta, ideal para viagens e documentário de moda.", 
        keywords: ["om system om-1", "micro four thirds", "deep focus", "travel fashion", "documentary style"], 
        negative_keywords: ["blurry elements", "incorrect color representation", "too dark"],
        icon: CameraIcon, 
        technical_details: { title: "OM System: A Companheira de Viagem", description: "O sensor menor deste sistema oferece uma profundidade de campo naturalmente maior. Isso é uma vantagem para fotos de viagem, garantindo que tanto o modelo quanto o cenário espetacular fiquem nítidos.", pro_tips: ["A melhor escolha para fotos de moda em paisagens épicas.", "Corpo leve e compacto, ideal para um estilo mais documental."] } 
    },
    { 
        name: "Canon R5 + 35mm f/1.8 (Cores Vibrantes)", 
        short_info: "Vibrante e nítido para redes sociais.", 
        keywords: ["canon r5 35mm", "social media look", "vibrant colors", "fashion blogger", "sharp and punchy"], 
        negative_keywords: ["overexposure", "bad contrast", "blurry edges"],
        icon: CameraIcon, 
        technical_details: { title: "Canon R5 + 35mm: O Combo para Redes Sociais", description: "Uma combinação versátil que oferece uma perspectiva natural e um pouco mais ampla, ótima para capturar o look completo em ambientes de lifestyle. As cores da Canon são vibrantes e prontas para o Instagram.", pro_tips: ["Excelente para criar conteúdo rápido e de alta qualidade para influenciadores e blogs.", "A estabilização de imagem é ótima para fotos com a câmera na mão."] } 
    },
    { 
        name: "Canon 50mm f/1.8 (Look Casual)", 
        short_info: "Lente versátil para fotos com modelos.", 
        keywords: ["canon 50mm", "lifestyle fashion", "natural look", "on-model photography", "soft bokeh"], 
        negative_keywords: ["harsh shadows", "over-saturated background"],
        icon: CameraIcon, 
        technical_details: { title: "Canon 50mm: O Look Natural", description: "Uma lente clássica que oferece uma perspectiva natural. É ideal para fotografia de estilo de vida, mostrando a roupa em um contexto real, com um desfoque de fundo suave e agradável.", pro_tips: ["Perfeita para criar um look autêntico e menos 'comercial'.", "Use para contar uma história e criar uma conexão emocional."] } 
    },
    { 
        name: "Leica S3 + 120mm (Alta Definição)", 
        short_info: "Look 'Leica' tridimensional para marcas de luxo.", 
        keywords: ["leica s3", "120mm", "luxury brand look", "micro-contrast", "cinematic medium format"], 
        negative_keywords: ["sharp highlights", "unfocused elements", "low contrast"],
        icon: CameraIcon, 
        technical_details: { title: "Leica S3: O 'Look' Tridimensional", description: "Combina a qualidade do médio formato com o famoso 'Leica look'. As imagens têm micro-contraste acentuado e uma qualidade tridimensional que faz o modelo e a roupa saltarem da imagem. É a escolha para marcas que buscam uma estética atemporal e cinematográfica.", pro_tips: ["As lentes simuladas são conhecidas por sua nitidez e renderização únicas.", "Produz um look cinematográfico em médio formato, ótimo para fotos de campanha."] } 
    },
    { 
        name: "Canon 50mm f/1.8 (Look Natural)", 
        short_info: "Lente versátil para fotos com modelos.", 
        keywords: ["canon 50mm", "lifestyle fashion", "natural look", "on-model photography", "soft bokeh"], 
        negative_keywords: ["harsh shadows", "unnatural color tones"],
        icon: CameraIcon, 
        technical_details: { title: "Canon 50mm: O Look Natural", description: "Uma lente clássica que oferece uma perspectiva natural. É ideal para fotografia de estilo de vida, mostrando a roupa em um contexto real, com um desfoque de fundo suave e agradável.", pro_tips: ["Perfeita para criar um look autêntico e menos 'comercial'.", "Use para contar uma história e criar uma conexão emocional."] } 
    },
    {
        name: "iPhone 5",
        short_info: "Look vintage, low-fi e nostálgico.",
        keywords: ["iphone 5", "vintage smartphone", "low-fi", "nostalgic", "early instagram look"],
        negative_keywords: ["sharp details", "overexposed highlights"],
        icon: CameraIcon,
        technical_details: {
            title: "iPhone 5: A Cápsula do Tempo Digital",
            description: "Representa a era de ouro inicial da fotografia de smartphone. Produz imagens com uma qualidade distintamente 'vintage': menos nítidas, com cores mais quentes e uma textura que evoca nostalgia.",
            pro_tips: ["Ideal para criar um contraste com a perfeição das câmeras modernas.", "Funciona bem com filtros de sépia ou P&B para acentuar o look retrô.", "Não espere detalhes nítidos; o charme está na sua imperfeição."]
        }
    },
    {
        name: "Canon AE-1",
        short_info: "Câmera de filme 35mm icônica dos anos 70.",
        keywords: ["canon ae-1", "classic film camera", "analog look", "vintage style", "35mm film grain"],
        negative_keywords: ["oversaturated", "high contrast", "digital look"],
        icon: CameraIcon,
        technical_details: {
            title: "Canon AE-1: O Ícone do Filme 35mm",
            description: "Uma das câmeras de filme mais populares já feitas. Produz um look autêntico de filme, com grão característico e uma renderização de cores suave e nostálgica, típica da fotografia analógica.",
            pro_tips: ["Ideal para moda com tema retrô ou vintage.", "O grão do filme adiciona textura e uma qualidade tátil à imagem.", "As cores podem ter uma leve mudança de tom, que é parte do charme analógico."]
        }
    },
    {
        name: "Leica M6",
        short_info: "Câmera rangefinder de filme, look cinematográfico.",
        keywords: ["leica m6", "film photography", "cinematic look", "vintage lens", "rangefinder style"],
        negative_keywords: ["digital appearance", "excessive sharpness", "vibrant colors"],
        icon: CameraIcon,
        technical_details: {
            title: "Leica M6: A Lenda do Fotojornalismo",
            description: "Uma câmera de filme rangefinder lendária, famosa por sua discrição e qualidade ótica. O 'Leica look' é caracterizado por um micro-contraste que dá uma sensação tridimensional e uma renderização de cores única, muitas vezes associada a um estilo cinematográfico e documental.",
            pro_tips: ["Perfeita para um look de street style autêntico e atemporal.", "As lentes Leica (simuladas) são conhecidas por seu bokeh suave e renderização nítida.", "Cria um visual artístico e menos comercial."]
        }
    },
    {
        name: "Nikon F2",
        short_info: "DSLR de filme profissional, robusta e nítida.",
        keywords: ["nikon f2", "classic film camera", "professional quality", "analog style", "nikkor lens look"],
        negative_keywords: ["overexposed", "incorrect color balance", "soft focus"],
        icon: CameraIcon,
        technical_details: {
            title: "Nikon F2: O Tanque de Guerra Profissional",
            description: "Uma câmera de filme profissional construída para durar. Conhecida por sua confiabilidade e pela vasta gama de lentes Nikkor de alta qualidade. Produz imagens nítidas com cores realistas e o grão clássico do filme 35mm.",
            pro_tips: ["Excelente para um look de editorial de moda com uma estética de filme clássica.", "A qualidade de construção se traduz em imagens que parecem sólidas e bem definidas.", "Funciona bem com iluminação de estúdio para um look de filme controlado."]
        }
    },
];

const FASHION_CAMERA_ANGLES: Option[] = [
    { name: "Ângulo de 45° (Diagonal)", short_info: "Perspectiva equilibrada e natural.", keywords: ["45-degree angle", "diagonal perspective", "fashion outfit depth", "casual fashion"], negative_keywords: [], icon: FortyFiveDegreeAngleIcon, technical_details: { title: "Ângulo 45°: Profundidade e Naturalidade", description: "O ângulo mais comum e eficaz para moda. Mostra a frente e o lado do look simultaneamente, oferecendo uma visão tridimensional que revela profundidade e forma. É a visão mais natural.", pro_tips: ["A escolha ideal para a foto principal de uma campanha.", "Funciona para quase todos os tipos de looks e estilos, especialmente retratos de corpo inteiro."] } },
    { name: "Ângulo de Baixo (Upward Shot)", short_info: "Fotografia dramática e imponente.", keywords: ["low angle", "powerful perspective", "heroic fashion shot", "imposing outfit look"], negative_keywords: [], icon: LowAngleIcon, technical_details: { title: "Ângulo de Baixo: A Perspectiva Heroica", description: "A câmera é posicionada ligeiramente abaixo do modelo, olhando para cima. Isso cria uma perspectiva que torna a pessoa maior, mais grandiosa e poderosa. Transmite uma sensação de poder e confiança.", pro_tips: ["Excelente para editoriais de moda e looks com uma atitude forte.", "Alonga as pernas, criando uma silhueta elegante e imponente."] } },
    { name: "Ponto de Vista (POV)", short_info: "Simula a visão de quem usa.", keywords: ["POV shot", "first-person fashion", "immersive fashion photography", "hands-on perspective"], negative_keywords: [], icon: PovAngleIcon, technical_details: { title: "Ponto de Vista: A Experiência Pessoal", description: "A câmera simula o ponto de vista da pessoa que está usando a roupa. Cria uma conexão pessoal e ajuda o espectador a se imaginar naquela situação, interagindo com o look.", pro_tips: ["Incrivelmente eficaz para mostrar detalhes de bolsas, sapatos ou o caimento de uma saia.", "Cria um conteúdo autêntico e 'relatável' para redes sociais."] } },
    { name: "Close-up Detalhado (Detalhe de Tecidos)", short_info: "Foco nos detalhes da roupa.", keywords: ["extreme close-up", "fabric texture", "detailed fashion shot", "fine details"], negative_keywords: [], icon: ExtremeCloseUpAngleIcon, technical_details: { title: "Close-up de Detalhes: A Arte da Confecção", description: "Um enquadramento super fechado que revela a arte da confecção - a textura do tecido, o detalhe de um botão ou o bordado. É sobre mostrar a qualidade e o trabalho artesanal.", pro_tips: ["Requer uma lente macro e iluminação precisa.", "Revela detalhes que não são visíveis a olho nu, agregando valor à peça."] } },
    { name: "Ângulo de Topo (Flat Lay)", short_info: "Visão aérea com composição clara.", keywords: ["flat lay", "overhead shot", "top-down fashion", "outfit flat lay"], negative_keywords: [], icon: TopDownAngleIcon, technical_details: { title: "Vista de Cima: A Composição Completa", description: "Perfeito para exibir o design completo de um look, com as peças dispostas de forma artística no chão ou em uma superfície. Também é o ângulo padrão para 'flat lays' de acessórios.", pro_tips: ["Use para criar 'moodboards' com as peças, sapatos e outros adereços.", "A iluminação deve ser uniforme para evitar sombras indesejadas."] } },
    { name: "Ângulo de Visão Lateral (Side View)", short_info: "Destaca a silhueta e o movimento.", keywords: ["side view", "profile shot", "outfit silhouette", "fashion profile"], negative_keywords: [], icon: SideViewAngleIcon, technical_details: { title: "Visão Lateral: A Visão da Silhueta", description: "A câmera é posicionada ao lado do modelo, mostrando seu perfil. É crucial para roupas com detalhes laterais, drapeados ou para destacar a silhueta da peça.", pro_tips: ["Indispensável para vestidos e casacos para mostrar o caimento e o volume.", "Garante que o cliente veja todos os ângulos da peça."] } },
    { name: "Ângulo de Padrão (Straight On)", short_info: "Visão direta e frontal do look.", keywords: ["eye level angle", "straight-on fashion", "portrait fashion shot", "direct fashion perspective"], negative_keywords: [], icon: EyeLevelAngleIcon, technical_details: { title: "Ângulo Frontal: A Visão Direta", description: "A câmera fica no nível do olhar do modelo, capturando o look de frente. É o ângulo mais direto e claro para mostrar o design frontal de uma peça.", pro_tips: ["Essencial para lookbooks e fotos de e-commerce.", "Combine com iluminação uniforme para máxima clareza."] } },
    { name: "Ângulo de Perspectiva Criativa (Dutch Angle)", short_info: "Perspectiva dinâmica e ousada.", keywords: ["Dutch angle", "dynamic fashion shot", "creative fashion perspective", "fashion distortion"], negative_keywords: [], icon: DutchAngleIcon, technical_details: { title: "Ângulo Criativo: Dinamismo e Estilo", description: "A câmera é intencionalmente inclinada, criando uma composição diagonal que transmite energia, movimento e um toque artístico. Quebra a formalidade da fotografia de moda tradicional.", pro_tips: ["Use para campanhas de redes sociais para criar imagens mais cativantes e menos estáticas.", "Combine com iluminação de alto contraste para um look ainda mais dramático."] } },
];

const FASHION_DEPTHS_OF_FIELD: Option[] = [
    { name: "Foco Seletivo (f/2.8)", short_info: "Destaca um detalhe específico.", keywords: ["shallow depth of field", "blurred background", "creamy bokeh", "isolated subject", "f/2.8"], negative_keywords: ["everything in focus", "sharp background"], icon: SelectiveFocusIcon, technical_details: { title: "Foco Seletivo (f/2.8): Destaque Artístico", description: "Usa uma profundidade de campo rasa para focar em um detalhe específico do look, como um acessório ou a textura de um tecido, deixando o resto em um desfoque suave.", pro_tips: ["Ideal para direcionar o olhar do espectador.", "Cria um look profissional и de alta qualidade."] } },
    { name: "Bokeh Suave (f/4)", short_info: "Bokeh suave para look natural.", keywords: ["soft bokeh", "dreamy focus", "subject focus", "background blur", "f/4"], negative_keywords: ["harsh background", "too much clarity"], icon: ShallowDofIcon, technical_details: { title: "Bokeh Suave (f/4): O Toque Natural", description: "Cria um desfoque de fundo suave e agradável que não distrai, mas ainda dá contexto à cena. É o equilíbrio perfeito para fotos de lifestyle.", pro_tips: ["Perfeito para moda com estética orgânica.", "Funciona bem com iluminação difusa para um look delicado."] } },
    { name: "Foco Equilibrado (f/5.6)", short_info: "Equilíbrio entre objeto e fundo.", keywords: ["balanced focus", "natural scene", "clear background", "depth of field", "f/5.6"], negative_keywords: ["excessive blur", "background distraction"], icon: MediumDofIcon, technical_details: { title: "Foco Equilibrado (f/5.6): O Contexto da História", description: "Mantém o modelo em foco nítido, mas permite que o fundo seja reconhecível. Ideal para contar uma história e mostrar o look em seu ambiente.", pro_tips: ["Excelente para street style onde a cidade é importante.", "Oferece um look mais natural e documental."] } },
    { name: "Foco Profundo (f/11)", short_info: "Tudo em foco, ideal para paisagens.", keywords: ["deep depth of field", "everything in focus", "maximum clarity", "landscape focus", "f/11"], negative_keywords: ["blurry edges", "soft background"], icon: DeepDofIcon, technical_details: { title: "Foco Profundo (f/11): Clareza Total", description: "Garante que tanto o modelo quanto o cenário de fundo estejam nítidos. Ideal para fotos de moda em paisagens épicas ou cenários arquitetônicos.", pro_tips: ["Use quando o ambiente é tão importante quanto o look.", "Requer mais luz, ideal para fotos externas com boa iluminação."] } },
    { name: "Focus Stacking (f/11)", short_info: "Foco estendido para detalhes extremos.", keywords: ["focus stacking", "layered focus", "extreme detail", "sharp subject and background", "f/11"], negative_keywords: ["overexposure", "soft focus"], icon: DeepDofIcon, technical_details: { title: "Focus Stacking: Nitidez Absoluta", description: "Simula a técnica de combinar várias fotos para garantir que um acessório ou o look inteiro esteja perfeitamente nítido de ponta a ponta.", pro_tips: ["Essencial para fotografia de bolsas, sapatos e acessórios em estúdio.", "Garante clareza máxima para e-commerce."] } },
    { name: "Foco Ultra Raso (f/1.2)", short_info: "Desfoque máximo e foco seletivo.", keywords: ["ultra shallow depth", "dreamy bokeh", "extreme focus", "isolated subject", "f/1.2"], negative_keywords: ["everything in focus", "too much clarity"], icon: UltraShallowDofIcon, technical_details: { title: "Foco Ultra Raso (f/1.2): O Look Etéreo", description: "Cria um desfoque de fundo extremo e cremoso, com uma área de foco muito fina. Ideal para um look sonhador, artístico e de alta moda.", pro_tips: ["Foque precisamente nos olhos do modelo.", "Cria uma separação dramática entre o modelo e o fundo."] } },
    { name: "Foco Moderado (f/2.0)", short_info: "Equilíbrio entre desfoque e nitidez.", keywords: ["moderate depth of field", "soft background", "subject focus", "clear but blurred background", "f/2.0"], negative_keywords: ["too much blur", "unfocused subject"], icon: ShallowDofIcon, technical_details: { title: "Foco Moderado (f/2.0): O Retrato Clássico", description: "Oferece um belo desfoque de fundo que isola o modelo, mas sem ser tão extremo. É o ponto ideal para a maioria dos retratos de moda.", pro_tips: ["Lisonjeiro para o retratado.", "Versátil para fotos de meio corpo e corpo inteiro."] } },
    { name: "Foco Completo (f/22)", short_info: "Máxima profundidade de campo.", keywords: ["maximum depth of field", "everything sharp", "complete clarity", "landscape or e-commerce focus", "f/22"], negative_keywords: ["blurry background", "overexposure"], icon: DeepDofIcon, technical_details: { title: "Foco Completo (f/22): Nitidez Máxima", description: "Utiliza a menor abertura possível para maximizar a área em foco. Perfeito para lookbooks de estúdio onde cada detalhe da roupa precisa estar visível.", pro_tips: ["Ideal para fotos de e-commerce em fundo branco.", "Requer iluminação de estúdio potente."] } },
    { name: "Foco Dinâmico (f/8)", short_info: "Equilíbrio visual com boa profundidade.", keywords: ["dynamic depth", "balanced focus", "foreground and background clarity", "visual depth", "f/8"], negative_keywords: ["soft focus", "excessive blur"], icon: MediumDofIcon, technical_details: { title: "Foco Dinâmico (f/8): A Foto de Grupo", description: "Uma profundidade de campo que garante que múltiplos modelos ou elementos em diferentes distâncias estejam em foco. Ideal para fotos de campanha com mais de uma pessoa.", pro_tips: ["Essencial para fotos de grupo ou lookbooks com múltiplos looks.", "Mantém a cena coesa e todos os sujeitos nítidos."] } }
];

const FASHION_LIGHTING_STYLES: Option[] = [
    { name: "Luz Lateral Suave", short_info: "Iluminação suave de lado.", keywords: ["side light", "soft shadows", "natural highlight", "profile silhouette"], negative_keywords: ["hard shadows", "overexposed"], icon: NaturalWindowLightIcon, technical_details: { title: "Luz Lateral Suave: Modelando com Suavidade", description: "Uma fonte de luz difusa posicionada ao lado do modelo. Cria sombras suaves que definem a forma do corpo e da roupa, adicionando profundidade e volume de uma maneira natural e lisonjeira.", pro_tips: ["A iluminação mais versátil e segura para retratos de moda.", "Use um rebatedor no lado oposto para suavizar ainda mais as sombras.", "Ideal para realçar a textura de tecidos."] } },
    { name: "Backlight (Contraluz)", short_info: "Luz vinda de trás do modelo.", keywords: ["backlight", "silhouette", "rim lighting", "halo effect"], negative_keywords: ["flat lighting", "lack of contrast"], icon: BacklightIcon, technical_details: { title: "Backlight: O Contorno Luminoso", description: "A principal fonte de luz está atrás do modelo, criando um contorno de luz (rim light) que o separa do fundo. Pode criar silhuetas dramáticas ou um 'halo' etéreo.", pro_tips: ["Perfeito para destacar a forma do cabelo e dos ombros.", "Use um rebatedor frontal para garantir que o rosto do modelo não fique muito escuro.", "Funciona bem com tecidos translúcidos."] } },
    { name: "Luz de Janela Natural", short_info: "Luz suave entrando de uma janela.", keywords: ["natural window light", "soft shadows", "ambient light", "romantic atmosphere"], negative_keywords: ["overexposed highlights", "dark shadows"], icon: NaturalWindowLightIcon, technical_details: { title: "Luz de Janela: A Beleza da Simplicidade", description: "A luz suave e difusa que entra por uma janela grande. É perfeita para criar um look de estilo de vida natural, orgânico e autêntico, mostrando a roupa em um ambiente real.", pro_tips: ["Funciona melhor em dias nublados para uma luz ainda mais suave.", "Posicione o modelo perto da janela para aproveitar ao máximo a luz e criar sombras suaves."] } },
    { name: "Luz de Estúdio (Lightbox)", short_info: "Iluminação uniforme e direta.", keywords: ["studio light", "clean background", "e-commerce lighting", "product shot", "softbox"], negative_keywords: ["harsh shadows", "uneven lighting"], icon: StudioLightIcon, technical_details: { title: "Luz de Estúdio (Lightbox): Clareza para E-commerce", description: "Simula uma grande fonte de luz suave (como um softbox ou lightbox) para iluminar o modelo de forma uniforme, minimizando sombras e destacando a roupa de forma clara e objetiva.", pro_tips: ["Padrão para lookbooks e fotografia de e-commerce.", "Cria um look limpo e profissional, ideal para fundos brancos.", "Garante que a cor da roupa seja representada com precisão."] } },
    { name: "Golden Hour (Hora Dourada)", short_info: "Luz quente do final da tarde.", keywords: ["golden hour", "warm tones", "sunset glow", "soft lighting"], negative_keywords: ["overexposure", "lack of detail"], icon: GoldenHourIcon, technical_details: { title: "Golden Hour: Calidez e Lifestyle", description: "Simula a luz quente, suave e dourada do pôr do sol. Cria uma atmosfera calorosa, orgânica e convidativa, perfeita para fotos de estilo de vida e campanhas em redes sociais.", pro_tips: ["Funciona bem em cenários naturais, como praias ou campos.", "Realça os tons de pele e cria um brilho suave na roupa."] } },
    { name: "Luz de Sombra Lateral", short_info: "Luz lateral com sombras fortes.", keywords: ["side shadows", "strong contrast", "dramatic lighting", "deep shadows"], negative_keywords: ["flat lighting", "unbalanced exposure"], icon: LowKeyIcon, technical_details: { title: "Luz de Sombra Lateral: Drama e Contraste", description: "Uma única fonte de luz posicionada ao lado, criando um contraste acentuado entre luz e sombra no modelo. Adiciona drama, profundidade e um toque 'moody' à imagem.", pro_tips: ["Excelente para moda masculina ou looks com atitude.", "Use um fundo escuro para intensificar o efeito dramático.", "Define a musculatura e a forma do corpo."] } },
    { name: "Luz Dura Direta", short_info: "Iluminação intensa e contrastante.", keywords: ["hard light", "sharp shadows", "high contrast", "powerful lighting", "direct flash"], negative_keywords: ["overexposure", "blown-out highlights"], icon: HardLightIcon, technical_details: { title: "Luz Dura Direta: O Look de Alto Contraste", description: "Vem de uma fonte de luz pequena e sem difusão (como o sol do meio-dia ou um flash direto), criando sombras de bordas nítidas. É uma escolha ousada, popular em editoriais de alta moda.", pro_tips: ["Use para criar um look dramático e arrojado.", "As sombras podem ser usadas como um elemento de composição forte.", "Realça texturas como couro e lantejoulas."] } },
    { name: "Luz de Estúdio Branca (Catálogo)", short_info: "Iluminação clara e uniforme.", keywords: ["clean light", "catalog lighting", "product photo", "studio lighting", "three-point lighting"], negative_keywords: ["flat look", "lack of texture", "dramatic shadows"], icon: StudioLightIcon, technical_details: { title: "Luz de Estúdio Branca: O Padrão de Catálogo", description: "Usa múltiplas fontes de luz para criar uma iluminação clara, uniforme e quase sem sombras. O objetivo é mostrar a roupa da forma mais objetiva possível.", pro_tips: ["Padrão para lookbooks e e-commerce em fundo branco.", "Garante cores precisas e visibilidade de todos os detalhes da peça.", "Transmite uma sensação limpa e profissional."] } },
    { name: "Luz de Cima (Overhead)", short_info: "Iluminação vinda de cima.", keywords: ["overhead light", "flat lay lighting", "even illumination", "top-down"], negative_keywords: ["harsh shadows", "imbalanced light", "raccoon eyes"], icon: OverheadLightIcon, technical_details: { title: "Luz de Cima: A Luz do Flat Lay", description: "Uma grande fonte de luz suave posicionada diretamente acima da composição. É a configuração ideal para fotos 'flat lay' de roupas e acessórios, pois fornece uma iluminação uniforme.", pro_tips: ["Essencial para exibir o look completo em uma composição artística.", "Evite usar em modelos em pé, pois pode criar sombras indesejadas sob os olhos.", "Pode ser usada de forma criativa para um look dramático."] } },
    { name: "Luz de Neon (Efeito Urbano)", short_info: "Iluminação colorida e vibrante.", keywords: ["neon light", "vibrant colors", "urban lighting", "creative light", "cyberpunk fashion"], negative_keywords: ["low contrast", "poor saturation", "natural look"], icon: NeonLightIcon, technical_details: { title: "Luz de Neon: O Brilho Urbano", description: "Usa luzes de neon ou géis coloridos para criar um look urbano, noturno e vibrante. Ideal para moda com tema noturno, street style e para criar um visual que se destaca nas redes sociais.", pro_tips: ["Combine cores complementares para um efeito visualmente impactante.", "Abrace os reflexos coloridos no tecido e na pele como parte da estética."] } },
    { name: "Luz Suave de Fundo", short_info: "Luz suave atrás do modelo.", keywords: ["backlight glow", "halo effect", "silhouette highlighting", "soft background"], negative_keywords: ["flat lighting", "no contrast", "dark subject"], icon: BacklightIcon, technical_details: { title: "Luz Suave de Fundo: O Brilho Etéreo", description: "Uma luz suave vinda de trás ilumina o fundo e cria um brilho delicado ao redor do modelo. Cria um look sonhador, etéreo e romântico.", pro_tips: ["Funciona muito bem para moda noiva e looks com tecidos leves.", "Requer uma luz de preenchimento frontal para iluminar o modelo adequadamente.", "Cria uma separação clara e bonita entre o modelo e o fundo."] } },
    { name: "Luz Contínua Quente", short_info: "Luz quente e acolhedora.", keywords: ["warm continuous light", "tungsten light", "cozy lighting", "romantic mood"], negative_keywords: ["harsh yellow tone", "imbalanced exposure", "cool colors"], icon: CandlelightIcon, technical_details: { title: "Luz Contínua Quente: Aconchego e Intimidade", description: "Simula a luz de lâmpadas incandescentes ou velas. Cria uma atmosfera quente, íntima e acolhedora, perfeita para associar a moda a momentos especiais e pessoais, como em moda de inverno.", pro_tips: ["Ideal para campanhas de inverno ou com tema aconchegante.", "Realça tecidos como lã, tricô e veludo."] } },
    { name: "Luz de Alta Intensidade (High Key)", short_info: "Luz clara e sem sombras.", keywords: ["high key", "bright lighting", "airy atmosphere", "light tone", "shadowless"], negative_keywords: ["low contrast", "blown-out details", "dark background"], icon: HighKeyIcon, technical_details: { title: "High Key: Pureza e Leveza", description: "Esta técnica usa iluminação abundante para criar uma cena predominantemente clara, muitas vezes com um fundo branco puro e sombras mínimas. O resultado é um look limpo, arejado e otimista.", pro_tips: ["Ideal para e-commerce em fundo branco e moda de verão.", "Transmite uma sensação de pureza, simplicidade e minimalismo.", "Requer múltiplas fontes de luz para preencher todas as sombras."] } },
    { name: "Luz de Perfil (Side Lighting)", short_info: "Luz forte vinda de um lado.", keywords: ["side light", "profile shadows", "dramatic contrast", "highlighting textures"], negative_keywords: ["flat light", "lack of texture"], icon: SideLightIcon, technical_details: { title: "Luz de Perfil: Esculpindo a Forma", description: "Uma única fonte de luz posicionada a 90 graus do modelo, iluminando apenas um lado. Cria um contraste extremo e é excelente para destacar a silhueta e a forma do corpo e da roupa.", pro_tips: ["Muito dramático e artístico.", "Ideal para fotografia de nu artístico, moda fitness ou para destacar a silhueta de um vestido.", "Funciona melhor com o modelo de perfil para a câmera."] } },
    { name: "Luz Suave e Difusa", short_info: "Luz suave e sem sombras duras.", keywords: ["soft diffused light", "even light", "natural glow", "gentle shadows"], negative_keywords: ["hard shadows", "uneven exposure", "high contrast"], icon: NaturalWindowLightIcon, technical_details: { title: "Luz Suave e Difusa: A Beleza Universal", description: "Simula a luz de um dia nublado, onde a luz vem de todas as direções de forma suave e uniforme. É extremamente lisonjeira, minimiza imperfeições e cria um look calmo e sereno.", pro_tips: ["A iluminação mais segura e universalmente agradável.", "Ideal para retratos de beleza e moda onde a pele deve parecer perfeita.", "Envolve o modelo em luz, criando uma sensação de leveza."] } }
];

const FASHION_PRESETS: StudioPreset[] = [
    { name: "Roupa (Street Style)", description: "Modelo usando a roupa em um cenário urbano.", icon: TshirtIcon, preset: { cameraName: 'Sony A7 IV 35mm f/1.4 (Estilo Urbano)', angle: 'Ângulo de 45° (Diagonal)', depthOfFieldName: 'Foco Equilibrado (f/5.6)', lightingName: 'Backlight (Contraluz)', stylePlaceholder: "Modelo em um look de rua estiloso em uma cidade movimentada como Nova York, com prédios e táxis desfocados ao fundo." }, examples: ["street style", "fashion model", "urban", "ootd"] },
    { name: "Sapatos (E-commerce)", description: "Foto de produto limpa para sapatos.", icon: ShoesIcon, preset: { cameraName: 'Canon R5 + 100mm Macro (Detalhes Precisos)', angle: 'Ângulo de Topo (Flat Lay)', depthOfFieldName: 'Focus Stacking (f/11)', lightingName: 'Luz de Estúdio (Lightbox)', stylePlaceholder: "Tênis de edição limitada em um fundo de cor sólida, com iluminação de estúdio perfeita, destacando cada detalhe." }, examples: ["sneakers", "shoes", "product shot", "e-commerce", "clean background"] },
    { name: "Lingerie (Sensual)", description: "Cena delicada e íntima para moda íntima.", icon: LingerieIcon, preset: { cameraName: 'Fujifilm X-T4 (Look Cinemático)', angle: 'Close-up Detalhado (Detalhe de Tecidos)', depthOfFieldName: 'Bokeh Suave (f/4)', lightingName: 'Luz de Janela Natural', stylePlaceholder: "Modelo em um conjunto de lingerie de seda em um quarto de hotel de luxo, com luz suave da janela criando sombras delicadas." }, examples: ["lingerie", "renda", "seda", "boudoir", "moda íntima", "sensual"] },
    { name: "Bolsas (Luxo)", keywords: ["handbag", "luxury bag", "leather", "product photography", "still life"], description: "Destaque para bolsas como produto de luxo.", icon: FashionIcon, preset: { cameraName: 'Fuji GFX 100 II (Luxo e Detalhes)', angle: 'Ângulo de Padrão (Straight On)', depthOfFieldName: 'Focus Stacking (f/11)', lightingName: 'Luz de Estúdio (Lightbox)', stylePlaceholder: "Bolsa de couro de luxo em um pedestal de mármore, com iluminação de estúdio que destaca a textura e o hardware dourado." }, examples: ["handbag", "luxury bag", "leather", "product photography", "still life"] },
    { name: "Óculos de Sol (Lifestyle)", description: "Retrato de moda com foco nos óculos.", icon: PeopleIcon, preset: { cameraName: 'Sony 35mm f/1.4 (Estilo Editorial)', angle: 'Ponto de Vista (POV)', depthOfFieldName: 'Foco Seletivo (f/2.8)', lightingName: 'Golden Hour (Hora Dourada)', stylePlaceholder: "Modelo usando óculos de sol estilosos em uma praia da Califórnia, com o sol se pondo no oceano ao fundo." }, examples: ["sunglasses", "eyewear", "lifestyle", "golden hour", "beach fashion", "portrait"] },
    { name: "Roupas Esportivas (Ação)", description: "Capture a energia da moda fitness.", icon: TshirtIcon, preset: { cameraName: 'Nikon Z8 + 70-200mm f/2.8 (Captura Rápida)', angle: 'Ângulo de Baixo (Upward Shot)', depthOfFieldName: 'Foco Dinâmico (f/8)', lightingName: 'Luz Dura Direta', stylePlaceholder: "Atleta em movimento em uma quadra de basquete urbana, com luz de alto contraste destacando os músculos e o tecido da roupa." }, examples: ["activewear", "sportswear", "fitness", "athlete", "action shot", "gym"] },
    { name: "Alta Costura (Editorial)", description: "Crie uma imagem de moda conceitual e artística.", icon: FashionIcon, preset: { cameraName: 'Phase One XF IQ4 (Máxima Definição)', angle: 'Ângulo de 45° (Diagonal)', depthOfFieldName: 'Foco Dinâmico (f/8)', lightingName: 'Luz Suave e Difusa', stylePlaceholder: "Modelo usando um vestido de alta costura extravagante em um cenário arquitetônico minimalista, criando um contraste dramático." }, examples: ["haute couture", "editorial", "avant-garde", "high fashion", "runway"] },
    { name: "Moda Noiva (Romântico)", keywords: ["bridal fashion", "wedding gown", "lace detail", "romantic mood", "soft focus"], description: "Cena etérea e romântica para vestidos de noiva.", icon: FashionIcon, preset: { cameraName: 'Hasselblad X2D 100C (Cores Naturais)', angle: 'Close-up Detalhado (Detalhe de Tecidos)', depthOfFieldName: 'Bokeh Suave (f/4)', lightingName: 'Luz de Janela Natural', stylePlaceholder: "Close-up de um vestido de noiva com detalhes em renda e pérolas, com luz suave de uma janela iluminando a noiva." }, examples: ["bridal", "wedding dress", "romantic", "soft light", "bride"] },
    { name: "Lookbook (Estúdio)", description: "Foto limpa e direta para catálogos e e-commerce.", icon: TshirtIcon, preset: { cameraName: 'Canon R5 + 100mm Macro (Cores Naturais)', angle: 'Ângulo de Topo (Flat Lay)', depthOfFieldName: 'Foco Completo (f/22)', lightingName: 'Luz de Estúdio (Lightbox)', stylePlaceholder: "Look completo de moda feminina para um lookbook, com fundo de estúdio branco, mostrando claramente cada peça." }, examples: ["lookbook", "e-commerce", "studio", "clean background", "full body"] },
    { name: "Acessórios (Flat Lay)", description: "Composição artística para acessórios.", icon: JewelryIcon, preset: { cameraName: 'OM System OM-1 (Detalhes Preciso)', angle: 'Ângulo de Padrão (Straight On)', depthOfFieldName: 'Foco Profundo (f/11)', lightingName: 'Luz de Janela Natural', stylePlaceholder: "Flat lay de acessórios de couro, como cinto, carteira e relógio, em uma superfície de madeira escura, com iluminação natural." }, examples: ["accessories", "flat lay", "still life", "belt", "scarf", "wallet"] },
    { name: "Moda Praia (Vibrante)", description: "Cena solar e vibrante para roupas de banho.", icon: LingerieIcon, preset: { cameraName: 'Canon R5 + 35mm f/1.8 (Cores Vibrantes)', angle: 'Ângulo de Visão Lateral (Side View)', depthOfFieldName: 'Foco Dinâmico (f/8)', lightingName: 'Golden Hour (Hora Dourada)', stylePlaceholder: "Modelo usando um biquíni colorido em uma praia tropical, com a luz dourada do sol realçando o bronzeado e as cores vibrantes." }, examples: ["swimwear", "beachwear", "bikini", "summer", "tropical", "beach"] },
    { name: "Jeanswear (Urbano)", description: "Look casual e autêntico com foco em jeans.", icon: TshirtIcon, preset: { cameraName: 'Canon 50mm f/1.8 (Look Casual)', angle: 'Ângulo de Padrão (Straight On)', depthOfFieldName: 'Foco Dinâmico (f/8)', lightingName: 'Luz Lateral Suave', stylePlaceholder: "Modelo usando uma jaqueta jeans e calça em um loft com paredes de tijolo, com luz natural de grandes janelas." }, examples: ["denim", "jeans", "urban", "casual", "lifestyle", "loft"] },
    { name: "Moda Inverno (Aconchegante)", description: "Cena quente e confortável para roupas de inverno.", icon: TshirtIcon, preset: { cameraName: 'Fujifilm X-T4 (Look Cinemático)', angle: 'Ângulo de 45° (Diagonal)', depthOfFieldName: 'Bokeh Suave (f/4)', lightingName: 'Luz de Janela Natural', stylePlaceholder: "Modelo usando um suéter de lã aconchegante ao lado de uma lareira acesa em uma cabana de madeira, criando uma atmosfera quente." }, examples: ["winter fashion", "cozy", "knitwear", "sweater", "cabin", "fireplace"] },
    { name: "Moda Festa (Glamour)", description: "Cena noturna e glamorosa para vestidos de festa.", icon: FashionIcon, preset: { cameraName: 'Sony 35mm f/1.4 (Estilo Editorial)', angle: 'Ângulo de 45° (Diagonal)', depthOfFieldName: 'Foco Seletivo (f/2.8)', lightingName: 'Luz Dura Direta', stylePlaceholder: "Modelo usando um vestido de lantejoulas em uma festa de gala, com luzes da cidade desfocadas ao fundo, criando um look glamoroso." }, examples: ["party dress", "evening wear", "glamour", "sequins", "nightlife"] },
    { name: "Moda Executiva (Sofisticado)", description: "Look poderoso e elegante para o ambiente de trabalho.", icon: PeopleIcon, preset: { cameraName: 'Leica S3 + 120mm (Alta Definição)', angle: 'Ângulo de 45° (Diagonal)', depthOfFieldName: 'Foco Seletivo (f/2.8)', lightingName: 'Luz Suave e Difusa', stylePlaceholder: "Pessoa em um terno bem cortado em um escritório moderno e minimalista, transmitindo confiança e sofisticação." }, examples: ["business attire", "corporate fashion", "power suit", "office", "sophisticated"] },
    { name: "Moda Infantil (Lúdico)", description: "Cena divertida e colorida para roupas infantis.", icon: TshirtIcon, preset: { cameraName: 'Canon 50mm f/1.8 (Look Natural)', angle: 'Ângulo de Padrão (Straight On)', depthOfFieldName: 'Bokeh Suave (f/4)', lightingName: 'Luz de Janela Natural', stylePlaceholder: "Criança sorridente usando roupas coloridas em um parquinho ensolarado, com balões e brinquedos ao fundo, atmosfera alegre e divertida." }, examples: ["moda infantil", "roupa de criança", "kids fashion", "brincadeiras", "lúdico", "alegre"] }
];


export const fashionStudioConfig = {
    id: 'fashion' as const,
    name: "Estúdio de Moda AI",
    specialty: "fotografia de moda",
    presets: FASHION_PRESETS,
    cameras: FASHION_CAMERAS,
    angles: FASHION_CAMERA_ANGLES,
    depthsOfField: FASHION_DEPTHS_OF_FIELD,
    lightingStyles: FASHION_LIGHTING_STYLES,
};