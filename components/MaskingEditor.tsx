// components/MaskingEditor.tsx
import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import { ImageObject } from '../types';

interface MaskingEditorProps {
    baseImage: ImageObject;
    onApply: (mask: ImageObject, prompt: string) => void;
    onCancel: () => void;
    promptText?: string;
    buttonText?: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;

const EraserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17L4.844 21.75M11.42 15.17l6.545-6.546a2.652 2.652 0 00-3.75-3.75L4.844 11.42m6.576 3.75l-6.576-6.576m6.576 6.576L21 4.844"/>
    </svg>
);
const BrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);


export const MaskingEditor: React.FC<MaskingEditorProps> = ({ 
    baseImage, 
    onApply, 
    onCancel,
    promptText,
    buttonText
}) => {
    const [prompt, setPrompt] = useState('');
    const [brushSize, setBrushSize] = useState(40);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });
    const [showInteractionHint, setShowInteractionHint] = useState(true);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number } | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
    const isSpacePressed = useRef(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reviewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const transformWrapperRef = useRef<HTMLDivElement>(null);
    
    const imageUrl = `data:${baseImage.mimeType};base64,${baseImage.base64}`;

    useEffect(() => {
        const timer = setTimeout(() => setShowInteractionHint(false), 6000);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                isSpacePressed.current = true;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                isSpacePressed.current = false;
                setIsPanning(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const clampPosition = useCallback((pos: { x: number; y: number }, currentScale: number) => {
        const container = containerRef.current;
        if (!container || currentScale <= 1 || !contentSize.width) return { x: 0, y: 0 };

        const scaledWidth = contentSize.width * currentScale;
        const scaledHeight = contentSize.height * currentScale;
        const viewportWidth = container.clientWidth;
        const viewportHeight = container.clientHeight;
        
        const widthOverhang = Math.max(0, scaledWidth - viewportWidth);
        const heightOverhang = Math.max(0, scaledHeight - viewportHeight);
        
        const maxX = widthOverhang / 2;
        const minX = -maxX;
        const maxY = heightOverhang / 2;
        const minY = -maxY;

        return {
            x: Math.max(minX, Math.min(maxX, pos.x)),
            y: Math.max(minY, Math.min(maxY, pos.y)),
        };
    }, [contentSize]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        const container = containerRef.current;

        const setup = () => {
            if (canvas && image && container && image.naturalWidth > 0) {
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                const containerW = container.clientWidth;
                const containerH = container.clientHeight;
                const imgRatio = image.naturalWidth / image.naturalHeight;
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
            }
        };

        const handleResize = () => setup();
        window.addEventListener('resize', handleResize);

        if (image) {
            if (image.complete) {
                setup();
            } else {
                image.addEventListener('load', setup, { once: true });
            }
        }
        
        return () => {
            window.removeEventListener('resize', handleResize);
            if (image) image.removeEventListener('load', setup);
        };
    }, [imageUrl]);

    useEffect(() => {
        setPosition(p => clampPosition(p, scale));
    }, [scale, clampPosition]);
    
    useEffect(() => {
        if (isReviewing) {
            const mainCanvas = canvasRef.current;
            const reviewCanvas = reviewCanvasRef.current;
            if (mainCanvas && reviewCanvas) {
                reviewCanvas.width = mainCanvas.width;
                reviewCanvas.height = mainCanvas.height;
                const ctx = reviewCanvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(mainCanvas, 0, 0);
                    ctx.globalCompositeOperation = 'source-in';
                    ctx.fillStyle = 'rgba(239, 68, 68, 1)'; // red-500
                    ctx.fillRect(0, 0, reviewCanvas.width, reviewCanvas.height);
                }
            }
        }
    }, [isReviewing]);

    const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        const transformWrapper = transformWrapperRef.current;
        if (!canvas || !transformWrapper) return null;

        const rect = transformWrapper.getBoundingClientRect();
        
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        
        const mouseXOnElement = clientX - rect.left;
        const mouseYOnElement = clientY - rect.top;

        const nativeX = (mouseXOnElement / rect.width) * canvas.width;
        const nativeY = (mouseYOnElement / rect.height) * canvas.height;

        return { x: nativeX, y: nativeY };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const pos = getCanvasCoordinates(e);
        if (!pos) return;
        setIsDrawing(true);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) ctx.beginPath();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const pos = getCanvasCoordinates(e);
        if (!pos) return;

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        
        ctx.lineWidth = brushSize * (canvasRef.current.width / contentSize.width) / scale;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        
        ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setShowInteractionHint(false);
        
        const delta = e.deltaY * -0.005;
        const newScale = Math.min(Math.max(scale + delta, MIN_SCALE), MAX_SCALE);
        
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left - contentSize.width / 2;
        const mouseY = e.clientY - rect.top - contentSize.height / 2;

        const newPosX = position.x - (mouseX - position.x) * (newScale / scale - 1);
        const newPosY = position.y - (mouseY - position.y) * (newScale / scale - 1);

        setScale(newScale);
        setPosition(clampPosition({ x: newPosX, y: newPosY }, newScale));
    };
    
    const handleMouseDown = (e: React.MouseEvent) => {
        setShowInteractionHint(false);
        if (isSpacePressed.current && scale > 1) {
            e.preventDefault();
            setIsPanning(true);
            setStartPanPos({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        } else {
            startDrawing(e);
        }
    };

    const handleMouseUp = () => {
        if (isPanning) setIsPanning(false);
        if (isDrawing) stopDrawing();
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        if (isPanning) {
            e.preventDefault();
            const newPos = {
                 x: e.clientX - startPanPos.x,
                 y: e.clientY - startPanPos.y,
            };
            setPosition(clampPosition(newPos, scale));
        } else {
            draw(e);
        }
    };

    const handleMouseLeave = () => {
        handleMouseUp();
        setCursorPosition(null);
    };
    
    const handleDoubleClick = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleApply = () => {
        const canvas = canvasRef.current;
        if (!canvas || (!prompt && !buttonText)) return;

        const maskCanvas = document.createElement('canvas');
        const image = imageRef.current;
        if (!image) return;

        maskCanvas.width = image.naturalWidth;
        maskCanvas.height = image.naturalHeight;
        
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;

        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        maskCtx.drawImage(canvas, 0, 0, maskCanvas.width, maskCanvas.height);
        
        const maskBase64 = maskCanvas.toDataURL('image/png').split(',')[1];
        const mask: ImageObject = { base64: maskBase64, mimeType: 'image/png' };
        
        onApply(mask, prompt);
    };
    
    const handleConfirmClick = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        try {
            const pixelBuffer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let hasDrawing = false;
            for (let i = 3; i < pixelBuffer.length; i += 4) {
                if (pixelBuffer[i] > 0) { // Check alpha channel
                    hasDrawing = true;
                    break;
                }
            }

            if (!hasDrawing) {
                alert("Por favor, pinte a área que deseja proteger antes de continuar.");
                return;
            }
        } catch (e) {
            console.error("Could not check canvas data, proceeding anyway.", e);
        }

        setIsReviewing(true);
    };

    const toggleTool = () => {
      setIsErasing(prev => !prev);
    };

    let cursorStyle = 'auto';
    if (isSpacePressed.current && scale > 1) {
        cursorStyle = isPanning ? 'grabbing' : 'grab';
    } else if (cursorPosition) {
        cursorStyle = 'none'; // Hide system cursor when our custom one is active
    }

    return (
        <div className="fixed inset-0 z-50 w-full h-full flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm animate-fade-in-fast">
            
            {!isReviewing && (
                <>
                    {/* Top Controls */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-auto max-w-[95%] bg-gray-900/80 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-2xl p-2 flex items-center gap-4 z-20">
                        <button onClick={toggleTool} title={isErasing ? "Mudar para Pincel" : "Mudar para Borracha"}
                            className={`p-2 rounded-md transition-colors ${!isErasing ? 'bg-yellow-500/20' : 'bg-gray-700'}`}>
                            <BrushIcon className={`w-5 h-5 ${!isErasing ? 'text-yellow-300' : 'text-white'}`} />
                        </button>
                         <button onClick={toggleTool} title={isErasing ? "Mudar para Pincel" : "Mudar para Borracha"}
                            className={`p-2 rounded-md transition-colors ${isErasing ? 'bg-yellow-500/20' : 'bg-gray-700'}`}>
                            <EraserIcon className={`w-5 h-5 ${isErasing ? 'text-yellow-300' : 'text-white'}`} />
                        </button>

                        <div className="flex items-center gap-2">
                            <label htmlFor="brush-size" className="text-sm font-medium text-gray-300 whitespace-nowrap">Tamanho:</label>
                            <input id="brush-size" type="range" min="5" max="200" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-24 md:w-32"/>
                        </div>
                        <div className="h-6 w-px bg-gray-600"></div>
                        {!promptText && (
                            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Descreva a alteração..."
                                className="bg-gray-700/80 border border-gray-600 rounded-md px-3 py-1 text-sm text-white focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition w-40 md:w-60"/>
                        )}
                        <button onClick={buttonText ? handleConfirmClick : handleApply} disabled={!prompt && !buttonText} className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-gray-900 font-bold py-1 px-3 rounded-md transition-colors whitespace-nowrap text-sm">
                            {buttonText || 'Aplicar'}
                        </button>
                        <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-md transition-colors text-sm">
                            Cancelar
                        </button>
                    </div>

                    {/* Bottom Hints */}
                    {showInteractionHint && promptText && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-lg pointer-events-none animate-fade-in-fast text-center shadow-lg">
                            <p className="font-semibold text-base">{promptText}</p>
                            <p className="text-xs text-gray-300 mt-1">Use SCROLL para zoom, segure ESPAÇO e arraste para mover.</p>
                        </div>
                    )}
                </>
            )}
            
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden"
                style={{ cursor: cursorStyle }}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    ref={transformWrapperRef}
                    style={{ 
                        position: 'relative',
                        width: contentSize.width ? `${contentSize.width}px` : 'auto',
                        height: contentSize.height ? `${contentSize.height}px` : 'auto',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, 
                        transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                        willChange: 'transform'
                    }}>
                    <img ref={imageRef} src={imageUrl} alt="Base para edição" className="absolute top-0 left-0 w-full h-full select-none pointer-events-none" style={{ imageRendering: 'pixelated' }} />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                </div>
            </div>

            {cursorPosition && !isPanning && !isReviewing && (
                <div
                    className="rounded-full border-2 pointer-events-none absolute z-50"
                    style={{
                        width: `${brushSize}px`,
                        height: `${brushSize}px`,
                        left: `${cursorPosition.x}px`,
                        top: `${cursorPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        borderColor: isErasing ? 'rgba(255, 100, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: isErasing ? 'rgba(255, 100, 100, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                    }}
                />
            )}
            
            {isReviewing && (
                <div className="absolute inset-0 z-30 bg-black/70 flex flex-col items-center justify-center animate-fade-in-fast p-4">
                    <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-600 text-center max-w-lg w-full">
                        <h2 className="text-xl font-bold text-yellow-400 mb-2">Revisar Máscara de Proteção</h2>
                        <p className="text-gray-300 mb-4 text-sm">A área em <span className="text-red-400 font-semibold">vermelho</span> será 100% preservada. A IA irá criar um novo cenário no restante da imagem.</p>
                        
                        <div className="relative w-full h-64 bg-gray-900 rounded-md overflow-hidden mb-4 border border-gray-700">
                            <img src={imageUrl} alt="Preview da imagem original" className="w-full h-full object-contain" />
                            <canvas 
                                ref={reviewCanvasRef} 
                                className="absolute top-0 left-0 w-full h-full object-contain opacity-60 pointer-events-none" 
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <button onClick={() => setIsReviewing(false)} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Voltar e Editar
                            </button>
                            <button onClick={handleApply} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Gerar Cena
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="absolute bottom-4 left-4 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-md pointer-events-none">
                {`${Math.round(scale * 100)}%`}
            </div>
        </div>
    );
};