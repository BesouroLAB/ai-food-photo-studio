// components/Artboard.tsx
import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Slide, ImageObject, Element as ElementType, TextElement, ShapeElement, ImageAdjustments, StudioType } from '../types';
import { Loader } from './Loader';
import { UploadIcon, ZoomIcon, RotateIcon } from './icons';
import { CarouselPreview } from './CarouselPreview';
import { MaskingEditor } from './MaskingEditor';
import { StudioSelector } from './StudioSelector';

interface ArtboardProps {
    slide: Slide | null;
    slides: Slide[];
    selectedSlideId: string | null;
    isLoading: boolean;
    loadingMessage: string;
    error: string | null;
    onUploadImage: (image: ImageObject) => void;
    onSelectVariation: (image: ImageObject) => void;
    onPreviewImage: (slide: Slide, sourceImageType: 'original' | 'generated') => void;
    onAddSlide: () => void;
    onCloneSlide: (slideId: string) => void;
    onDeleteSlide: (slideId: string) => void;
    onSelectSlide: (slideId: string) => void;
    onMoveSlide: (dragIndex: number, hoverIndex: number) => void;
    isMasking: boolean;
    maskingSourceType: 'original' | 'generated';
    onApplyInpainting: (mask: ImageObject, prompt: string) => void;
    onCancelInpainting: () => void;
    isIsolatingProduct: boolean;
    onApplyIsolationMask: (mask: ImageObject) => void;
    onCancelIsolation: () => void;
    onErrorDismiss: () => void;
    onUpdateElement: (elementId: string, updates: Partial<ElementType>) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string | null) => void;
    previewElementStyle: Partial<ElementType> | null;
    onSelectStudio: (studioType: StudioType) => void;
}

const fileToImageObject = (file: File): Promise<ImageObject> => {
    return new Promise((resolve, reject) => {
        // Gemini API supports PNG, JPEG, WEBP, HEIC, HEIF.
        // Browsers have trouble with HEIC/HEIF, so we'll convert them and other unsupported types.
        const browserSupportedTypes = ['image/png', 'image/jpeg', 'image/webp'];

        if (browserSupportedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') {
                    return reject(new Error("File could not be read as a data URL."));
                }
                const base64 = event.target.result.split(',')[1];
                resolve({ base64, mimeType: file.type });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        } else {
            // For unsupported types like AVIF, HEIC, etc., convert to JPEG.
            console.warn(`Unsupported or browser-incompatible file type: ${file.type}. Converting to JPEG.`);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') {
                    return reject(new Error("File could not be read as a data URL."));
                }
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return reject(new Error('Could not get canvas context for image conversion.'));
                    }
                    // Draw a white background for images with transparency (like PNG being converted)
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

const UploadZone: React.FC<{
    onFileChange: (file: File | null) => void;
    isDragging: boolean;
    handleDragEvents: (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ onFileChange, isDragging, handleDragEvents, handleDrop }) => (
    <div 
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`w-full h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-yellow-400 bg-gray-700/50' : 'border-gray-600'}`}
    >
        <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)} />
        <UploadIcon className="w-16 h-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Arraste sua Imagem para este Slide</h3>
        <p className="text-gray-500 mt-1">ou <label htmlFor="file-upload" className="text-yellow-400 font-semibold cursor-pointer hover:underline">clique para selecionar</label>.</p>
        <p className="text-gray-400 mt-4 text-xs max-w-xs">Cada slide pode ter sua própria imagem. Para criar do zero, preencha os controles e clique em "Gerar Cena".</p>
    </div>
);

