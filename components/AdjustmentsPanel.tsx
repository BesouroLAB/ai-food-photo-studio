// components/AdjustmentsPanel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Slide, ImageAdjustments, Look } from '../types';
import { LOOKS } from '../constants/index';
import { UndoIcon } from './icons';

const AdjustmentSlider: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    onReset: () => void;
    min: number;
    max: number;
    step?: number;
    defaultValue?: number;
}> = ({ label, value, onChange, onReset, min, max, step = 1, defaultValue = 0 }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-gray-400">{label}</label>
            <div className="flex items-center gap-2">
                 {value !== defaultValue && (
                    <button onClick={onReset} title={`Redefinir ${label}`} className="text-gray-500 hover:text-yellow-400 transition-colors">
                        <UndoIcon className="w-3 h-3" />
                    </button>
                )}
                <span className="text-xs font-mono text-gray-300 bg-gray-700 px-1.5 py-0.5 rounded">{value}</span>
            </div>
        </div>
        <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);

const lookToCssFilter = (adjustments: ImageAdjustments): React.CSSProperties => {
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
        return { filter: filters.join(' ') };
    }
    return {};
};

const LookTooltip: React.FC<{ look: Look; position: { top: number; left: number } }> = ({ look, position }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        opacity: 0,
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        willChange: 'opacity, top'
    });

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setStyle({
                opacity: 1,
                top: `${position.top - rect.height - 10}px`, // 10px gap above
                left: `${position.left}px`, // Centering is now done via transform
                transform: 'translateX(-50%)',
                transition: 'opacity 0.2s, top 0.2s',
            });
        }
    }, [position]);

    return (
        <div ref={ref} className="fixed p-3 bg-gray-900 border border-gray-600 rounded-lg text-sm z-[100] shadow-2xl max-w-xs pointer-events-none" style={style}>
            <h4 className="font-bold text-base text-yellow-400 mb-1">{look.name}</h4>
            <p className="text-gray-300">{look.description}</p>
        </div>
    );
};

interface AdjustmentsPanelProps {
    slide: Slide;
    onAdjustmentsUpdate: (updates: ImageAdjustments) => void;
    onApplyAdjustments: (adjustments: ImageAdjustments) => void;
    isActionDisabled: boolean;
}

const defaultAdjustments: ImageAdjustments = { brightness: 0, contrast: 0, saturation: 0, warmth: 0, vignette: 0, sharpness: 0 };
const imageUrl = (slide: Slide) => slide.generatedImage ? `data:${slide.generatedImage.mimeType};base64,${slide.generatedImage.base64}` : '';

