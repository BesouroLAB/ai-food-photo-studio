// components/ImagePreviewModal.tsx
import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Slide, ImageAdjustments, Look, ReferenceObject, ImageObject, StudioType } from '../types';
import { InfoIcon, SparklesIcon, HarmonizeIcon, PhotoIcon, SwapIcon, ArrowsPointingOutIcon } from './icons';
import { CarouselPreview } from './CarouselPreview';
import { AdjustmentsPanel } from './AdjustmentsPanel';
import { ReferenceObjectManager } from './ReferenceObjectManager';

interface ImagePreviewModalProps {
    slide: Slide;
    slides: Slide[];
    selectedSlideId: string | null;
    onSelectSlide: (slideId: string) => void;
    onAddSlide: () => void;
    onCloneSlide: (slideId: string) => void;
    onDeleteSlide: (slideId: string) => void;
    onMoveSlide: (dragIndex: number, hoverIndex: number) => void;
    onClose: () => void;
    isActionDisabled: boolean;
    sourceImageType: 'original' | 'generated';
    onRefineOrEdit: (mode: 'refine' | 'edit', prompt: string, referenceObjects: ReferenceObject[]) => void;
    onSwapMainElement: (newElementImage: ImageObject) => void;
    onEnterInpaintingMode: () => void;
    onApplyAdjustments: (adjustments: ImageAdjustments) => void;
    onAdjustmentsUpdate: (updates: Partial<ImageAdjustments>) => void;
    onRefineFocus: (focusLevel: string) => void;
    onHarmonizeImage: () => void;
    onMakeMoreNatural: (withImperfections: boolean) => void;
    onSubtleUpscale: () => void;
    onCreativeUpscale: () => void;
}

const fileToImageObject = (file: File): Promise<ImageObject> => {
    return new Promise((resolve, reject) => {
        const browserSupportedTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (browserSupportedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') return reject(new Error("File could not be read."));
                const base64 = event.target.result.split(',')[1];
                resolve({ base64, mimeType: file.type });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        } else {
            console.warn(`Unsupported file type: ${file.type}. Converting to JPEG.`);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') return reject(new Error("File could not be read."));
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return reject(new Error('Could not get canvas context.'));
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                    const base64 = dataUrl.split(',')[1];
                    resolve({ base64, mimeType: 'image/jpeg' });
                };
                img.onerror = () => reject(new Error(`Could not load image for conversion.`));
                img.src = event.target.result as string;
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        }
    });
};


const MIN_SCALE = 1;
const MAX_SCALE = 8;

const PromptDetail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <h4 className="text-sm font-semibold text-yellow-400/80 uppercase tracking-wider mb-1">{label}</h4>
        <p className="text-base text-gray-200">{value}</p>
    </div>
);

