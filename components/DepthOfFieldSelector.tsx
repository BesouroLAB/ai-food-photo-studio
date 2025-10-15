// components/DepthOfFieldSelector.tsx
import React, { useState, useRef } from 'react';
import { Option, TechnicalDetails, AIAction } from '../types';
import { TooltipCard } from './TooltipCard';
import { InfoIcon } from './icons';

interface DepthOfFieldSelectorProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    onShowDetails: (option: Option) => void;
    disabled?: boolean;
    disabledTooltip?: string;
    pendingSuggestion?: AIAction | null;
}

export const DepthOfFieldSelector: React.FC<DepthOfFieldSelectorProps> = ({ label, value, options, onChange, onShowDetails, disabled, disabledTooltip, pendingSuggestion }) => {
    const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (option: Option) => {
        if (disabled) return;
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
            <label id="focus-control-anchor" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                {label}
                {disabled && disabledTooltip && (
                    <div className="relative group ml-2">
                         <InfoIcon className="text-gray-500" />
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                            {disabledTooltip}
                         </div>
                    </div>
                )}
            </label>
            <div className={`grid grid-cols-3 gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {options.map(dof => {
                    const Icon = dof.icon;
                    const isSelected = value === dof.name;
                    const isSuggested = pendingSuggestion?.payload.setting === 'depthOfField' && pendingSuggestion?.payload.value === dof.name;
                    
                    return (
                        <button
                            key={dof.name}
                            onClick={() => !disabled && onChange(dof.name)}
                            onMouseEnter={() => handleMouseEnter(dof)}
                            disabled={disabled}
                            className={`group relative bg-gray-800/50 hover:bg-gray-700/50 h-24 w-full rounded-lg border-2 transition-all flex flex-col items-center justify-center p-1 text-center
                            ${isSelected ? 'border-yellow-500 text-yellow-300' : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-white'}
                            ${isSuggested && !isSelected ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-gray-800 animate-pulse' : ''}`}
                        >
                           {Icon && <Icon className="h-10 w-10 mb-1" />}
                           <span className="text-xs text-center font-semibold">{dof.name}</span>
                             <div
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if(!disabled) onShowDetails(dof);
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