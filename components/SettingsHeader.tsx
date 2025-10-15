// components/SettingsHeader.tsx
import React, { useState } from 'react';
import { ImagePrompt, Option } from '../types';
import { AngleIcon, CameraIcon, FocusIcon, LightingIcon } from './icons';
import { TooltipCard } from './TooltipCard';

interface SettingsHeaderProps {
    prompt: ImagePrompt | null;
    onSectionClick: (sectionId: string) => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ prompt, onSectionClick }) => {
    const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);

    const handleMouseEnter = (option: Option, event: React.MouseEvent<HTMLDivElement>) => {
        setHoveredOption(option);
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({ top: rect.bottom + 10, left: rect.left });
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };

    if (!prompt) {
        return (
            <div className="bg-gray-800/50 rounded-lg p-3 shadow-inner w-full flex items-center justify-center h-[76px]">
                <p className="text-gray-500">Selecione um slide para ver as configurações.</p>
            </div>
        );
    }

    const settings = [
        { id: 'camera', label: 'Câmera e Lente', sectionId: 'camera-control-anchor', icon: <CameraIcon className="w-6 h-6" />, option: prompt.camera },
        { id: 'angle', label: 'Ângulo', sectionId: 'angle-control-anchor', icon: <AngleIcon className="w-6 h-6" />, option: prompt.angle },
        { id: 'lighting', label: 'Iluminação', sectionId: 'lighting-control-anchor', icon: <LightingIcon className="w-6 h-6" />, option: prompt.lighting },
        { id: 'depthOfField', label: 'Profundidade (Foco)', sectionId: 'focus-control-anchor', icon: <FocusIcon className="w-6 h-6" />, option: prompt.depthOfField },
    ];

    return (
        <div className="bg-gray-800/50 rounded-lg p-2 shadow-inner w-full" onMouseLeave={handleMouseLeave}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                 {settings.map(setting => (
                    <div
                        key={setting.id}
                        onMouseEnter={(e) => handleMouseEnter(setting.option, e)}
                    >
                        <button
                            onClick={() => onSectionClick(setting.sectionId)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/60 transition-colors w-full text-left"
                        >
                            <div className="flex-shrink-0 text-yellow-400">{setting.icon}</div>
                            <div className="overflow-hidden">
                                <span className="text-xs text-gray-400 block">{setting.label}</span>
                                <span className="font-semibold text-sm text-gray-200 block truncate">{setting.option.name}</span>
                            </div>
                        </button>
                    </div>
                ))}
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