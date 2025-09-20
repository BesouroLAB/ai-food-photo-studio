import React, { useState, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ControlsPanel } from './components/ControlsPanel';
import { Artboard } from './components/Artboard';
import { LayersPanel } from './components/LayersPanel';
import { Slide, ImagePrompt, Element, ImageObject } from './types';
import { generateImageFromText, generateSceneFromImage, refineOrEditGeneratedImage } from './services/geminiService';
import { LogoIcon } from './components/icons';
import { CAMERAS, DEPTHS_OF_FIELD, LIGHTING_STYLES } from './constants';

const createNewSlide = (): Slide => {
    return {
        id: uuidv4(),
        prompt: {
            subject: '',
            style: '',
            camera: CAMERAS[0],
            angle: '45-degree angle',
            depthOfField: DEPTHS_OF_FIELD[2],
            lighting: LIGHTING_STYLES[0],
            extraDetails: 'photorealistic, 8k, professional product photography'
        },
        originalImage: null,
        generatedImage: null,
        workMode: null,
        elements: [],
    };
};

export const App: React.FC = () => {
    const [slides, setSlides] = useState<Slide[]>([createNewSlide()]);
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(slides[0].id);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const selectedSlide = useMemo(() => slides.find(s => s.id === selectedSlideId) || null, [slides, selectedSlideId]);

    const updateCurrentSlide = (updates: Partial<Slide>) => {
        if (!selectedSlideId) return;
        setSlides(prevSlides =>
            prevSlides.map(s => (s.id === selectedSlideId ? { ...s, ...updates } : s))
        );
    };

    const handleUploadImage = (image: ImageObject) => {
        updateCurrentSlide({ originalImage: image, workMode: null, generatedImage: null });
    };

    const handleSetWorkMode = (workMode: 'retoucher' | 'editor') => {
        updateCurrentSlide({ workMode });
    };

    const handleGenerate = async () => {
        if (!selectedSlide) return;
        setIsLoading(true);
        setError(null);

        try {
            let image: ImageObject;
            if (selectedSlide.originalImage && selectedSlide.workMode) {
                setLoadingMessage('Analisando sua imagem e recriando a cena...');
                image = await generateSceneFromImage(selectedSlide);
            } else {
                setLoadingMessage('Gerando sua obra de arte do zero...');
                image = await generateImageFromText(selectedSlide.prompt);
            }
            updateCurrentSlide({ generatedImage: image });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleRefineOrEdit = async (mode: 'refine' | 'edit', refinePrompt: string) => {
        if (!selectedSlide?.generatedImage || !refinePrompt) return;
        
        setIsLoading(true);
        setLoadingMessage(mode === 'refine' ? 'Refinando detalhes...' : 'Editando a cena...');
        setError(null);
        
        const newSlide = {
            ...createNewSlide(),
            prompt: selectedSlide.prompt,
            originalImage: selectedSlide.originalImage, // Carry over original for context if needed
            workMode: selectedSlide.workMode,
        };

        try {
            const editedImage = await refineOrEditGeneratedImage(
                selectedSlide.generatedImage,
                refinePrompt,
                mode
            );
            
            newSlide.generatedImage = editedImage;
            
            setSlides(prev => [...prev, newSlide]);
            setSelectedSlideId(newSlide.id);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAddSlide = () => {
        const newSlide = createNewSlide();
        setSlides(prev => [...prev, newSlide]);
        setSelectedSlideId(newSlide.id);
    };

    const handleDeleteSlide = (slideId: string) => {
        if (slides.length <= 1) return;
        const remainingSlides = slides.filter(s => s.id !== slideId);
        setSlides(remainingSlides);
        if (selectedSlideId === slideId) {
            setSelectedSlideId(remainingSlides[0]?.id || null);
        }
    };

    const handleDownload = useCallback(() => {
        if (!selectedSlide?.generatedImage) return;
        const link = document.createElement('a');
        link.href = `data:${selectedSlide.generatedImage.mimeType};base64,${selectedSlide.generatedImage.base64}`;
        link.download = `estudiosabor-${selectedSlide.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [selectedSlide]);

    // Element Handlers
    const handleAddElement = () => {
        if (!selectedSlide) return;
        const newElement: Element = {
            id: uuidv4(),
            type: 'text',
            content: 'Texto Editável',
            x: 50, y: 50, width: 200, height: 50,
            fontSize: 24,
            fontFamily: 'Inter',
            color: '#FFFFFF'
        };
        updateCurrentSlide({ elements: [...selectedSlide.elements, newElement] });
    };

    const handleDeleteElement = (elementId: string) => {
        if (!selectedSlide) return;
        updateCurrentSlide({ elements: selectedSlide.elements.filter(el => el.id !== elementId) });
        if (selectedElementId === elementId) {
            setSelectedElementId(null);
        }
    };
    
    return (
        <div className="bg-gray-800 text-white min-h-screen flex flex-col font-sans">
            <header className="bg-gray-900/50 border-b border-gray-700/50 p-3 flex items-center shadow-md">
                <LogoIcon className="h-8 w-8 mr-3 text-yellow-400" />
                <h1 className="text-xl font-bold tracking-wider">Estúdio & Sabor <span className="font-light text-yellow-400">AI</span></h1>
            </header>

            <main className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 p-4" style={{ height: 'calc(100vh - 65px)' }}>
                <aside className="md:col-span-3 bg-gray-800/50 rounded-lg p-4 shadow-inner overflow-hidden flex flex-col">
                    <ControlsPanel 
                        slide={selectedSlide}
                        onUpdatePrompt={(prompt) => updateCurrentSlide({ prompt })}
                        onGenerate={handleGenerate} 
                        isGenerating={isLoading} 
                    />
                </aside>

                <section className="md:col-span-6 flex items-center justify-center">
                     <Artboard
                        slide={selectedSlide}
                        isLoading={isLoading}
                        loadingMessage={loadingMessage}
                        error={error}
                        onUploadImage={handleUploadImage}
                        onSetWorkMode={handleSetWorkMode}
                        // Element props will be added if direct manipulation on artboard is needed
                    />
                </section>

                <aside className="md:col-span-3 bg-gray-800/50 rounded-lg p-4 shadow-inner overflow-hidden flex flex-col">
                    <LayersPanel
                        slides={slides}
                        selectedSlide={selectedSlide}
                        selectedSlideId={selectedSlideId}
                        onSelectSlide={setSelectedSlideId}
                        onAddSlide={handleAddSlide}
                        onDeleteSlide={handleDeleteSlide}
                        onRefineOrEdit={handleRefineOrEdit}
                        onDownload={handleDownload}
                        isActionDisabled={isLoading || !selectedSlide?.generatedImage}
                        // Element Management
                        elements={selectedSlide?.elements || []}
                        onAddElement={handleAddElement}
                        onDeleteElement={handleDeleteElement}
                        selectedElementId={selectedElementId}
                        onSelectElement={setSelectedElementId}
                    />
                </aside>
            </main>
        </div>
    );
};