export const AdjustmentsPanel: React.FC<AdjustmentsPanelProps> = ({ slide, onAdjustmentsUpdate, onApplyAdjustments, isActionDisabled }) => {
    const [selectedLook, setSelectedLook] = useState<Look | null>(null);
    const [lookIntensity, setLookIntensity] = useState(100);
    const [hoveredLook, setHoveredLook] = useState<Look | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);

    const currentAdjustments = slide.adjustments || defaultAdjustments;

    useEffect(() => {
        setSelectedLook(null);
    }, [slide.id]);

    const handlePreviewUpdate = (updates: Partial<ImageAdjustments>) => {
        const newAdjustments = { ...currentAdjustments, ...updates };
        onAdjustmentsUpdate(newAdjustments);
    };
    
    const handleResetOne = (key: keyof ImageAdjustments) => {
        handlePreviewUpdate({ [key]: defaultAdjustments[key] });
    };

    useEffect(() => {
        if (!selectedLook) return;

        const base = defaultAdjustments; 
        const target = selectedLook.adjustments;
        const intensity = lookIntensity / 100;

        const interpolated: ImageAdjustments = {
            brightness: Math.round(base.brightness + (target.brightness - base.brightness) * intensity),
            contrast: Math.round(base.contrast + (target.contrast - base.contrast) * intensity),
            saturation: Math.round(base.saturation + (target.saturation - base.saturation) * intensity),
            warmth: Math.round(base.warmth + (target.warmth - base.warmth) * intensity),
            vignette: Math.round(base.vignette + (target.vignette - base.vignette) * intensity),
            sharpness: Math.round(base.sharpness + (target.sharpness - base.sharpness) * intensity),
        };
        onAdjustmentsUpdate(interpolated);
    }, [selectedLook, lookIntensity]);

    const handleApplyAndCreate = () => {
        onApplyAdjustments(currentAdjustments);
    };

    const handleMouseEnterLook = (look: Look, event: React.MouseEvent) => {
        setHoveredLook(look);
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({ top: rect.top, left: rect.left + rect.width / 2 });
    };

    const handleMouseLeaveLook = () => {
        setHoveredLook(null);
    };

    const baseImageUrl = imageUrl(slide);

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-base font-bold text-yellow-400 mb-2">Looks (Filtros Rápidos)</h3>
                <div className="grid grid-cols-4 gap-2">
                    {LOOKS.map(look => (
                        <div key={look.id} onMouseEnter={(e) => handleMouseEnterLook(look, e)} onMouseLeave={handleMouseLeaveLook}>
                            <button onClick={() => { setSelectedLook(look); setLookIntensity(100); }} className="text-center group w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg p-0.5">
                                <div className={`w-full h-14 rounded-md bg-cover bg-center border-2 transition-all ${selectedLook?.id === look.id ? 'border-yellow-400' : 'border-transparent group-hover:border-yellow-400/50'}`} style={{ backgroundImage: `url(${baseImageUrl})`, ...lookToCssFilter(look.adjustments) }}>
                                    <div className="w-full h-full rounded-md" style={{ background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,${(look.adjustments.vignette / 100) * 0.8}) 120%)`}}></div>
                                </div>
                                <span className={`text-xs font-semibold mt-1 block transition-colors ${selectedLook?.id === look.id ? 'text-yellow-400' : 'text-gray-300 group-hover:text-yellow-400/80'}`}>{look.name}</span>
                            </button>
                        </div>
                    ))}
                </div>
                {selectedLook && (
                    <div className="mt-3">
                        {/* FIX: Added missing properties to the AdjustmentSlider component. */}
                        <AdjustmentSlider
                            label="Intensidade do Look"
                            value={lookIntensity}
                            onChange={setLookIntensity}
                            onReset={() => setLookIntensity(100)}
                            min={0}
                            max={100}
                            defaultValue={100}
                        />
                    </div>
                )}
            </div>
            {hoveredLook && tooltipPosition && <LookTooltip look={hoveredLook} position={tooltipPosition} />}
            
            <div className="pt-4 border-t border-gray-700/50 space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-yellow-400">Ajustes Manuais</h3>
                    <button onClick={() => onAdjustmentsUpdate(defaultAdjustments)} title="Redefinir Todos os Ajustes" className="flex items-center gap-1 text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                        <UndoIcon className="w-3 h-3" />
                        Redefinir Tudo
                    </button>
                </div>
                <AdjustmentSlider label="Brilho" value={currentAdjustments.brightness} onChange={(v) => handlePreviewUpdate({ brightness: v })} onReset={() => handleResetOne('brightness')} min={-100} max={100} />
                <AdjustmentSlider label="Contraste" value={currentAdjustments.contrast} onChange={(v) => handlePreviewUpdate({ contrast: v })} onReset={() => handleResetOne('contrast')} min={-100} max={100} />
                <AdjustmentSlider label="Saturação" value={currentAdjustments.saturation} onChange={(v) => handlePreviewUpdate({ saturation: v })} onReset={() => handleResetOne('saturation')} min={-100} max={100} />
                <AdjustmentSlider label="Calor (Tons)" value={currentAdjustments.warmth} onChange={(v) => handlePreviewUpdate({ warmth: v })} onReset={() => handleResetOne('warmth')} min={-100} max={100} />
                <AdjustmentSlider label="Vinheta" value={currentAdjustments.vignette} onChange={(v) => handlePreviewUpdate({ vignette: v })} onReset={() => handleResetOne('vignette')} min={0} max={100} />
                <AdjustmentSlider label="Nitidez" value={currentAdjustments.sharpness} onChange={(v) => handlePreviewUpdate({ sharpness: v })} onReset={() => handleResetOne('sharpness')} min={0} max={100} />
            </div>

            <div className="pt-4 border-t border-gray-700/50">
                <button onClick={handleApplyAndCreate} disabled={isActionDisabled} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    Aplicar e Criar Novo Slide
                </button>
            </div>
        </div>
    );
};
