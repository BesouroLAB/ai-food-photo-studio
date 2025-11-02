// App.tsx
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toPng } from 'html-to-image';
import { ControlsPanel } from './components/ControlsPanel';
import { Artboard } from './components/Artboard';
import { LayersPanel } from './components/LayersPanel';
import { Slide, ImagePrompt, Element, ImageObject, StudioPreset, Option, AIAction, ReferenceObject, ShapeType, TextElement, ShapeElement, ImageAdjustments, StudioType } from './types';
import { generateImageFromText, generateSceneFromImage, refineOrEditGeneratedImage, inpaintImage, generateSceneWithIsolation, refineImageFocus, harmonizeIsolatedImage, filterConflictingNegativeKeywords, getHarmonizedKeywords, buildFullPrompt, makeImageMoreNatural, swapMainElementInImage, regenerateImage, subtleUpscaleImage, creativeUpscaleImage, generateStyleSuggestions, convertFinalPromptToJson } from './services/geminiService';
import { LogoIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './components/icons';
import { STUDIO_CONFIGS, STUDIO_NEGATIVE_KEYWORDS } from './constants/index';
import { SettingsHeader } from './components/SettingsHeader';
import { ImagePreviewModal } from './components/ImagePreviewModal';

// FIX: Remove conflicting global declaration for window.aistudio.
// It is assumed to be declared globally elsewhere, and this re-declaration causes a type error.

const getBaseNegativeKeywords = (prompt: Omit<ImagePrompt, 'negativeKeywords'>, studioType: StudioType | null): string[] => {
    const allNegativeKeywords: string[] = [];
    if (studioType) {
        const studioNegatives = (STUDIO_NEGATIVE_KEYWORDS[studioType] || []);
        allNegativeKeywords.push(...studioNegatives);
    }
    
    allNegativeKeywords.push(
        ...(prompt.camera.negative_keywords || []),
        ...(prompt.angle.negative_keywords || []),
        ...(prompt.depthOfField.negative_keywords || []),
        ...(prompt.lighting.negative_keywords || []),
    );

    return [...new Set(allNegativeKeywords)];
};

const defaultAdjustments: ImageAdjustments = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0,
    vignette: 0,
    sharpness: 0,
};

const createNewSlide = (): Slide => {
    return {
        id: uuidv4(),
        prompt: null,
        studioType: null,
        originalImage: null,
        generatedImage: null,
        generatedVariations: null,
        workMode: 'creator',
        elements: [],
        referenceObjects: [],
        presetName: null,
        isolationMask: null,
        adjustments: null,
    };
};

const findOptionByName = (options: Option[], name: string): Option => {
    return options.find(o => o.name === name) || options[0];
};

const applyAdjustmentsToImage = (imageObject: ImageObject, adjustments: ImageAdjustments | null): Promise<ImageObject> => {
    return new Promise((resolve, reject) => {
        if (!adjustments) {
            resolve(imageObject);
            return;
        }

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error("Could not get canvas context."));
            }

            const brightness = 100 + adjustments.brightness;
            let contrast = 100 + adjustments.contrast;
            const saturation = 100 + adjustments.saturation;
            if (adjustments.sharpness > 0) {
                contrast += adjustments.sharpness * 0.25;
            }

            const filters: string[] = [];
            if (brightness !== 100) filters.push(`brightness(${brightness / 100})`);
            if (contrast !== 100) filters.push(`contrast(${contrast / 100})`);
            if (saturation !== 100) filters.push(`saturate(${saturation / 100})`);
            if (adjustments.warmth > 0) {
                filters.push(`sepia(${adjustments.warmth / 150})`);
            }
            
            ctx.filter = filters.join(' ');
            
            ctx.drawImage(img, 0, 0);

            if (adjustments.vignette > 0) {
                ctx.filter = 'none';
                const vignetteIntensity = adjustments.vignette / 100;
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, canvas.width * 0.7,
                    canvas.width / 2, canvas.height / 2, canvas.width
                );
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, `rgba(0,0,0,${vignetteIntensity * 0.8})`);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            const mimeType = 'image/jpeg';
            const dataUrl = canvas.toDataURL(mimeType, 0.95);
            const base64 = dataUrl.split(',')[1];
            resolve({ base64, mimeType });
        };
        img.onerror = (err) => reject(new Error(`Could not load image for applying adjustments: ${err}`));
        img.src = `data:${imageObject.mimeType};base64,${imageObject.base64}`;
    });
};

const getSceneDescriptionFromPreset = (presetName: string, studioType: StudioType | null): string => {
    if (!studioType) return 'A product on a clean background.';
    const studioConfig = STUDIO_CONFIGS[studioType];
    if (!studioConfig) return 'A product on a clean background.';

    const preset = studioConfig.presets.find((p: StudioPreset) => p.name === presetName);
    
    if (preset && Array.isArray(preset.examples) && preset.examples.length > 0) {
        const randomIndex = Math.floor(Math.random() * preset.examples.length);
        return preset.examples[randomIndex];
    }
    
    return 'A product on a clean background.';
};


