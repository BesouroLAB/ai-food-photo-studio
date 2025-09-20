import { Option } from './types';

export const CAMERAS: Option[] = [
  {
    "name": "Canon EOS R5",
    "prompt_keywords": ["shot on Canon EOS R5", "full-frame sensor", "45MP resolution", "vibrant Canon colors", "sharp textures", "gourmet food photography", "professional detail", "clean image"],
    "tooltip": {
      "benefits": "Sensor de 45 MP, captura detalhes incríveis. Ideal para fotos de pratos sofisticados e uso comercial.",
      "pros": "Nitidez absurda, cores realistas e ricas, excelente performance em baixa luz.",
      "cons": "Arquivos de imagem muito pesados, pode parecer 'digital demais' sem tratamento.",
      "recommended_food": "Pratos gourmet, carnes suculentas, texturas complexas, menus de restaurantes premium."
    }
  },
  {
    "name": "Canon EOS R6 Mark II",
    "prompt_keywords": ["shot on Canon EOS R6 Mark II", "full-frame sensor", "warm tones", "balanced colors", "cinematic depth", "creamy bokeh", "natural food photography"],
    "tooltip": {
      "benefits": "Excelente custo-benefício para full-frame, conhecida por cores que agradam o olhar humano.",
      "pros": "Cores quentes e agradáveis, ótima para fotos e vídeos, performance sólida em pouca luz.",
      "cons": "Resolução menor (24 MP), menos detalhes finos que a R5.",
      "recommended_food": "Massas, pratos italianos, vinhos, fotografia de lifestyle e ambientes aconchegantes."
    }
  },
  {
    "name": "Sony A7R V",
    "prompt_keywords": ["shot on Sony A7R V", "full-frame sensor", "61MP ultra high resolution", "hyper-detailed textures", "deep contrast", "tack sharp", "luxury food photography"],
    "tooltip": {
      "benefits": "Sensor de 61 MP, a escolha para máximo detalhe. Captura cada grão de sal, cada bolha de ar.",
      "pros": "Resolução para catálogos, outdoors e impressões gigantes. Foco automático inteligente.",
      "cons": "Exige lentes de altíssima qualidade e muito espaço de armazenamento.",
      "recommended_food": "Sobremesas complexas, confeitaria artística, close-ups extremos de ingredientes, joalheria comestível."
    }
  },
  {
    "name": "Sony A7 III",
    "prompt_keywords": ["shot on Sony A7 III", "full-frame sensor", "versatile", "cinematic look", "realistic colors", "smooth background blur", "G-Master lens"],
    "tooltip": {
      "benefits": "Um 'canivete suíço' da fotografia. Grande equilíbrio entre preço, performance e qualidade.",
      "pros": "Muito versátil, funciona bem em estúdio e em restaurantes com pouca luz. Ótima para vídeo.",
      "cons": "Menus complexos, resolução menor que rivais mais recentes.",
      "recommended_food": "Hambúrgueres, comidas de rua, pratos em ambientes descontraídos, uso geral."
    }
  },
  {
    "name": "Sony ZV-E10",
    "prompt_keywords": ["shot on Sony ZV-E10", "APS-C sensor", "creator style", "social media friendly", "vivid tones", "bright and punchy", "flat lay photos"],
    "tooltip": {
      "benefits": "Compacta, leve e otimizada para criadores de conteúdo digital e vídeos.",
      "pros": "Fácil de usar, tela articulada, boa para foto e vídeo de redes sociais.",
      "cons": "Sensor APS-C limita a profundidade de campo e a performance em baixa luz.",
      "recommended_food": "Pratos para Instagram, receitas caseiras, 'unboxing' de ingredientes, flat lays coloridos."
    }
  },
  {
    "name": "Nikon Z7 II",
    "prompt_keywords": ["shot on Nikon Z7 II", "full-frame sensor", "45.7MP", "crisp detail", "true-to-life colors", "studio food photography", "editorial style", "natural rendering"],
    "tooltip": {
      "benefits": "Excelente resolução com cores muito fiéis e naturais, uma favorita de fotógrafos de estúdio.",
      "pros": "Qualidade de imagem fantástica para catálogos e editoriais de restaurantes.",
      "cons": "Sistema de lentes pode ser mais caro, foco automático um pouco atrás da Sony.",
      "recommended_food": "Frutos do mar, pratos brancos e minimalistas, menus de alta gastronomia, fotografia técnica."
    }
  },
  {
    "name": "Nikon D850",
    "prompt_keywords": ["shot on Nikon D850 DSLR", "full-frame sensor", "45.7MP", "ultra sharp", "rich dynamic range", "professional detail", "classic photography style"],
    "tooltip": {
      "benefits": "Uma lenda das câmeras DSLR, referência em estúdios por sua robustez e qualidade de imagem.",
      "pros": "Nitidez fantástica e uma gama dinâmica que recupera muita informação em sombras e altas luzes.",
      "cons": "Pesada, grande e menos prática que as câmeras mirrorless mais modernas.",
      "recommended_food": "Churrasco, carnes grelhadas, pratos com muito contraste, fotografia de estúdio clássica."
    }
  },
  {
    "name": "Fujifilm X-T5",
    "prompt_keywords": ["shot on Fujifilm X-T5", "APS-C X-Trans sensor", "film-like colors", "vibrant tones", "retro look", "artistic food photography", "Fujifilm film simulation"],
    "tooltip": {
      "benefits": "As famosas simulações de filme da Fuji criam cores únicas e um look analógico direto da câmera.",
      "pros": "Leve, portátil e com um apelo estético forte para conteúdo criativo e artístico.",
      "cons": "Sensor APS-C não tem o mesmo nível de desfoque de fundo (bokeh) que uma full-frame.",
      "recommended_food": "Cafés, sobremesas coloridas, comida artesanal, pratos com um toque vintage ou 'moody'."
    }
  },
  {
    "name": "Fujifilm GFX 100 II",
    "prompt_keywords": ["shot on Fujifilm GFX 100 II", "medium format sensor", "102MP ultra resolution", "hyper realistic", "luxury textures", "fine dining photography", "immense detail"],
    "tooltip": {
      "benefits": "Sensor de médio formato, um nível acima do full-frame. Detalhes e profundidade de cor absurdos.",
      "pros": "Qualidade de imagem de ponta, referência para fotografia publicitária de altíssimo nível.",
      "cons": "Extremamente cara, grande e com um fluxo de trabalho mais lento.",
      "recommended_food": "Alta gastronomia, fotografia editorial de luxo, confeitaria gourmet, publicidade de alimentos."
    }
  },
  {
    "name": "Hasselblad X2D 100C",
    "prompt_keywords": ["shot on Hasselblad X2D 100C", "medium format sensor", "100MP", "perfect color science", "ultra premium", "magazine style food photography", "natural color solution"],
    "tooltip": {
      "benefits": "A ciência de cores da Hasselblad é lendária, produzindo tons de pele e cores de alimentos perfeitos.",
      "pros": "Qualidade de imagem lendária para editoriais de capa de revista e campanhas de luxo.",
      "cons": "Preço astronômico, equipamento de nicho e pesado.",
      "recommended_food": "Menus 5 estrelas, sobremesas de luxo, fotografia publicitária para marcas premium, vinhos e destilados."
    }
  },
  {
    "name": "Canon PowerShot G7X Mark III",
    "prompt_keywords": ["shot on Canon PowerShot G7X", "1-inch sensor", "compact camera", "portable", "social media style", "bright tones", "casual food photography"],
    "tooltip": {
      "benefits": "Câmera de bolso muito popular entre criadores de conteúdo e vloggers.",
      "pros": "Extremamente leve e prática para viagens e vlogs. Boa qualidade para seu tamanho.",
      "cons": "Sensor pequeno limita a profundidade de campo e a qualidade em baixa luz.",
      "recommended_food": "Comidas de rua, cafés, sobremesas rápidas, 'o que eu como em um dia'."
    }
  },
  {
    "name": "Panasonic Lumix GH6",
    "prompt_keywords": ["shot on Panasonic Lumix GH6", "micro four thirds sensor", "cinematic colors", "hybrid video-photo", "vibrant food shots", "V-Log"],
    "tooltip": {
      "benefits": "Uma potência para vídeo, também tira fotos excelentes. Ótima para quem faz os dois.",
      "pros": "Estabilização de imagem incrível, ideal para filmar o preparo de receitas sem tripé.",
      "cons": "Sensor menor (Micro 4/3) tem mais dificuldade com desfoque de fundo e baixa luz.",
      "recommended_food": "Pratos em movimento, vídeos de preparo, receitas passo a passo, 'food action shots'."
    }
  },
  {
    "name": "Leica Q2",
    "prompt_keywords": ["shot on Leica Q2", "full-frame compact", "summilux 28mm f/1.7 lens", "minimalistic look", "timeless photography", "elegant food style", "sharp and clean"],
    "tooltip": {
      "benefits": "A lendária qualidade Leica com uma lente fixa espetacular em um corpo compacto.",
      "pros": "Cores e nitidez premium com um look clássico e atemporal. Simples e direta.",
      "cons": "Lente fixa (sem zoom), preço extremamente elevado para uma compacta.",
      "recommended_food": "Pratos minimalistas, culinária japonesa, sushi e sashimi, fotografia de restaurante elegante."
    }
  },
  {
    "name": "Olympus OM-D E-M1 Mark III",
    "prompt_keywords": ["shot on Olympus OM-D", "micro four thirds sensor", "lightweight", "pro-level stabilization", "travel food photography", "natural tones"],
    "tooltip": {
      "benefits": "Sistema extremamente compacto e leve com estabilização de imagem líder de mercado.",
      "pros": "Ideal para viagens gastronômicas, pode ser carregada o dia todo sem cansar.",
      "cons": "Sensor menor (Micro 4/3) com menor resolução e performance em baixa luz que full-frame.",
      "recommended_food": "Street food, feiras gastronômicas, comidas exóticas em viagens, reportagem culinária."
    }
  },
  {
    "name": "Canon EOS R50",
    "prompt_keywords": ["shot on Canon EOS R50", "APS-C sensor", "entry level", "colorful tones", "social media friendly", "easy food photography"],
    "tooltip": {
        "benefits": "Câmera de entrada acessível, leve e com a ciência de cores da Canon.",
        "pros": "Ideal para iniciantes, interface simples, ótima para conteúdo rápido para redes sociais.",
        "cons": "Menos robusta e com menos recursos avançados para trabalhos profissionais complexos.",
        "recommended_food": "Sobremesas simples, pratos caseiros, comida do dia a dia, conteúdo para stories."
    }
  }
];

