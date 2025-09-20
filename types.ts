export interface TooltipInfo {
    benefits: string;
    pros: string;
    cons: string;
    recommended_food: string;
}

export interface Option {
    name: string;
    prompt_keywords: string[];
    tooltip: TooltipInfo;
}

export interface ImagePrompt {
    subject: string;
    style: string;
    camera: Option;
    angle: string;
    depthOfField: Option;
    lighting: Option;
    extraDetails: string;
}

export interface ImageObject {
    base64: string;
    mimeType: string;
}

export interface Element {
    id: string;
    type: 'text';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    fontFamily: string;
    color: string;
}

export interface Slide {
    id: string;
    prompt: ImagePrompt;
    originalImage: ImageObject | null;
    generatedImage: ImageObject | null;
    workMode: 'retoucher' | 'editor' | null;
    elements: Element[];
}
