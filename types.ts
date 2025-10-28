// types.ts
import React from 'react';

export interface AIAction {
    type: 'APPLY_SETTING';
    payload: {
        setting: 'camera' | 'angle' | 'depthOfField' | 'lighting';
        value: string;
    };
}

export interface RecommendedSettings {
    depthOfFieldName: string;
    lightingName: string;
    angleName: string;
}

export interface TechnicalDetails {
    title: string;
    description: string;
    pro_tips: string[];
}

export interface Option {
    name:string;
    short_info: string;
    keywords: string[];
    negative_keywords?: string[];
    technical_details: TechnicalDetails;
    recommendedSettings?: RecommendedSettings;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ImagePrompt {
    sceneDescription: string;
    camera: Option;
    angle: Option;
    depthOfField: Option;
    lighting: Option;
    extraDetails: string;
    aspectRatio: string;
    numberOfImages: 1 | 2 | 4;
    negativeKeywords: string[];
}

export interface ImageObject {
    base64: string;
    mimeType: string;
}

interface BaseElement {
    id: string;
    type: 'text' | 'shape';
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
    rotation: number;
}

export interface TextElement extends BaseElement {
    type: 'text';
    content: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: '400' | '700';
    color: string;
}

export type ShapeType = 'square' | 'circle' | 'triangle' | 'arrow';

export interface ShapeElement extends BaseElement {
    type: 'shape';
    shapeType: ShapeType;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
}

export type Element = TextElement | ShapeElement;


export interface ReferenceObject {
    id: string;
    image: ImageObject;
    description: string;
    role: 'style' | 'object' | 'background' | 'person';
}

export interface ImageAdjustments {
    brightness: number;
    contrast: number;
    saturation: number;
    warmth: number;
    vignette: number;
    sharpness: number;
}

export interface Look {
    id: string;
    name: string;
    description: string;
    adjustments: ImageAdjustments;
}

export type StudioType = 'food' | 'jewelry' | 'cosmetics' | 'electronics' | 'fashion' | 'people';

export interface Slide {
    id: string;
    prompt: ImagePrompt | null; // Can be null until a studio is selected
    studioType: StudioType | null;
    originalImage: ImageObject | null;
    generatedImage: ImageObject | null;
    generatedVariations: ImageObject[] | null;
    workMode: 'creator' | 'retoucher' | 'editor' | 'isolate' | null;
    elements: Element[];
    referenceObjects: ReferenceObject[];
    presetName: string | null;
    isolationMask: ImageObject | null; // Stores the user-drawn mask for the product
    adjustments: ImageAdjustments | null;
}

export interface Preset {
    cameraName: string;
    depthOfFieldName: string;
    lightingName: string;
    angle: string;
    stylePlaceholder: string;
}

export interface StudioPreset {
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    preset: Preset;
    examples: string[];
    // Add optional keywords property to support additional prompt details
    keywords?: string[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
    action?: AIAction | null;
}