export const DEPTHS_OF_FIELD: Option[] = [
    {
        "name": "Ultra Raso (f/1.2)",
        "prompt_keywords": ["ultra shallow depth of field", "f/1.2 aperture", "creamy dreamy bokeh", "subject isolation", "ethereal background blur"],
        "tooltip": {
            "benefits": "Cria um desfoque de fundo extremamente suave e cremoso, isolando completamente o prato.",
            "pros": "Look cinematográfico e artístico. Excelente para destacar um único ponto de interesse.",
            "cons": "Área de foco mínima, pode ser difícil manter o prato inteiro nítido.",
            "recommended_food": "Detalhes de sobremesas, um único drink, ingredientes específicos, fotografia de luxo."
        }
    },
    {
        "name": "Raso (f/2.8)",
        "prompt_keywords": ["shallow depth of field", "f/2.8 aperture", "beautiful soft bokeh", "professional food look", "subject separation"],
        "tooltip": {
            "benefits": "O padrão da indústria para fotografia de alimentos. Desfoca o fundo o suficiente para eliminar distrações.",
            "pros": "Equilíbrio perfeito entre nitidez no prato e um fundo suave e agradável.",
            "cons": "Pode não ser suficiente para isolar o prato em cenários muito poluídos.",
            "recommended_food": "Hambúrgueres, pratos principais, bolos, a maioria dos cenários de restaurante."
        }
    },
    {
        "name": "Médio (f/8)",
        "prompt_keywords": ["medium depth of field", "f/8 aperture", "clear context", "table scene", "everything in focus"],
        "tooltip": {
            "benefits": "Mantém tanto o prato principal quanto o cenário ao redor em foco nítido.",
            "pros": "Ótimo para mostrar o contexto, como uma mesa de jantar completa ou o ambiente do restaurante.",
            "cons": "Pode incluir distrações no fundo se o cenário não for bem controlado.",
            "recommended_food": "Cenas de banquete, 'flat lays' (fotos de cima), pratos que fazem parte de uma mesa maior."
        }
    },
    {
        "name": "Profundo (f/16)",
        "prompt_keywords": ["deep depth of field", "f/16 aperture", "landscape style", "sharp from front to back", "everything sharp"],
        "tooltip": {
            "benefits": "Garante que quase tudo na imagem, do primeiro plano ao fundo distante, esteja nítido.",
            "pros": "Excelente para fotografia de paisagens gastronômicas ou grandes mesas de buffet.",
            "cons": "Exige muita luz, pode deixar a imagem com um aspecto 'plano' e sem destaque.",
            "recommended_food": "Grandes buffets, mesas de festa, pratos em um cenário de cozinha amplo e detalhado."
        }
    }
];

