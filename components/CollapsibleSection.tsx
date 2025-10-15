import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-700/50">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-200 hover:bg-gray-700/50"
            >
                <span className="text-base">{title}</span>
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {isOpen && (
                <div className="p-3 bg-gray-900/30">
                    {children}
                </div>
            )}
        </div>
    );
};