const actionTooltips = {
    refine: "Faça pequenas alterações na imagem atual (ex: 'adicione mais vapor', 'deixe o queijo mais derretido').",
    edit: "Faça grandes alterações na imagem, descrevendo uma nova cena (ex: 'mude a mesa para mármore branco', 'coloque a cena em uma praia').",
    inpaint: "Pinte sobre uma área específica da imagem para alterá-la (ex: pintar o prato e pedir para 'mudar a cor para preto').",
    harmonize: "A IA ajustará a iluminação e as cores para integrar perfeitamente o produto ao novo cenário. Ideal para imagens criadas com 'Isolar Produto'.",
    makeNatural: "A IA recriará a imagem com o objetivo de torná-la o mais fotorrealista possível, quase indistinguível de uma fotografia real.",
    swapMainElementObject: "Envie a foto de um novo objeto para substituir o assunto principal. O cenário, a iluminação e o ângulo da imagem atual serão mantidos.",
    swapMainElementPerson: "Envie a foto de uma nova pessoa/modelo. O cenário, a iluminação, a pose e as roupas da imagem atual serão mantidos, trocando apenas o modelo.",
    subtleUpscale: "Aumenta a resolução da imagem, mantendo os detalhes originais o mais fielmente possível.",
    creativeUpscale: "Aumenta a resolução e adiciona novos detalhes e texturas finas para um resultado mais rico."
};

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ 
    slide, slides, selectedSlideId, onSelectSlide, onAddSlide, onCloneSlide, onDeleteSlide, onMoveSlide,
    onClose, isActionDisabled, sourceImageType, onRefineOrEdit, onSwapMainElement, onEnterInpaintingMode, 
    onApplyAdjustments, onAdjustmentsUpdate, onRefineFocus, onHarmonizeImage, onMakeMoreNatural,
    onSubtleUpscale, onCreativeUpscale
}) => {
    const image = sourceImageType === 'original' ? slide.originalImage : slide.generatedImage;
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [refinePrompt, setRefinePrompt] = useState('');
    const [showPromptInfo, setShowPromptInfo] = useState(false);
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
    const [referenceObjects, setReferenceObjects] = useState<ReferenceObject[]>([]);
    
    const imageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const swapMainElementFileInputRef = useRef<HTMLInputElement>(null);

    const objectBasedStudios: StudioType[] = ['food', 'jewelry', 'cosmetics', 'electronics'];
    const personBasedStudios: StudioType[] = ['fashion', 'people'];
    const isObjectBasedStudio = slide.studioType && objectBasedStudios.includes(slide.studioType);
    const isPersonBasedStudio = slide.studioType && personBasedStudios.includes(slide.studioType);

    useEffect(() => {
        // Reset zoom/pan and references when slide changes
        setScale(1);
        setPosition({x: 0, y: 0});
        setReferenceObjects([]);
    }, [slide.id]);

    if (!image) return null;
    const imageUrl = `data:${image.mimeType};base64,${image.base64}`;

    const handleAddReferenceObject = (image: ImageObject) => {
        const newRef: ReferenceObject = {
            id: uuidv4(),
            image,
            description: '',
            role: 'object',
        };
        setReferenceObjects(prev => [...prev, newRef]);
    };

    const handleUpdateReferenceObject = (id: string, updates: Partial<ReferenceObject>) => {
        setReferenceObjects(prev => prev.map(ref => ref.id === id ? { ...ref, ...updates } : ref));
    };

    const handleDeleteReferenceObject = (id: string) => {
        setReferenceObjects(prev => prev.filter(ref => ref.id !== id));
    };

    const handleSwapMainElementFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageObject = await fileToImageObject(file);
                onSwapMainElement(imageObject);
            } catch (err) {
                console.error("Error processing swap element image:", err);
            }
        }
        if (event.target) {
            event.target.value = ''; // Reset file input
        }
    };

    useLayoutEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        const canvas = canvasRef.current;

        const calculateSize = () => {
            if (!canvas || img.naturalWidth === 0) return;

            const containerW = canvas.clientWidth;
            const containerH = canvas.clientHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const containerRatio = containerW / containerH;

            let width, height;
            if (imgRatio > containerRatio) {
                width = containerW;
                height = containerW / imgRatio;
            } else {
                height = containerH;
                width = containerH * imgRatio;
            }
            setContentSize({ width: Math.round(width), height: Math.round(height) });
        };
        
        img.onload = calculateSize;
        if (img.complete) {
            calculateSize();
        }

        const resizeObserver = new ResizeObserver(calculateSize);
        if (canvas) {
            resizeObserver.observe(canvas);
        }

        return () => {
            if (canvas) {
                resizeObserver.unobserve(canvas);
            }
        };
    }, [imageUrl]);

    const clampPosition = useCallback((pos: { x: number; y: number }, currentScale: number) => {
        const canvas = canvasRef.current;
        if (!canvas || currentScale <= 1 || !contentSize.width) return { x: 0, y: 0 };
        
        const scaledWidth = contentSize.width * currentScale;
        const scaledHeight = contentSize.height * currentScale;
        const viewportWidth = canvas.clientWidth;
        const viewportHeight = canvas.clientHeight;
        
        const widthOverhang = Math.max(0, scaledWidth - viewportWidth);
        const heightOverhang = Math.max(0, scaledHeight - viewportHeight);
        
        const maxX = widthOverhang / 2;
        const minX = -maxX;
        const maxY = heightOverhang / 2;
        const minY = -maxY;

        return { x: Math.max(minX, Math.min(maxX, pos.x)), y: Math.max(minY, Math.min(maxY, pos.y)) };
    }, [contentSize]);

    const scaleRef = useRef(scale);
    useEffect(() => { scaleRef.current = scale }, [scale]);
    const positionRef = useRef(position);
    useEffect(() => { positionRef.current = position }, [position]);

    const handleZoom = useCallback((delta: number, clientOriginX?: number, clientOriginY?: number) => {
        const currentScale = scaleRef.current;
        const currentPosition = positionRef.current;
        const newScale = Math.min(Math.max(currentScale + delta, MIN_SCALE), MAX_SCALE);
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        // Use viewport center if no origin is provided
        const originX = clientOriginX ?? (rect.left + rect.width / 2);
        const originY = clientOriginY ?? (rect.top + rect.height / 2);

        // Mouse position relative to the canvas/viewport top-left corner
        const mouseX = originX - rect.left;
        const mouseY = originY - rect.top;

        // Mouse position relative to the canvas/viewport center
        const mouseRelativeToCenter = {
            x: mouseX - rect.width / 2,
            y: mouseY - rect.height / 2
        };

        // The formula for the new position is: T' = O_rel * (1 - s'/s) + T * s'/s
        const scaleRatio = newScale / currentScale;
        const newPosX = mouseRelativeToCenter.x * (1 - scaleRatio) + currentPosition.x * scaleRatio;
        const newPosY = mouseRelativeToCenter.y * (1 - scaleRatio) + currentPosition.y * scaleRatio;

        setScale(newScale);
        setPosition(clampPosition({ x: newPosX, y: newPosY }, newScale));
    }, [clampPosition]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            let zoomChange = 0;
            if (e.key === '+' || e.key === '=') {
                zoomChange = 0.25;
            } else if (e.key === '-') {
                zoomChange = -0.25;
            }
            if (zoomChange !== 0) {
                e.preventDefault();
                handleZoom(zoomChange);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleZoom]);

    useEffect(() => { setPosition(p => clampPosition(p, scale)); }, [scale, clampPosition]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * -0.005;
        // User wants center zoom, so we don't pass mouse coordinates.
        // The default in handleZoom will be the viewport center.
        handleZoom(delta);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            e.preventDefault(); setIsPanning(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };
    const handleMouseUp = () => setIsPanning(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            e.preventDefault();
            setPosition(clampPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y }, scale));
        }
    };
    const handleDoubleClick = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

    const cursorClass = scale > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default';
    const { prompt, adjustments } = slide;
    // FIX: Changed React.CSSProperties to `any` to allow for `filter` property which is not in some TS definitions for CSS.
    const filterStyle: any = {};
    // FIX: Changed React.CSSProperties to `any` to allow for `background` property with gradient.
    const vignetteStyle: any = {};
    if (adjustments) {
        const brightness = 100 + adjustments.brightness;
        let contrast = 100 + adjustments.contrast;
        const saturation = 100 + adjustments.saturation;
        if (adjustments.sharpness > 0) {
            contrast += adjustments.sharpness * 0.25;
        }
        const filters = [];
        if (brightness !== 100) filters.push(`brightness(${brightness / 100})`);
        if (contrast !== 100) filters.push(`contrast(${contrast / 100})`);
        if (saturation !== 100) filters.push(`saturate(${saturation / 100})`);
        if (adjustments.warmth > 0) {
            filters.push(`sepia(${adjustments.warmth / 150})`);
        }
        if (filters.length > 0) {
            filterStyle.filter = filters.join(' ');
        }
        if (adjustments.vignette > 0) {
            const vignetteIntensity = adjustments.vignette / 100;
            vignetteStyle.background = `radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,${vignetteIntensity * 0.8}) 120%)`;
        }
    }

    const focusOptions = [
        { label: "Mais Nítido", level: "sharper" },
        { label: "Desfoque Suave", level: "blurrier" },
        { label: "Bokeh Intenso", level: "intense_bokeh" }
    ];
    
    const wasGeneratedWithIsolation = slide.isolationMask != null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-gray-800/90 border border-gray-600/50 rounded-xl w-[95vw] h-[95vh] max-w-screen-2xl flex flex-col shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <div className="relative flex-grow flex flex-row overflow-hidden">
                    <div ref={canvasRef} className={`relative flex-grow bg-gray-900/50 overflow-hidden ${cursorClass} rounded-tl-xl flex items-center justify-center`} onWheel={handleWheel} onDoubleClick={handleDoubleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                        <div ref={imageRef} className="absolute" style={{ 
                            width: contentSize.width ? `${contentSize.width}px` : 'auto',
                            height: contentSize.height ? `${contentSize.height}px` : 'auto',
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, 
                            transition: isPanning ? 'none' : 'transform 0.1s ease-out' 
                        }}>
                            <img src={imageUrl} alt="Visualização" className="absolute top-0 left-0 w-full h-full" style={filterStyle} />
                            {adjustments && adjustments.vignette > 0 && <div className="absolute inset-0 w-full h-full pointer-events-none" style={vignetteStyle}></div>}
                        </div>
                    </div>

                    <aside className="flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border-l border-gray-600/50 p-4 flex flex-col justify-start gap-4 z-20 w-96 rounded-tr-xl">
                        <div className="flex-grow overflow-y-auto pr-2 -mr-4 space-y-4">
                            {sourceImageType === 'generated' && (
                            <>
                                <AdjustmentsPanel
                                    slide={slide}
                                    onAdjustmentsUpdate={onAdjustmentsUpdate}
                                    onApplyAdjustments={onApplyAdjustments}
                                    isActionDisabled={isActionDisabled}
                                />
                                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-3"><SparklesIcon className="w-5 h-5 text-yellow-400"/><h3 className="text-lg font-bold text-yellow-400">Ferramentas IA</h3></div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Objetos de Referência</label>
                                        <ReferenceObjectManager
                                            referenceObjects={referenceObjects}
                                            onAdd={handleAddReferenceObject}
                                            onUpdate={handleUpdateReferenceObject}
                                            onDelete={handleDeleteReferenceObject}
                                        />
                                    </div>
                                    <div className="space-y-2 border-t border-gray-700/50 pt-3 mt-3"><label className="text-xs font-medium text-gray-400">Foco do Fundo</label>
                                    <div className="grid grid-cols-3 gap-2">{focusOptions.map(opt => (<button key={opt.level} onClick={() => {onRefineFocus(opt.level);}} disabled={isActionDisabled} className="bg-blue-600/70 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 px-1 rounded-md transition-colors text-center">{opt.label}</button>))}</div>
                                    <p className="text-xs text-gray-500 text-center pt-1">Cada ação irá gerar uma nova imagem.</p></div>
                                </div>
                            </>
                            )}
                             {sourceImageType === 'original' && (
                                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/50">
                                     <h3 className="text-lg font-bold text-yellow-400 mb-2">Ações Rápidas</h3>
                                     <p className="text-sm text-gray-400 mb-4">Ajustes e filtros estão disponíveis após a primeira geração de imagem.</p>
                                      <div className="space-y-2 border-t border-gray-700/50 pt-3">
                                        <label className="text-sm font-medium text-gray-300">Objetos de Referência</label>
                                        <ReferenceObjectManager
                                            referenceObjects={referenceObjects}
                                            onAdd={handleAddReferenceObject}
                                            onUpdate={handleUpdateReferenceObject}
                                            onDelete={handleDeleteReferenceObject}
                                        />
                                    </div>
                                </div>
                             )}
                        </div>
                        
                        <div className="mt-auto w-full flex-shrink-0 pt-4 border-t border-gray-700/50">
                            <input
                                type="file"
                                ref={swapMainElementFileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleSwapMainElementFileChange}
                            />
                            <textarea id="modal-refine-prompt" rows={2} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-1 focus:ring-yellow-500 text-sm" value={refinePrompt} onChange={(e) => setRefinePrompt(e.target.value)} placeholder="Descreva uma alteração..." disabled={isActionDisabled} />
                            
                            <div className="text-sm font-semibold text-gray-300 mt-3 mb-2">Ações Criativas Principais</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="relative group col-span-1"><button onClick={() => onRefineOrEdit('refine', refinePrompt, referenceObjects)} disabled={isActionDisabled || !refinePrompt} className="w-full bg-blue-600/70 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">Refinar Sutil</button><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.refine}</div></div>
                                <div className="relative group col-span-1"><button onClick={() => onRefineOrEdit('edit', refinePrompt, referenceObjects)} disabled={isActionDisabled || !refinePrompt} className="w-full bg-yellow-600/70 hover:bg-yellow-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">Editar Cena</button><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.edit}</div></div>
                                <div className="relative group col-span-2"><button onClick={onEnterInpaintingMode} disabled={isActionDisabled} className="w-full bg-purple-600/70 hover:bg-purple-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">Editar Área (Inpaint)</button><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.inpaint}</div></div>
                                
                                {(isObjectBasedStudio || isPersonBasedStudio) && (
                                    <div className="relative group col-span-2">
                                        <button onClick={() => swapMainElementFileInputRef.current?.click()} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-indigo-600/70 hover:bg-indigo-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                            <SwapIcon className="w-5 h-5" />
                                            {isPersonBasedStudio ? "Manter Cenário (Trocar Modelo)" : "Manter Cenário (Trocar Objeto)"}
                                        </button>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                                            {isPersonBasedStudio ? actionTooltips.swapMainElementPerson : actionTooltips.swapMainElementObject}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {sourceImageType === 'generated' && (
                                <>
                                    <div className="border-t border-gray-700 my-3"></div>
                                    <div className="text-sm font-semibold text-gray-300 mb-2">Melhorias de Cena</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {wasGeneratedWithIsolation && (
                                            <div className="relative group col-span-2">
                                                <button onClick={onHarmonizeImage} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-teal-600/70 hover:bg-teal-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                                    <HarmonizeIcon className="w-5 h-5" />
                                                    Harmonizar Cena
                                                </button>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.harmonize}</div>
                                            </div>
                                        )}
                                        <div className="relative group col-span-1">
                                            <button onClick={() => onMakeMoreNatural(false)} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-green-600/70 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                                <PhotoIcon className="w-5 h-5" />
                                                Natural (Sutil)
                                            </button>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.makeNatural}</div>
                                        </div>
                                        <div className="relative group col-span-1">
                                            <button onClick={() => onMakeMoreNatural(true)} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-green-600/70 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                                <SparklesIcon className="w-5 h-5" />
                                                Natural (Imperfeições)
                                            </button>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">Adiciona imperfeições sutis (micro-assimetrias, poeira, texturas irregulares) para um look mais autêntico e menos perfeito, como uma foto real.</div>
                                        </div>
                                        <div className="relative group col-span-1">
                                            <button onClick={onSubtleUpscale} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-cyan-600/70 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                                <ArrowsPointingOutIcon className="w-5 h-5" />
                                                Upscale Sutil
                                            </button>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.subtleUpscale}</div>
                                        </div>
                                        <div className="relative group col-span-1">
                                            <button onClick={onCreativeUpscale} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-cyan-600/70 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">
                                                <SparklesIcon className="w-5 h-5" />
                                                Upscale Criativo
                                            </button>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">{actionTooltips.creativeUpscale}</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </aside>

                    <div className={`absolute top-0 left-0 h-full w-96 bg-gray-900/80 backdrop-blur-sm border-r border-gray-600/50 shadow-2xl p-4 transition-transform duration-300 ease-in-out z-30 transform ${showPromptInfo ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Detalhes do Prompt</h3>
                        <div className="space-y-4 h-[calc(100%-40px)] overflow-y-auto pr-2">
                            {prompt && (
                                <>
                                    <PromptDetail label="Estilo do Cenário" value={prompt.style} />
                                    <PromptDetail label="Câmera" value={prompt.camera.name} />
                                    <PromptDetail label="Ângulo" value={prompt.angle.name} />
                                    <PromptDetail label="Foco (DoF)" value={prompt.depthOfField.name} />
                                    <PromptDetail label="Iluminação" value={prompt.lighting.name} />
                                    <div><h4 className="text-sm font-semibold text-yellow-400/80 uppercase tracking-wider mb-2">Keywords da IA</h4><div className="flex flex-wrap gap-1.5">{[...new Set([...prompt.camera.keywords, ...prompt.angle.keywords, ...prompt.depthOfField.keywords, ...prompt.lighting.keywords])].map(k => (<span key={k} className="bg-gray-700 text-gray-200 text-sm px-2 py-1 rounded-full">{k}</span>))}</div></div>
                                    <div><h4 className="text-sm font-semibold text-red-400/80 uppercase tracking-wider mb-2">Keywords Negativas</h4><div className="flex flex-wrap gap-1.5">{prompt.negativeKeywords.map(k => (<span key={k} className="bg-red-900/50 text-red-300 text-sm px-2 py-1 rounded-full">{k}</span>))}</div></div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-40">
                        <button onClick={() => setShowPromptInfo(!showPromptInfo)} className="bg-gray-800/80 backdrop-blur-sm rounded-full p-2 text-white hover:text-yellow-400 transition-colors shadow-lg border border-gray-600/50" title="Detalhes do Prompt"><InfoIcon className="h-6 w-6" /></button>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-full p-2 text-white hover:text-yellow-400 transition-colors z-20 shadow-lg border border-gray-600/50" aria-label="Fechar"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    <div className="absolute bottom-4 right-4 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-md pointer-events-none z-10">{`${Math.round(scale * 100)}%`}</div>
                </div>
                
                <div className="flex-shrink-0 border-t border-gray-700/50 rounded-b-xl">
                    <CarouselPreview
                        slides={slides}
                        selectedSlideId={selectedSlideId}
                        onSelectSlide={onSelectSlide}
                        onAddSlide={onAddSlide}
                        onCloneSlide={onCloneSlide}
                        onDeleteSlide={onDeleteSlide}
                        onMoveSlide={onMoveSlide}
                    />
                </div>
            </div>
        </div>
    );
};