export const LIGHTING_STYLES: Option[] = [
    {
        "name": "Luz de Janela Suave",
        "prompt_keywords": ["soft window light", "diffused natural light", "gentle shadows", "bright and airy", "natural look"],
        "tooltip": {
            "benefits": "A luz mais clássica e agradável para comida. Simula a luz de uma janela grande em um dia nublado.",
            "pros": "Cria sombras suaves, realça as cores naturais e dá uma sensação de frescor.",
            "cons": "Pode ser um pouco simples demais para pratos que pedem mais drama.",
            "recommended_food": "Saladas, pratos de brunch, sobremesas leves, comida saudável e fresca."
        }
    },
    {
        "name": "Luz do Sol Direta (Golden Hour)",
        "prompt_keywords": ["golden hour lighting", "direct sunlight", "long hard shadows", "warm tones", "dramatic highlights"],
        "tooltip": {
            "benefits": "Cria um look quente, dramático e com sombras longas, como no nascer ou pôr do sol.",
            "pros": "Visual cinematográfico e convidativo, realça texturas e brilhos.",
            "cons": "Pode criar áreas de contraste muito alto (muito claro/muito escuro).",
            "recommended_food": "Bebidas, churrasco, pratos de verão, pães artesanais, comida com um toque rústico."
        }
    },
    {
        "name": "Dramático (Low Key)",
        "prompt_keywords": ["dramatic lighting", "low key", "chiaroscuro", "dark and moody", "single light source", "deep shadows"],
        "tooltip": {
            "benefits": "Usa um fundo escuro e uma única fonte de luz para criar uma atmosfera misteriosa e sofisticada.",
            "pros": "Muito elegante, foca toda a atenção no prato e cria um clima de luxo.",
            "cons": "Pode esconder detalhes importantes do prato se não for bem executado.",
            "recommended_food": "Carnes nobres, vinhos e destilados, chocolate, pratos de restaurantes de alta gastronomia."
        }
    },
    {
        "name": "Luz de Estúdio Limpa",
        "prompt_keywords": ["clean studio lighting", "commercial look", "e-commerce", "bright and even light", "product photography", "white background"],
        "tooltip": {
            "benefits": "Iluminação brilhante e uniforme, sem sombras fortes, usada para fotos de produtos e cardápios.",
            "pros": "Mostra o produto de forma clara e objetiva, ideal para vendas e catálogos.",
            "cons": "Pode parecer um pouco 'clínico' e sem personalidade.",
            "recommended_food": "Qualquer prato para cardápios online, fotos de embalagens, iFood, Uber Eats."
        }
    },
    {
        "name": "Contraluz (Backlight)",
        "prompt_keywords": ["backlight", "rim light", "glowing edges", "ethereal glow", "translucent liquids"],
        "tooltip": {
            "benefits": "A luz vem por trás do prato, criando um contorno brilhante e realçando texturas e vapor.",
            "pros": "Faz bebidas brilharem e realça a fumaça/vapor de pratos quentes. Efeito mágico.",
            "cons": "A frente do prato pode ficar escura se não houver uma luz de preenchimento.",
            "recommended_food": "Sopas, chás, cafés, drinks, pratos com caldas e mel."
        }
    }
];

export const CAMERA_ANGLES: string[] = [
    'Nível dos Olhos (Eye Level)',
    'Ângulo de 45 Graus',
    'Vista de Cima (Flat Lay)',
    'Ângulo Baixo (Hero Shot)',
    'Close-up Extremo (Macro)',
];