export const App: React.FC = () => {
    const [slides, setSlides] = useState<Slide[]>([createNewSlide()]);
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(slides[0].id);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
    const [isLayersCollapsed, setIsLayersCollapsed] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewSourceType, setPreviewSourceType] = useState<'original' | 'generated'>('generated');
    const [isMasking, setIsMasking] = useState(false);
    const [maskingSourceType, setMaskingSourceType] = useState<'original' | 'generated'>('generated');
    const [isIsolatingProduct, setIsIsolatingProduct] = useState(false);
    const [scrollCommand, setScrollCommand] = useState<{ targetId: null | string; key: number }>({ targetId: null, key: 0 });
    const [pendingSuggestion, setPendingSuggestion] = useState<AIAction | null>(null);
    const [isGeneratingStyles, setIsGeneratingStyles] = useState(false);
    const [styleSuggestions, setStyleSuggestions] = useState<string[]>([]);
    const [isGeneratingJson, setIsGeneratingJson] = useState(false);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [previewElementStyle, setPreviewElementStyle] = useState<Partial<Element> | null>(null);
    const [finalPromptForIA, setFinalPromptForIA] = useState("Ajuste as configurações para ver o prompt final aqui.");
    const [isAutoUpdatingPrompt, setIsAutoUpdatingPrompt] = useState(false);
    const debounceTimeoutRef = useRef<number | null>(null);
    const [isApiKeyReady, setIsApiKeyReady] = useState(false);
    const [isCheckingApiKey, setIsCheckingApiKey] = useState(true);

    const checkApiKey = useCallback(async () => {
        setIsCheckingApiKey(true);
        try {
            // This is a more robust check. It ensures `window.aistudio` is a non-null object
            // before attempting to access its properties. This prevents runtime errors in
            // development/preview environments where `window.aistudio` might be missing, null, or not an object.
            if (typeof window.aistudio === 'object' && window.aistudio !== null && typeof window.aistudio.hasSelectedApiKey === 'function') {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setIsApiKeyReady(hasKey);
            } else {
                // In dev/preview environments where aistudio or its methods are not available,
                // we assume the key is ready to allow the app to load and facilitate development.
                console.warn("window.aistudio.hasSelectedApiKey not found. Assuming API key is ready for development.");
                setIsApiKeyReady(true);
            }
        } catch (e) {
            console.error("Error checking for API key:", e);
            // As a fallback, especially for dev environments, we'll allow the app to load.
            // A real API key error will be caught later when an actual API call is made.
            setIsApiKeyReady(true);
        } finally {
            setIsCheckingApiKey(false);
        }
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);

    const handleSelectApiKey = async () => {
        try {
             if (window.aistudio) {
                await window.aistudio.openSelectKey();
             } else {
                console.warn("window.aistudio not found. Cannot open API key selection.");
                // In dev, we can just pretend it worked.
             }
            setIsApiKeyReady(true);
        } catch (e) {
            console.error("Could not open API key selection:", e);
            setError("Não foi possível abrir a seleção de chave de API.");
        }
    };

    const withApiKeyErrorHandling = useCallback(async <T,>(apiCall: () => Promise<T>): Promise<T | undefined> => {
        try {
            return await apiCall();
        } catch (err: any) {
            if (typeof err.message === 'string' && err.message.includes("Requested entity was not found.")) {
                setError("Sua chave de API parece inválida ou foi revogada. Por favor, selecione uma nova chave.");
                setIsApiKeyReady(false);
                setIsCheckingApiKey(false);
                return undefined;
            }
            throw err;
        }
    }, []);

    const currentSlide = useMemo(() => slides.find(s => s.id === selectedSlideId), [slides, selectedSlideId]);
    const harmonizedPositiveKeywords = useMemo(() => getHarmonizedKeywords(currentSlide?.prompt || null), [currentSlide?.prompt]);

    const updateSlide = useCallback((slideId: string, updates: Partial<Slide>) => {
        setSlides(prevSlides => prevSlides.map(s => s.id === slideId ? { ...s, ...updates } : s));
    }, []);
    
    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (currentSlide?.prompt && currentSlide.studioType) {
            debounceTimeoutRef.current = window.setTimeout(async () => {
                setIsAutoUpdatingPrompt(true);
                try {
                    const baseNegativeKeywords = getBaseNegativeKeywords(currentSlide.prompt!, currentSlide.studioType!);
                    
                    const finalNegativeKeywords = await withApiKeyErrorHandling(() => filterConflictingNegativeKeywords(currentSlide.prompt!.sceneDescription, baseNegativeKeywords));
                    if (finalNegativeKeywords === undefined) return;
                    
                    const updatedPrompt = { ...currentSlide.prompt!, negativeKeywords: finalNegativeKeywords };
                    
                    setSlides(prevSlides => prevSlides.map(s => 
                        s.id === currentSlide.id ? { ...s, prompt: updatedPrompt } : s
                    ));
                    
                    const newFinalPrompt = await withApiKeyErrorHandling(() => buildFullPrompt(updatedPrompt, currentSlide.studioType!));
                    if (newFinalPrompt === undefined) return;
                    
                    setFinalPromptForIA(newFinalPrompt);

                } catch (err: any) {
                    console.error("Auto prompt update failed:", err.message);
                    setFinalPromptForIA("Erro ao atualizar o prompt automaticamente.");
                } finally {
                    setIsAutoUpdatingPrompt(false);
                }
            }, 500);
        } else {
             setFinalPromptForIA("Ajuste as configurações para ver o prompt final aqui.");
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [
        currentSlide?.prompt?.sceneDescription,
        currentSlide?.prompt?.camera,
        currentSlide?.prompt?.angle,
        currentSlide?.prompt?.depthOfField,
        currentSlide?.prompt?.lighting,
        currentSlide?.prompt?.extraDetails,
        currentSlide?.prompt?.aspectRatio,
        currentSlide?.prompt?.numberOfImages,
        currentSlide?.studioType,
        withApiKeyErrorHandling
    ]);


    const handleDownloadImage = useCallback(async () => {
        const elementToCapture = document.getElementById('artboard-content-wrapper');
        if (!elementToCapture) {
            setError("Não foi possível encontrar a área da imagem para baixar.");
            return;
        }
    
        const baseImage = currentSlide?.generatedImage || currentSlide?.originalImage;
        if (!baseImage) {
            setError("Não há imagem no slide atual para baixar.");
            return;
        }
    
        setIsLoading(true);
        setLoadingMessage("Preparando download em alta resolução...");
        setError(null);
    
        try {
            const img = new Image();
            const loadPromise = new Promise(resolve => { img.onload = resolve; });
            img.src = `data:${baseImage.mimeType};base64,${baseImage.base64}`;
            await loadPromise;
            
            const nativeWidth = img.naturalWidth;
            const nativeHeight = img.naturalHeight;
    
            const dataUrl = await toPng(elementToCapture, {
                quality: 1.0,
                width: nativeWidth,
                height: nativeHeight,
            });
            
            const link = document.createElement('a');
            const subject = currentSlide?.prompt?.sceneDescription.substring(0, 20) || 'estudio-sabor';
            const safeSubject = subject.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `${safeSubject}_${timestamp}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
        } catch (err: any) {
            setError(`Falha ao baixar a imagem: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide]);

    const handleSelectStudio = useCallback((studioType: StudioType) => {
        if (!selectedSlideId) return;

        const config = STUDIO_CONFIGS[studioType];
        if (!config) return;

        const promptWithoutNegatives: Omit<ImagePrompt, 'negativeKeywords'> = {
            sceneDescription: 'A product on a clean background',
            camera: config.cameras[0],
            angle: config.angles[0],
            depthOfField: config.depthsOfField[0],
            lighting: config.lightingStyles[0],
            extraDetails: '',
            aspectRatio: '1:1',
            numberOfImages: 1,
        };
        
        const negativeKeywords = getBaseNegativeKeywords(promptWithoutNegatives, studioType);

        const finalPrompt: ImagePrompt = {
            ...promptWithoutNegatives,
            negativeKeywords,
        };
        
        updateSlide(selectedSlideId, { studioType, prompt: finalPrompt });
    }, [selectedSlideId, updateSlide]);

    const handleResetStudio = useCallback(() => {
        if (currentSlide) {
            updateSlide(currentSlide.id, {
                prompt: null,
                studioType: null,
                originalImage: null,
                generatedImage: null,
                generatedVariations: null,
                presetName: null,
                isolationMask: null,
                adjustments: null,
            });
             setFinalPromptForIA("Ajuste as configurações para ver o prompt final aqui.");
        }
    }, [currentSlide, updateSlide]);

    const handlePromptUpdate = useCallback((field: keyof ImagePrompt, value: any) => {
        if (!currentSlide || !currentSlide.prompt) return;

        const newPrompt: ImagePrompt = { ...currentSlide.prompt, [field]: value };
        
        const updates: Partial<Slide> = { prompt: newPrompt };
        
        const presetControlledFields: (keyof ImagePrompt)[] = ['camera', 'angle', 'depthOfField', 'lighting', 'sceneDescription', 'extraDetails'];
        if (presetControlledFields.includes(field) && currentSlide.presetName) {
            updates.presetName = null;
        }
        
        updateSlide(currentSlide.id, updates);

        const scrollTargets: Partial<Record<keyof ImagePrompt, string>> = {
            camera: 'camera-control-anchor',
            angle: 'angle-control-anchor',
            depthOfField: 'focus-control-anchor',
            lighting: 'lighting-control-anchor',
        };

        const targetId = scrollTargets[field];
        if (targetId) {
            setScrollCommand({ targetId, key: Date.now() });
        }
    }, [currentSlide, updateSlide]);

    const handleGenerate = useCallback(async (settingsOverride?: Partial<ImagePrompt>) => {
        if (!currentSlide || !currentSlide.prompt || !currentSlide.studioType) {
            setError("Selecione um preset ou preencha o estilo para começar.");
            return;
        }

        if (settingsOverride && Object.keys(settingsOverride).length > 0) {
            if (!currentSlide.generatedImage) {
                setError("Não há imagem gerada para regenerar. Por favor, gere uma imagem primeiro.");
                return;
            }

            setIsLoading(true);
            setLoadingMessage('Analisando novas configurações...');
            setError(null);
            setSelectedElementId(null);

            try {
                const tempPrompt = { ...currentSlide.prompt, ...settingsOverride };
                const newNegativeKeywords = getBaseNegativeKeywords(tempPrompt, currentSlide.studioType);
                const promptToUse = { ...tempPrompt, negativeKeywords: newNegativeKeywords };
                
                setLoadingMessage('Regerando com novos ajustes...');
                
                const newImage = await withApiKeyErrorHandling(() => regenerateImage(currentSlide.generatedImage!, settingsOverride));
                if (newImage === undefined) return;

                const newSlide = {
                    ...createNewSlide(),
                    prompt: promptToUse,
                    studioType: currentSlide.studioType,
                    originalImage: currentSlide.generatedImage,
                    generatedImage: newImage,
                    presetName: null,
                };
                const index = slides.findIndex(s => s.id === currentSlide.id);
                setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
                setSelectedSlideId(newSlide.id);

            } catch (err: any) {
                setError(err.message || 'Ocorreu um erro desconhecido durante a regeneração.');
            } finally {
                setIsLoading(false);
            }
            return;
        }

        if (finalPromptForIA.startsWith("Ajuste as configurações")) {
             setError("Por favor, preencha as configurações. O prompt está sendo atualizado automaticamente.");
             return;
        }

        setIsLoading(true);
        setError(null);
        setSelectedElementId(null);

        const promptToUse = currentSlide.prompt;
        const finalPrompt = finalPromptForIA;

        try {
            if (currentSlide.workMode === 'creator') {
                setLoadingMessage('Criando sua cena...');
                const images = await withApiKeyErrorHandling(() => generateImageFromText(finalPrompt, promptToUse.numberOfImages, promptToUse.aspectRatio, currentSlide.referenceObjects));
                if (images === undefined) return;

                if (images.length === 1) {
                    updateSlide(currentSlide.id, { generatedImage: images[0], generatedVariations: null, prompt: promptToUse });
                } else {
                    updateSlide(currentSlide.id, { generatedImage: null, generatedVariations: images, prompt: promptToUse });
                }
            } else if (currentSlide.workMode === 'retoucher' || currentSlide.workMode === 'editor') {
                setLoadingMessage('Recriando seu cenário...');
                const image = await withApiKeyErrorHandling(() => generateSceneFromImage({ ...currentSlide, prompt: promptToUse }, finalPrompt));
                if (image === undefined) return;
                updateSlide(currentSlide.id, { generatedImage: image, generatedVariations: null, prompt: promptToUse });
            } else if (currentSlide.workMode === 'isolate') {
                setLoadingMessage('Isolando o produto e gerando cenário...');
                const image = await withApiKeyErrorHandling(() => generateSceneWithIsolation({ ...currentSlide, prompt: promptToUse }, finalPrompt));
                if (image === undefined) return;
                updateSlide(currentSlide.id, { generatedImage: image, generatedVariations: null, prompt: promptToUse });
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro desconhecido.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, updateSlide, finalPromptForIA, withApiKeyErrorHandling]);


    const handleSelectVariation = useCallback((image: ImageObject) => {
        if (currentSlide) {
            updateSlide(currentSlide.id, { generatedImage: image, generatedVariations: null });
        }
    }, [currentSlide, updateSlide]);
    
    const handleAddSlide = () => {
        const newSlide = createNewSlide();
        setSlides(prev => [...prev, newSlide]);
        setSelectedSlideId(newSlide.id);
    };

    const handleCloneSlide = (slideId: string) => {
        const slideToClone = slides.find(s => s.id === slideId);
        if (slideToClone) {
            const newSlide = { ...slideToClone, id: uuidv4() };
            const index = slides.findIndex(s => s.id === slideId);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        }
    };
    
    const handleDeleteSlide = (slideId: string) => {
        if (slides.length <= 1) return;
        const index = slides.findIndex(s => s.id === slideId);
        const newSlides = slides.filter(s => s.id !== slideId);
        setSlides(newSlides);
        if (selectedSlideId === slideId) {
            setSelectedSlideId(newSlides[Math.max(0, index - 1)].id);
        }
    };

    const handleMoveSlide = useCallback((dragIndex: number, hoverIndex: number) => {
        setSlides(prevSlides => {
            const newSlides = [...prevSlides];
            const [movedSlide] = newSlides.splice(dragIndex, 1);
            newSlides.splice(hoverIndex, 0, movedSlide);
            return newSlides;
        });
    }, []);

    const handleUploadImage = useCallback((image: ImageObject) => {
        if (currentSlide) {
            const workModeUpdate = currentSlide.workMode === 'creator' ? { workMode: 'retoucher' as const } : {};
            updateSlide(currentSlide.id, { originalImage: image, ...workModeUpdate });
        }
    }, [currentSlide, updateSlide]);

    const handleSetWorkMode = useCallback((workMode: 'creator' | 'retoucher' | 'editor' | 'isolate') => {
        if (currentSlide) {
            if (workMode === 'isolate') {
                setIsIsolatingProduct(true);
            } else {
                updateSlide(currentSlide.id, { workMode });
            }
        }
    }, [currentSlide, updateSlide]);

    const handleSelectPreset = useCallback((preset: StudioPreset) => {
        if (!currentSlide || !currentSlide.studioType) return;

        const studioConfig = STUDIO_CONFIGS[currentSlide.studioType];

        const newPrompt: ImagePrompt = {
            sceneDescription: getSceneDescriptionFromPreset(preset.name, currentSlide.studioType),
            camera: findOptionByName(studioConfig.cameras, preset.preset.cameraName),
            angle: findOptionByName(studioConfig.angles, preset.preset.angle),
            depthOfField: findOptionByName(studioConfig.depthsOfField, preset.preset.depthOfFieldName),
            lighting: findOptionByName(studioConfig.lightingStyles, preset.preset.lightingName),
            extraDetails: preset.keywords ? preset.keywords.join(', ') : '',
            aspectRatio: currentSlide.prompt?.aspectRatio || '1:1',
            numberOfImages: currentSlide.prompt?.numberOfImages || 1,
            negativeKeywords: [],
        };

        newPrompt.negativeKeywords = getBaseNegativeKeywords(newPrompt, currentSlide.studioType);
        
        setStyleSuggestions([]);
        updateSlide(currentSlide.id, { prompt: newPrompt, presetName: preset.name });
        
    }, [currentSlide, updateSlide]);

    const handleApplyIsolationMask = useCallback(async (mask: ImageObject) => {
        if (currentSlide) {
            updateSlide(currentSlide.id, { workMode: 'isolate', isolationMask: mask });
            setIsIsolatingProduct(false);
            await handleGenerate();
        }
    }, [currentSlide, updateSlide, handleGenerate]);

    const handleRefineOrEdit = useCallback(async (mode: 'refine' | 'edit', prompt: string, referenceObjects: ReferenceObject[]) => {
        const sourceImage = previewSourceType === 'original' ? currentSlide?.originalImage : currentSlide?.generatedImage;
    
        if (!currentSlide || !sourceImage || !currentSlide.prompt) return;
    
        setIsLoading(true);
        setLoadingMessage(mode === 'refine' ? 'Refinando sua imagem...' : 'Editando sua cena...');
        setError(null);
        setIsPreviewModalOpen(false);
    
        try {
            const newImage = await withApiKeyErrorHandling(() => refineOrEditGeneratedImage(sourceImage, prompt, mode, currentSlide.prompt!.aspectRatio, referenceObjects));
            if (newImage === undefined) return;

            const newSlide = {
                ...createNewSlide(),
                prompt: { ...currentSlide.prompt, sceneDescription: prompt },
                studioType: currentSlide.studioType,
                originalImage: sourceImage,
                generatedImage: newImage,
                referenceObjects: referenceObjects,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || `Falha ao ${mode === 'refine' ? 'refinar' : 'editar'} a imagem.`);
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, previewSourceType, withApiKeyErrorHandling]);

    const handleSwapMainElement = useCallback(async (newElementImage: ImageObject) => {
        const contextImage = previewSourceType === 'original' 
            ? currentSlide?.originalImage 
            : currentSlide?.generatedImage;

        if (!currentSlide || !contextImage || !currentSlide.prompt || !currentSlide.studioType) return;
        
        const isPersonSwap = ['fashion', 'people'].includes(currentSlide.studioType);

        setIsLoading(true);
        setLoadingMessage(isPersonSwap ? 'Trocando modelo e mantendo o contexto...' : 'Trocando o objeto principal...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => swapMainElementInImage(contextImage, newElementImage, currentSlide.studioType!));
            if (newImage === undefined) return;

            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: newElementImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || `Falha ao tentar trocar o elemento principal.`);
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, previewSourceType, withApiKeyErrorHandling]);

    const handleApplyInpainting = useCallback(async (mask: ImageObject, prompt: string) => {
        if (!currentSlide || !currentSlide.prompt) return;
        const sourceImage = maskingSourceType === 'original' ? currentSlide.originalImage : currentSlide.generatedImage;
        if (!sourceImage) return;

        setIsMasking(false);
        setIsLoading(true);
        setLoadingMessage('Aplicando edições...');
        setError(null);
        
        try {
            const newImage = await withApiKeyErrorHandling(() => inpaintImage(sourceImage, mask, prompt, currentSlide.prompt!.aspectRatio));
            if (newImage === undefined) return;
            
            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: sourceImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);

        } catch (err: any) {
            setError(err.message || 'Falha ao aplicar o inpainting.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, maskingSourceType, slides, withApiKeyErrorHandling]);
    
    const handleApplyAdjustments = useCallback(async (adjustments: ImageAdjustments) => {
        if (!currentSlide || !currentSlide.generatedImage) return;

        setIsLoading(true);
        setLoadingMessage("Aplicando ajustes...");
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const adjustedImage = await applyAdjustmentsToImage(currentSlide.generatedImage, adjustments);
            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: currentSlide.generatedImage,
                generatedImage: adjustedImage,
                adjustments: null,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao aplicar ajustes na imagem.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides]);

    const handleRefineFocus = useCallback(async (focusLevel: string) => {
        if (!currentSlide || !currentSlide.generatedImage) return;

        setIsLoading(true);
        setLoadingMessage('Ajustando o foco...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => refineImageFocus(currentSlide.generatedImage!, focusLevel));
            if (newImage === undefined) return;

            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: currentSlide.generatedImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao refinar o foco.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, withApiKeyErrorHandling]);
    
    const handleHarmonizeImage = useCallback(async () => {
        if (!currentSlide || !currentSlide.generatedImage) return;
        
        setIsLoading(true);
        setLoadingMessage('Harmonizando a cena...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => harmonizeIsolatedImage(currentSlide.generatedImage!));
            if (newImage === undefined) return;

             const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: currentSlide.generatedImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao harmonizar a imagem.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, withApiKeyErrorHandling]);

    const handleMakeMoreNatural = useCallback(async (withImperfections: boolean) => {
        if (!currentSlide || !currentSlide.generatedImage) return;
        
        setIsLoading(true);
        setLoadingMessage('Tornando a imagem mais natural...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => makeImageMoreNatural(currentSlide.generatedImage!, withImperfections));
            if (newImage === undefined) return;

             const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: currentSlide.generatedImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao tentar tornar a imagem mais natural.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, withApiKeyErrorHandling]);

    const handleSubtleUpscale = useCallback(async () => {
        const sourceImage = previewSourceType === 'original' ? currentSlide?.originalImage : currentSlide?.generatedImage;
        if (!currentSlide || !sourceImage) return;

        setIsLoading(true);
        setLoadingMessage('Aplicando upscale sutil...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => subtleUpscaleImage(sourceImage));
            if (newImage === undefined) return;

            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: sourceImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao aplicar upscale sutil.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, previewSourceType, withApiKeyErrorHandling]);

    const handleCreativeUpscale = useCallback(async () => {
        const sourceImage = previewSourceType === 'original' ? currentSlide?.originalImage : currentSlide?.generatedImage;
        if (!currentSlide || !sourceImage) return;

        setIsLoading(true);
        setLoadingMessage('Aplicando upscale criativo...');
        setError(null);
        setIsPreviewModalOpen(false);

        try {
            const newImage = await withApiKeyErrorHandling(() => creativeUpscaleImage(sourceImage));
            if (newImage === undefined) return;

            const newSlide = {
                ...createNewSlide(),
                prompt: currentSlide.prompt,
                studioType: currentSlide.studioType,
                originalImage: sourceImage,
                generatedImage: newImage,
                presetName: null,
            };
            const index = slides.findIndex(s => s.id === currentSlide.id);
            setSlides(prev => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)]);
            setSelectedSlideId(newSlide.id);
        } catch (err: any) {
            setError(err.message || 'Falha ao aplicar upscale criativo.');
        } finally {
            setIsLoading(false);
        }
    }, [currentSlide, slides, previewSourceType, withApiKeyErrorHandling]);

    const handleAddReferenceObject = (image: ImageObject) => {
        if (!currentSlide) return;
        const newRef: ReferenceObject = {
            id: uuidv4(),
            image,
            description: '',
            role: 'object',
        };
        const updatedRefs = [...(currentSlide.referenceObjects || []), newRef];
        updateSlide(currentSlide.id, { referenceObjects: updatedRefs });
    };

    const handleUpdateReferenceObject = (id: string, updates: Partial<ReferenceObject>) => {
        if (!currentSlide || !currentSlide.referenceObjects) return;
        const updatedRefs = currentSlide.referenceObjects.map(ref => ref.id === id ? { ...ref, ...updates } : ref);
        updateSlide(currentSlide.id, { referenceObjects: updatedRefs });
    };

    const handleDeleteReferenceObject = (id: string) => {
        if (!currentSlide || !currentSlide.referenceObjects) return;
        const updatedRefs = currentSlide.referenceObjects.filter(ref => ref.id !== id);
        updateSlide(currentSlide.id, { referenceObjects: updatedRefs });
    };

    const handleApplySuggestion = useCallback((action: AIAction) => {
        if (!currentSlide?.prompt || !currentSlide?.studioType) return;

        const { setting, value } = action.payload;
        const studioConfig = STUDIO_CONFIGS[currentSlide.studioType];
        
        let options: Option[] = [];
        switch(setting) {
            case 'camera': options = studioConfig.cameras; break;
            case 'angle': options = studioConfig.angles; break;
            case 'depthOfField': options = studioConfig.depthsOfField; break;
            case 'lighting': options = studioConfig.lightingStyles; break;
        }

        const selectedOption = options.find(opt => opt.name === value);
        if (selectedOption) {
            handlePromptUpdate(setting, selectedOption);
            setScrollCommand({ targetId: `${setting}-control-anchor`, key: Date.now() });
        }
        setPendingSuggestion(null);
    }, [currentSlide, handlePromptUpdate]);

    const handleGenerateStyles = useCallback(async () => {
        if (!currentSlide?.studioType || !currentSlide.presetName) return;
        
        setIsGeneratingStyles(true);
        setStyleSuggestions([]);
        setError(null);
        try {
            const suggestions = await withApiKeyErrorHandling(() => generateStyleSuggestions(currentSlide.studioType!, currentSlide.presetName!));
            if (suggestions === undefined) return;
            setStyleSuggestions(suggestions);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingStyles(false);
        }
    }, [currentSlide, withApiKeyErrorHandling]);

    const handleGenerateJson = useCallback(() => {
        if (!currentSlide || finalPromptForIA.startsWith("Ajuste as configurações") || finalPromptForIA.trim().startsWith('{')) {
            return;
        }
        
        setIsGeneratingJson(true);
        setError(null);
        try {
            const jsonPayloadString = convertFinalPromptToJson(currentSlide, finalPromptForIA);
            setFinalPromptForIA(jsonPayloadString);
        } catch (err: any) {
            setError(err.message || "Falha ao converter prompt para JSON.");
        } finally {
            setIsGeneratingJson(false);
        }
    }, [currentSlide, finalPromptForIA]);

    const handleAddElement = (type: 'text' | 'shape', shapeType: ShapeType = 'square') => {
        if (!currentSlide) return;
    
        const newElement: Element = type === 'text'
            ? {
                id: uuidv4(), type: 'text', content: 'Edite este texto', fontSize: 48, fontFamily: 'Inter',
                fontWeight: '400', color: '#FFFFFF', x: 50, y: 50, width: 300, height: 60, opacity: 1, rotation: 0
            }
            : {
                id: uuidv4(), type: 'shape', shapeType, backgroundColor: '#FFFFFF', borderColor: '#000000',
                borderWidth: 0, x: 50, y: 50, width: 100, height: 100, opacity: 1, rotation: 0
            };
            
        const updatedElements = [...currentSlide.elements, newElement];
        updateSlide(currentSlide.id, { elements: updatedElements });
        setSelectedElementId(newElement.id);
    };

    const handleUpdateElement = (elementId: string, updates: Partial<Element>) => {
        if (!currentSlide) return;
        const updatedElements = currentSlide.elements.map(el => el.id === elementId ? { ...el, ...updates } : el);
        updateSlide(currentSlide.id, { elements: updatedElements as Element[] });
    };

    const handleDeleteElement = (elementId: string) => {
        if (!currentSlide) return;
        if (selectedElementId === elementId) setSelectedElementId(null);
        const updatedElements = currentSlide.elements.filter(el => el.id !== elementId);
        updateSlide(currentSlide.id, { elements: updatedElements });
    };

    const studioConfig = currentSlide?.studioType ? STUDIO_CONFIGS[currentSlide.studioType] : null;

    const visuallySelectedPresetName = useMemo(() => {
        if (!currentSlide || !currentSlide.prompt || !currentSlide.studioType) {
            return null;
        }

        if (currentSlide.presetName) {
            return currentSlide.presetName;
        }

        const config = STUDIO_CONFIGS[currentSlide.studioType];
        if (!config) {
            return null;
        }

        const currentSettings = {
            cameraName: currentSlide.prompt.camera.name,
            angle: currentSlide.prompt.angle.name,
            lightingName: currentSlide.prompt.lighting.name,
            depthOfFieldName: currentSlide.prompt.depthOfField.name,
        };

        const matchingPreset = config.presets.find(p => 
            p.preset.cameraName === currentSettings.cameraName &&
            p.preset.angle === currentSettings.angle &&
            p.preset.lightingName === currentSettings.lightingName &&
            p.preset.depthOfFieldName === currentSettings.depthOfFieldName
        );

        return matchingPreset ? matchingPreset.name : null;
    }, [currentSlide]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-800 h-full text-white flex flex-col font-sans">
                <header className="flex items-center justify-between p-3 bg-gray-900/50 border-b border-gray-700/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <LogoIcon className="w-8 h-8 text-yellow-400" />
                        <h1 className="text-xl font-bold tracking-tight">Estúdio & Sabor AI</h1>
                    </div>
                    {currentSlide?.prompt && (
                        <div className="flex-grow mx-8">
                           <SettingsHeader 
                                prompt={currentSlide.prompt} 
                                onSectionClick={(sectionId) => setScrollCommand({ targetId: sectionId, key: Date.now() })}
                            />
                        </div>
                    )}
                </header>
    
                <main className="flex-grow flex overflow-hidden">
                    <aside className={`flex-shrink-0 bg-gray-900/50 transition-all duration-300 ${isControlsCollapsed ? 'w-10' : 'w-[28rem]'}`}>
                        <div className="h-full flex flex-col relative">
                            <button onClick={() => setIsControlsCollapsed(!isControlsCollapsed)} className="absolute top-1/2 -right-3 -translate-y-1/2 bg-gray-700 hover:bg-yellow-500 text-white hover:text-gray-900 w-6 h-12 rounded-r-lg z-10 flex items-center justify-center">
                                {isControlsCollapsed ? <ChevronDoubleRightIcon className="w-4 h-4" /> : <ChevronDoubleLeftIcon className="w-4 h-4" />}
                            </button>
                            <div className={`p-4 h-full transition-opacity ${isControlsCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {currentSlide && studioConfig && (
                                    <ControlsPanel
                                        slide={currentSlide}
                                        onPromptUpdate={handlePromptUpdate}
                                        onGenerate={() => handleGenerate()}
                                        isGenerating={isLoading}
                                        onSetWorkMode={handleSetWorkMode}
                                        onSelectPreset={handleSelectPreset}
                                        selectedPresetName={visuallySelectedPresetName}
                                        scrollCommand={scrollCommand}
                                        onAddReferenceObject={handleAddReferenceObject}
                                        onUpdateReferenceObject={handleUpdateReferenceObject}
                                        onDeleteReferenceObject={handleDeleteReferenceObject}
                                        pendingSuggestion={pendingSuggestion}
                                        onConfirmSuggestion={() => pendingSuggestion && handleApplySuggestion(pendingSuggestion)}
                                        onCancelSuggestion={() => setPendingSuggestion(null)}
                                        onGenerateStyles={handleGenerateStyles}
                                        isGeneratingStyles={isGeneratingStyles}
                                        styleSuggestions={styleSuggestions}
                                        onGenerateJson={handleGenerateJson}
                                        isGeneratingJson={isGeneratingJson}
                                        studioConfig={studioConfig}
                                        onResetStudio={handleResetStudio}
                                        harmonizedPositiveKeywords={harmonizedPositiveKeywords}
                                        finalPromptForIA={finalPromptForIA}
                                        onFinalPromptChange={setFinalPromptForIA}
                                        isAutoUpdatingPrompt={isAutoUpdatingPrompt}
                                    />
                                )}
                            </div>
                        </div>
                    </aside>
    
                    <div className="flex-grow p-4 overflow-hidden">
                        <Artboard
                            slide={currentSlide}
                            slides={slides}
                            selectedSlideId={selectedSlideId}
                            isLoading={isLoading}
                            loadingMessage={loadingMessage}
                            error={error}
                            onUploadImage={handleUploadImage}
                            onSelectVariation={handleSelectVariation}
                            onPreviewImage={(slide, source) => { setPreviewSourceType(source); setIsPreviewModalOpen(true); }}
                            onAddSlide={handleAddSlide}
                            onCloneSlide={handleCloneSlide}
                            onDeleteSlide={handleDeleteSlide}
                            onSelectSlide={setSelectedSlideId}
                            onMoveSlide={handleMoveSlide}
                            isMasking={isMasking}
                            maskingSourceType={maskingSourceType}
                            onApplyInpainting={handleApplyInpainting}
                            onCancelInpainting={() => setIsMasking(false)}
                            isIsolatingProduct={isIsolatingProduct}
                            onApplyIsolationMask={handleApplyIsolationMask}
                            onCancelIsolation={() => setIsIsolatingProduct(false)}
                            onErrorDismiss={() => setError(null)}
                            onUpdateElement={handleUpdateElement}
                            selectedElementId={selectedElementId}
                            onSelectElement={setSelectedElementId}
                            previewElementStyle={previewElementStyle}
                            onSelectStudio={handleSelectStudio}
                            isApiKeyReady={isApiKeyReady}
                            isCheckingApiKey={isCheckingApiKey}
                            onSelectApiKey={handleSelectApiKey}
                        />
                    </div>
    
                    <aside className={`flex-shrink-0 bg-gray-900/50 transition-all duration-300 ${isLayersCollapsed ? 'w-10' : 'w-80'}`}>
                         <div className="h-full flex flex-col relative">
                            <button onClick={() => setIsLayersCollapsed(!isLayersCollapsed)} className="absolute top-1/2 -left-3 -translate-y-1/2 bg-gray-700 hover:bg-yellow-500 text-white hover:text-gray-900 w-6 h-12 rounded-l-lg z-10 flex items-center justify-center">
                                {isLayersCollapsed ? <ChevronDoubleLeftIcon className="w-4 h-4" /> : <ChevronDoubleRightIcon className="w-4 h-4" />}
                            </button>
                            <div className={`p-4 h-full transition-opacity ${isLayersCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {studioConfig && <LayersPanel 
                                    selectedSlide={currentSlide}
                                    studioConfig={studioConfig}
                                    studioType={currentSlide?.studioType ?? null}
                                    onDownload={handleDownloadImage}
                                    isActionDisabled={isLoading}
                                    elements={currentSlide?.elements || []}
                                    onAddElement={handleAddElement}
                                    onUpdateElement={handleUpdateElement}
                                    onDeleteElement={handleDeleteElement}
                                    selectedElementId={selectedElementId}
                                    onSelectElement={setSelectedElementId}
                                    onApplySuggestion={setPendingSuggestion}
                                    onPreviewElementUpdate={setPreviewElementStyle}
                                    onApplyAdjustments={(slideId, adjustments) => handleApplyAdjustments(adjustments)}
                                    onAdjustmentsUpdate={(slideId, updates) => {
                                        if (currentSlide) {
                                            updateSlide(currentSlide.id, { adjustments: { ...(currentSlide.adjustments || defaultAdjustments), ...updates } });
                                        }
                                    }}
                                    onRegenerate={(settingsOverride) => handleGenerate(settingsOverride)}
                                />}
                            </div>
                        </div>
                    </aside>
                </main>
    
                {isPreviewModalOpen && currentSlide && (
                    <ImagePreviewModal
                        slide={currentSlide}
                        slides={slides}
                        selectedSlideId={selectedSlideId}
                        onSelectSlide={setSelectedSlideId}
                        onAddSlide={handleAddSlide}
                        onCloneSlide={handleCloneSlide}
                        onDeleteSlide={handleDeleteSlide}
                        onMoveSlide={handleMoveSlide}
                        onClose={() => setIsPreviewModalOpen(false)}
                        isActionDisabled={isLoading}
                        sourceImageType={previewSourceType}
                        onRefineOrEdit={handleRefineOrEdit}
                        onSwapMainElement={handleSwapMainElement}
                        onEnterInpaintingMode={() => {
                            setIsPreviewModalOpen(false);
                            setMaskingSourceType(previewSourceType);
                            setIsMasking(true);
                        }}
                        onApplyAdjustments={handleApplyAdjustments}
                        onAdjustmentsUpdate={(updates) => {
                             if (currentSlide) {
                                updateSlide(currentSlide.id, { adjustments: { ...(currentSlide.adjustments || defaultAdjustments), ...updates } });
                            }
                        }}
                        onRefineFocus={handleRefineFocus}
                        onHarmonizeImage={handleHarmonizeImage}
                        onMakeMoreNatural={handleMakeMoreNatural}
                        onSubtleUpscale={handleSubtleUpscale}
                        onCreativeUpscale={handleCreativeUpscale}
                    />
                )}
            </div>
        </DndProvider>
    );
};