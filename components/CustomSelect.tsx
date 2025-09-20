--- START OF FILE components/CustomSelect.tsx ---

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Option, TooltipInfo } from '../types';
import { ChevronDownIcon, InfoIcon } from './icons';

interface CustomSelectProps {
    label: string;
    value: string;
    options: (Option | string)[];
    onChange: (value: string) => void;
    disabled?: boolean;
    disabledTooltip?: string;
}

const isOptionObject = (option: any): option is Option => {
    return typeof option === 'object' && option !== null && 'name' in option;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, disabled = false, disabledTooltip }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

    const handleToggle = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleMouseEnterOption = (option: Option, index: number) => {
        setHoveredOption(option);
        const optionElement = optionsRef.current[index];
        if (optionElement) {
            const rect = optionElement.getBoundingClientRect();
            // Position tooltip to the right of the option
            setTooltipPosition({ top: rect.top, left: rect.right + 10 });
        }
    };
    
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const selectedOptionDisplay = options.find(opt => (isOptionObject(opt) ? opt.name : opt) === value) ?? value;
    const displayName = isOptionObject(selectedOptionDisplay) ? selectedOptionDisplay.name : selectedOptionDisplay;

    return (
        <div className="mb-4" ref={wrapperRef}>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
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
            <div className="relative">
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={disabled}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 flex justify-between items-center focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                    <span className="truncate">{displayName}</span>
                    <ChevronDownIcon className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <ul 
                        className="absolute w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto"
                        onMouseLeave={() => setHoveredOption(null)}
                    >
                        {options.map((opt, index) => {
                            const optionValue = isOptionObject(opt) ? opt.name : opt;
                            const optionLabel = optionValue;
                            return (
                                <li
                                    key={optionValue}
                                    ref={el => { optionsRef.current[index] = el; }}
                                    onClick={() => handleSelect(optionValue)}
                                    onMouseEnter={() => isOptionObject(opt) && handleMouseEnterOption(opt, index)}
                                    className="px-3 py-2 text-white hover:bg-yellow-500 hover:text-gray-900 cursor-pointer transition-colors text-sm"
                                >
                                    {optionLabel}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {hoveredOption && tooltipPosition && (
                 <TooltipCard tooltip={hoveredOption.tooltip} position={tooltipPosition} name={hoveredOption.name} />
            )}
        </div>
    );
};

interface TooltipCardProps {
    tooltip: TooltipInfo;
    position: { top: number, left: number };
    name: string;
}

const TooltipCard: React.FC<TooltipCardProps> = ({ tooltip, position, name }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [finalPosition, setFinalPosition] = useState(position);

    useEffect(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            let newLeft = position.left;
            // Adjust if it goes off-screen to the right
            if (position.left + rect.width > window.innerWidth) {
                newLeft = window.innerWidth - rect.width - 20; // Adjust with some padding
            }
            setFinalPosition({ top: position.top, left: newLeft });
        }
    }, [position]);

    return (
        <div 
            ref={cardRef}
            className="fixed w-96 p-4 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 z-50 shadow-2xl animate-fade-in-fast"
            style={{ top: finalPosition.top, left: finalPosition.left, pointerEvents: 'none' }}
        >
            <h4 className="font-bold mb-3 text-lg text-yellow-400">{name}</h4>
            <p className="mb-2"><strong className="text-gray-100 font-semibold">Benefícios:</strong> {tooltip.benefits}</p>
            <p className="mb-2"><strong className="text-green-400">Prós:</strong> {tooltip.pros}</p>
            <p className="mb-2"><strong className="text-red-400">Contras:</strong> {tooltip.cons}</p>
            <p><strong className="text-blue-400">Ideal para:</strong> {tooltip.recommended_food}</p>
        </div>
    );
};