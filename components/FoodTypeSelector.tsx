// components/FoodTypeSelector.tsx
import React, { useState, useRef } from 'react';
import { StudioPreset } from '../types';
import { PresetTooltipCard } from './FoodTypeTooltipCard';

interface PresetSelectorGridProps {
    presets: StudioPreset[];
    onSelectPreset: (preset: StudioPreset) => void;
    selectedPresetName: string | null;
}

export const PresetSelectorGrid: React.FC<PresetSelectorGridProps> = ({ presets, onSelectPreset, selectedPresetName }) => {
    const [hoveredPreset, setHoveredPreset] = useState<StudioPreset | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (preset: StudioPreset, event: React.MouseEvent<HTMLButtonElement>) => {
        setHoveredPreset(preset);
        const rect = event.currentTarget.getBoundingClientRect();
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
             // Position tooltip to the right of the entire grid container
            setTooltipPosition({ top: containerRect.top, left: containerRect.right + 15 });
        }
    };

    const handleMouseLeave = () => {
        setHoveredPreset(null);
    };

    return (
        <div ref={containerRef} onMouseLeave={handleMouseLeave}>
            <div className="grid grid-cols-4 gap-2">
                {presets.map(preset => {
                     const Icon = preset.icon;
                     return (
                        <button
                            key={preset.name}
                            onClick={() => onSelectPreset(preset)}
                            onMouseEnter={(e) => handleMouseEnter(preset, e)}
                            className={`group relative bg-gray-800/50 hover:bg-gray-700/50 h-24 w-full rounded-lg border-2 transition-all flex flex-col items-center justify-center p-1 text-center
                            ${selectedPresetName === preset.name ? 'border-yellow-500 text-yellow-300' : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                        >
                            <Icon className="h-8 w-8 mb-1" />
                            <span className="text-xs text-center font-semibold">{preset.name}</span>
                        </button>
                    );
                })}
            </div>
            {hoveredPreset && tooltipPosition && (
                <PresetTooltipCard preset={hoveredPreset} position={tooltipPosition} />
            )}
        </div>
    );
};