const VariationSelector: React.FC<{
    variations: ImageObject[];
    onSelect: (image: ImageObject) => void;
}> = ({ variations, onSelect }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in-fast">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex-shrink-0">Escolha sua favorita</h2>
        <div className={`grid gap-4 w-full h-full flex-grow ${variations.length > 2 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2'}`}>
            {variations.map((variation, index) => (
                <button 
                    key={index} 
                    className="group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-yellow-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => onSelect(variation)}
                >
                    <img src={`data:${variation.mimeType};base64,${variation.base64}`} alt={`Variação ${index + 1}`} className="w-full h-full object-contain" />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-lg font-bold">Selecionar</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const ShapeRenderer: React.FC<{ element: ShapeElement }> = ({ element }) => {
    const { shapeType, backgroundColor, borderColor, borderWidth, opacity } = element;

    const commonSvgProps = {
        fill: backgroundColor,
        stroke: borderColor,
        strokeWidth: borderWidth,
    };

    const svgWrapperStyle: React.CSSProperties = { width: '100%', height: '100%', overflow: 'visible', opacity };

    switch (shapeType) {
        case 'square':
            return <div style={{ width: '100%', height: '100%', backgroundColor, border: `${borderWidth}px solid ${borderColor}`, opacity }} />;
        case 'circle':
            return <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor, border: `${borderWidth}px solid ${borderColor}`, opacity }} />;
        case 'triangle':
            return (
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={svgWrapperStyle}>
                    <polygon points="50,0 100,100 0,100" {...commonSvgProps} />
                </svg>
            );
        case 'arrow':
             return (
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={svgWrapperStyle}>
                    <defs>
                        <marker id={`arrowhead-${element.id}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill={borderColor}></path>
                        </marker>
                    </defs>
                    <line x1="0" y1="50" x2="95" y2="50" stroke={borderColor} strokeWidth={borderWidth * 2} markerEnd={`url(#arrowhead-${element.id})`} />
                </svg>
            );
        default:
            return null;
    }
};

const ImageDisplay: React.FC<{
    slide: Slide;
    source: 'original' | 'generated';
    onPreviewClick: () => void;
    onUpdateElement: (elementId: string, updates: Partial<ElementType>) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string | null) => void;
    editingElementId: string | null;
    setEditingElementId: (id: string | null) => void;
    previewElementStyle: Partial<ElementType> | null;
    maskUrl?: string | null;
}> = ({ slide, source, onPreviewClick, onUpdateElement, selectedElementId, onSelectElement, editingElementId, setEditingElementId, previewElementStyle, maskUrl }) => {
    const image = source === 'original' ? slide.originalImage : slide.generatedImage;
    const elements = slide.elements;
    const adjustments = source === 'generated' ? slide.adjustments : null;
    
    const wrapperRef = useRef<HTMLDivElement>(null);
    const elementContainerRef = useRef<HTMLDivElement>(null);
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

    const imageUrl = image ? `data:${image.mimeType};base64,${image.base64}` : null;
    
    const handleRotationStart = useCallback((e: React.MouseEvent<HTMLDivElement>, element: ElementType) => {
        e.preventDefault();
        e.stopPropagation();

        const containerRect = elementContainerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const centerX = containerRect.left + element.x + element.width / 2;
        const centerY = containerRect.top + element.y + element.height / 2;

        const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        const initialRotation = element.rotation || 0;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const moveAngle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX) * (180 / Math.PI);
            let newRotation = initialRotation + (moveAngle - startAngle);

            if (moveEvent.shiftKey) {
                newRotation = Math.round(newRotation / 15) * 15;
            }

            onUpdateElement(element.id, { rotation: newRotation });
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [onUpdateElement]);


    useLayoutEffect(() => {
        if (!wrapperRef.current || !imageUrl) return;

        const container = wrapperRef.current;
        const img = new Image();
        
        const calculateSize = () => {
            const containerW = container.clientWidth;
            const containerH = container.clientHeight;

            if (img.naturalWidth === 0 || containerW === 0) return;

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
            setContentSize({ width, height });
        };
        
        img.onload = calculateSize;
        img.src = imageUrl;

        const resizeObserver = new ResizeObserver(calculateSize);
        resizeObserver.observe(container);
        
        return () => {
            resizeObserver.disconnect();
        };
    }, [imageUrl]);

    if (!image || !imageUrl) return null;
    
    const filterStyle: any = {};
    const vignetteStyle: any = {};

    if (adjustments) {
        // Start with base values
        const brightness = 100 + adjustments.brightness;
        let contrast = 100 + adjustments.contrast;
        const saturation = 100 + adjustments.saturation;
        
        // Sharpness contributes to contrast for a "sharper" look
        if (adjustments.sharpness > 0) {
            contrast += adjustments.sharpness * 0.25;
        }

        const filters = [];
        if (brightness !== 100) filters.push(`brightness(${brightness / 100})`);
        if (contrast !== 100) filters.push(`contrast(${contrast / 100})`);
        if (saturation !== 100) filters.push(`saturate(${saturation / 100})`);
        
        // Use a more subtle sepia for a "warmth" effect instead of a full vintage look.
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

    return (
        <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
            <div
                ref={elementContainerRef}
                id="artboard-content-wrapper"
                className="relative shadow-lg rounded-lg"
                style={{
                    width: contentSize.width ? `${contentSize.width}px` : 'auto',
                    height: contentSize.height ? `${contentSize.height}px` : 'auto',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onSelectElement(null);
                        setEditingElementId(null);
                    }
                }}
            >
                <img src={imageUrl} alt={source === 'original' ? 'Original' : 'Resultado'} className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none" style={filterStyle} />
                
                {adjustments && adjustments.vignette > 0 && (
                     <div className="absolute inset-0 w-full h-full rounded-lg pointer-events-none" style={vignetteStyle}></div>
                )}

                <button onClick={onPreviewClick} className="group absolute inset-0 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 rounded-lg">
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer">
                        <ZoomIcon className="w-12 h-12 text-white" />
                        <p className="text-white font-semibold mt-2">Clique para Inspecionar</p>
                    </div>
                </button>

                {maskUrl && (
                    <img src={maskUrl} alt="Máscara de proteção" className="absolute top-0 left-0 w-full h-full object-contain opacity-50 pointer-events-none" />
                )}

                {elements.map(el => {
                    const isSelected = selectedElementId === el.id;

                    const commonRndProps = {
                        key: el.id,
                        size: { width: el.width, height: el.height },
                        position: { x: el.x, y: el.y },
                        onDragStart: () => onSelectElement(el.id),
                        onDragStop: (e: any, d: { x: number; y: number; }) => onUpdateElement(el.id, { x: d.x, y: d.y }),
                        onResizeStart: () => onSelectElement(el.id),
                        onResizeStop: (e: any, direction: any, ref: { style: { width: string; height: string; }; }, delta: any, position: { x: number; y: number; }) => {
                            onUpdateElement(el.id, {
                                width: parseInt(ref.style.width, 10),
                                height: parseInt(ref.style.height, 10),
                                ...position,
                            });
                        },
                        onClick: (e: { stopPropagation: () => void; }) => { e.stopPropagation(); onSelectElement(el.id); },
                        className: `flex items-center justify-center box-border transition-colors duration-150 ${
                            isSelected ? 'outline outline-2 outline-dashed outline-yellow-400' :
                            'hover:outline hover:outline-1 hover:outline-dashed hover:outline-yellow-400/50'
                        }`,
                        bounds: "parent",
                    };

                    const renderContent = () => {
                        if (el.type === 'text') {
                            const isEditing = editingElementId === el.id;
                            return (
                                <div
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={e => {
                                        onUpdateElement(el.id, { content: e.currentTarget.innerText || ' ' });
                                        setEditingElementId(null);
                                    }}
                                    style={{
                                        fontSize: `${el.fontSize}px`,
                                        color: el.color,
                                        fontFamily: (isSelected && previewElementStyle?.type === 'text' && previewElementStyle.fontFamily) ? previewElementStyle.fontFamily : el.fontFamily,
                                        fontWeight: el.fontWeight,
                                        opacity: el.opacity,
                                        width: '100%',
                                        height: '100%',
                                        outline: 'none',
                                        lineHeight: 1.2,
                                        padding: '2px',
                                        cursor: isEditing ? 'text' : 'move',
                                        userSelect: isEditing ? 'text' : 'none',
                                    }}
                                >
                                    {el.content}
                                </div>
                            );
                        }
                        if (el.type === 'shape') {
                            return <ShapeRenderer element={el} />;
                        }
                        return null;
                    };
                    
                    if (el.type === 'text') {
                         return (
                            <Rnd
                                {...commonRndProps}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    onSelectElement(el.id);
                                    setEditingElementId(el.id);
                                }}
                                disableDragging={editingElementId === el.id}
                                enableResizing={editingElementId !== el.id}
                                minWidth={50}
                                minHeight={30}
                            >
                                <div className="w-full h-full relative">
                                    <div className="w-full h-full" style={{ transform: `rotate(${el.rotation || 0}deg)` }}>
                                        {renderContent()}
                                    </div>
                                    {isSelected && (
                                        <div
                                            onMouseDown={(e) => handleRotationStart(e, el)}
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full cursor-alias flex items-center justify-center"
                                            title="Rotacionar (Segure Shift para ângulos fixos)"
                                        >
                                            <RotateIcon className="w-3 h-3 text-gray-900"/>
                                        </div>
                                    )}
                                </div>
                            </Rnd>
                        );
                    }

                    if (el.type === 'shape') {
                        return (
                             <Rnd {...commonRndProps} minWidth={20} minHeight={20}>
                                <div className="w-full h-full relative">
                                    <div className="w-full h-full" style={{ transform: `rotate(${el.rotation || 0}deg)` }}>
                                        {renderContent()}
                                    </div>
                                    {isSelected && (
                                        <div
                                            onMouseDown={(e) => handleRotationStart(e, el)}
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full cursor-alias flex items-center justify-center"
                                            title="Rotacionar (Segure Shift para ângulos fixos)"
                                        >
                                            <RotateIcon className="w-3 h-3 text-gray-900"/>
                                        </div>
                                    )}
                                </div>
                            </Rnd>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
};


export const Artboard: React.FC<ArtboardProps> = ({ 
    slide, slides, selectedSlideId, isLoading, loadingMessage, error, onUploadImage, 
    onSelectVariation, onPreviewImage, onAddSlide, onCloneSlide, onDeleteSlide, onSelectSlide,
    onMoveSlide, isMasking, maskingSourceType, onApplyInpainting, onCancelInpainting,
    isIsolatingProduct, onApplyIsolationMask, onCancelIsolation, onErrorDismiss,
    onUpdateElement, selectedElementId, onSelectElement, previewElementStyle, onSelectStudio
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [editingElementId, setEditingElementId] = useState<string | null>(null);
    const [showComparison, setShowComparison] = useState(false);

    useEffect(() => {
        // Reset comparison view when the slide changes
        setShowComparison(false);
    }, [slide?.id]);


    const handleFileChange = async (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            try {
                const imageObject = await fileToImageObject(file);
                onUploadImage(imageObject);
            } catch (err) {
                console.error("Error processing file:", err);
            }
        }
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isEntering);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const renderMainContent = () => {
        if (isLoading) return <Loader message={loadingMessage} />;
        if (error) return (
            <div className="text-center text-red-400 p-4 bg-red-900/20 border border-red-500/30 rounded-lg animate-fade-in-fast">
                <h3 className="text-xl font-bold mb-2 text-red-300">Ocorreu um Erro</h3>
                <p className="text-red-200">{error}</p>
                <button
                    onClick={onErrorDismiss}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Voltar
                </button>
            </div>
        );

        if (!slide) return null;

        if (!slide.studioType) {
            return <StudioSelector onSelectStudio={onSelectStudio} />;
        }

        if (slide.generatedVariations && slide.generatedVariations.length > 0) {
            return <VariationSelector variations={slide.generatedVariations} onSelect={onSelectVariation} />;
        }
        
        const hasOriginal = !!slide.originalImage;
        const hasGenerated = !!slide.generatedImage;
        const isolationMaskUrl = slide.isolationMask ? `data:${slide.isolationMask.mimeType};base64,${slide.isolationMask.base64}` : null;
        
        const commonImageProps = {
            slide: slide,
            onUpdateElement: onUpdateElement,
            selectedElementId: selectedElementId,
            onSelectElement: onSelectElement,
            editingElementId: editingElementId,
            setEditingElementId: setEditingElementId,
            previewElementStyle: previewElementStyle,
        };

        if (hasGenerated && hasOriginal && showComparison) {
            return (
                <div className="grid grid-cols-2 gap-4 w-full h-full animate-fade-in-fast">
                    <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
                        <h4 className="font-bold mb-2 text-gray-400 flex-shrink-0">Original</h4>
                        <div className="flex-grow w-full relative flex items-center justify-center">
                            <ImageDisplay {...commonImageProps} source="original" onPreviewClick={() => onPreviewImage(slide!, 'original')} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
                        <h4 className="font-bold mb-2 text-yellow-400 flex-shrink-0">Resultado</h4>
                        <div className="flex-grow w-full relative flex items-center justify-center">
                           <ImageDisplay {...commonImageProps} source="generated" onPreviewClick={() => onPreviewImage(slide!, 'generated')} />
                        </div>
                    </div>
                </div>
            );
        }

        if (hasGenerated) {
            return <ImageDisplay {...commonImageProps} source="generated" onPreviewClick={() => onPreviewImage(slide!, 'generated')} />;
        }

        if (hasOriginal) {
            return <ImageDisplay {...commonImageProps} source="original" onPreviewClick={() => onPreviewImage(slide!, 'original')} maskUrl={isolationMaskUrl} />;
        }

        return (
            <UploadZone 
                onFileChange={handleFileChange}
                isDragging={isDragging}
                handleDragEvents={handleDragEvents}
                handleDrop={handleDrop}
            />
        );
    };

    const shouldShowMaskingEditor = (isMasking || isIsolatingProduct) && slide;
    let imageForMasking: ImageObject | null = null;
    if (shouldShowMaskingEditor) {
        if (isIsolatingProduct && slide.originalImage) {
            imageForMasking = slide.originalImage;
        } else if (isMasking) {
            imageForMasking = maskingSourceType === 'original' ? slide.originalImage : slide.generatedImage;
        }
    }
    
    return (
        <div className="w-full h-full bg-gray-900/50 rounded-lg flex flex-col relative overflow-hidden">
             {shouldShowMaskingEditor && imageForMasking ? (
                 <MaskingEditor
                    baseImage={imageForMasking}
                    onApply={isIsolatingProduct ? onApplyIsolationMask : onApplyInpainting}
                    onCancel={isIsolatingProduct ? onCancelIsolation : onCancelInpainting}
                    promptText={isIsolatingProduct ? "Proteja seu produto! Pinte sobre toda a área do seu prato de comida. A IA não tocará na área pintada." : undefined}
                    buttonText={isIsolatingProduct ? "Confirmar Máscara" : undefined}
                 />
             ) : (
                <>
                    {slide?.originalImage && slide?.generatedImage && (
                        <div className="absolute top-4 right-4 z-20 bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg flex items-center text-sm shadow-lg border border-gray-600/50 animate-fade-in-fast">
                            <label htmlFor="compare-toggle" className="flex items-center gap-2 font-semibold text-gray-300 cursor-pointer select-none">
                                <span>Comparar com Original</span>
                                <div className="relative inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        id="compare-toggle"
                                        className="sr-only peer"
                                        checked={showComparison}
                                        onChange={(e) => setShowComparison(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-yellow-500/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                </div>
                            </label>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="relative z-10 w-full flex-grow flex items-center justify-center p-4 overflow-hidden">
                        {renderMainContent()}
                    </div>
                    <div className="relative z-20 w-full flex-shrink-0">
                        <CarouselPreview 
                            slides={slides}
                            selectedSlideId={selectedSlideId}
                            onSelectSlide={id => { setEditingElementId(null); onSelectSlide(id); }}
                            onAddSlide={onAddSlide}
                            onCloneSlide={onCloneSlide}
                            onDeleteSlide={onDeleteSlide}
                            onMoveSlide={onMoveSlide}
                        />
                    </div>
                </>
             )}
        </div>
    );
};