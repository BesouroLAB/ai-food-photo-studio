// components/CameraSelector.tsx
import React, { useState, useRef } from 'react';
import { Option, TechnicalDetails, AIAction } from '../types';
import { TooltipCard } from './TooltipCard';
import { InfoIcon } from './icons';

interface CameraSelectorProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    onShowDetails: (option: Option) => void;
    pendingSuggestion?: AIAction | null;
}

export const CameraSelector: React.FC<CameraSelectorProps> = ({ label, value, options, onChange, onShowDetails, pendingSuggestion }) => {
    const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        setHoveredOption(option);
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            setTooltipPosition({ top: containerRect.top, left: containerRect.right + 15 });
        }
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };

    return (
        <div className="mb-4" ref={containerRef} onMouseLeave={handleMouseLeave}>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="grid grid-cols-3 gap-2">
                {options.map(camera => {
                    const isSelected = value === camera.name;
                    const isSuggested = pendingSuggestion?.payload.setting === 'camera' && pendingSuggestion?.payload.value === camera.name;
                    
                    return (
                        <button
                            key={camera.name}
                            onClick={() => onChange(camera.name)}
                            onMouseEnter={(e) => handleMouseEnter(camera, e)}
                            className={`group p-2 h-20 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-all text-xs font-semibold relative
                            ${isSelected ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 text-gray-300'}
                            ${isSuggested && !isSelected ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-gray-800 animate-pulse' : ''}
                            `}
                        >
                            <span>{camera.name}</span>
                            <div
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onShowDetails(camera);
                                }}
                            >
                                <InfoIcon className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                            </div>
                        </button>
                    );
                })}
            </div>
             {hoveredOption && tooltipPosition && (
                 <TooltipCard 
                    name={hoveredOption.name}
                    shortInfo={hoveredOption.short_info}
                    technicalInfo={hoveredOption.technical_details.description}
                    position={tooltipPosition}
                    keywords={hoveredOption.keywords}
                />
            )}
        </div>
    );
};