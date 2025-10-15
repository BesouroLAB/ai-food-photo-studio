// components/PresetTooltipCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { StudioPreset } from '../types';

export interface PresetTooltipCardProps {
    preset: StudioPreset;
    position: { top: number, left: number };
}

export const PresetTooltipCard: React.FC<PresetTooltipCardProps> = ({ preset, position }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [finalPosition, setFinalPosition] = useState(position);

    useEffect(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            let newLeft = position.left;
            let newTop = position.top;
            
            if (position.left + rect.width > window.innerWidth) {
                newLeft = window.innerWidth - rect.width - 20;
            }

            if (position.top + rect.height > window.innerHeight) {
                newTop = window.innerHeight - rect.height - 10;
            }

            setFinalPosition({ top: newTop, left: newLeft });
        }
    }, [position]);

    return (
        <div 
            ref={cardRef}
            className="fixed w-96 p-4 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 z-50 shadow-2xl animate-fade-in-fast"
            style={{ top: finalPosition.top, left: finalPosition.left, pointerEvents: 'none' }}
        >
            <h4 className="font-bold mb-2 text-lg text-yellow-400">{preset.name}</h4>
            
            {/* Dica Prática */}
            <div className="mb-3 pb-3 border-b border-gray-700">
                <p className="text-gray-200 mb-2">{preset.description}</p>
                <strong className="text-xs text-gray-400 uppercase">Exemplos:</strong>
                <p className="text-sm text-gray-300 leading-tight mt-1">{preset.examples.join(', ')}</p>
            </div>

            {/* Sugestão Técnica (Preset) */}
            <div>
                <h5 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Sugestão Técnica (Preset)</h5>
                <ul className="text-sm text-blue-200/90 space-y-1">
                    <li><strong className="text-blue-300">Câmera:</strong> {preset.preset.cameraName}</li>
                    <li><strong className="text-blue-300">Iluminação:</strong> {preset.preset.lightingName}</li>
                    <li><strong className="text-blue-300">Foco:</strong> {preset.preset.depthOfFieldName}</li>
                    <li><strong className="text-blue-300">Ângulo:</strong> {preset.preset.angle}</li>
                </ul>
            </div>
        </div>
    );
};
