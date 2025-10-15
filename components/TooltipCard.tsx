// components/TooltipCard.tsx
import React, { useState, useRef, useEffect } from 'react';

export interface TooltipCardProps {
    name: string;
    shortInfo: string;
    technicalInfo: string;
    position: { top: number, left: number };
    keywords?: string[];
}

export const TooltipCard: React.FC<TooltipCardProps> = ({ name, shortInfo, technicalInfo, position, keywords }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [finalPosition, setFinalPosition] = useState(position);

    useEffect(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            let newLeft = position.left;
            let newTop = position.top;
            
            // Adjust if it goes off-screen to the right
            if (position.left + rect.width > window.innerWidth) {
                newLeft = window.innerWidth - rect.width - 20; // Adjust with some padding
            }

            // Adjust if it goes off-screen to the bottom
            if (position.top + rect.height > window.innerHeight) {
                newTop = window.innerHeight - rect.height - 10;
            }

            setFinalPosition({ top: newTop, left: newLeft });
        }
    }, [position]);

    return (
        <div 
            ref={cardRef}
            className="fixed w-80 p-4 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 z-50 shadow-2xl animate-fade-in-fast"
            style={{ top: finalPosition.top, left: finalPosition.left, pointerEvents: 'none' }}
        >
            <h4 className="font-bold mb-3 text-base text-yellow-400">{name}</h4>
            
            {/* Dica Rápida */}
            <div className="mb-3">
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Dica Rápida</h5>
                <p className="text-gray-200">{shortInfo}</p>
            </div>

            {/* Info Técnica */}
            {technicalInfo && (
                <div className="pt-3 border-t border-gray-700">
                    <h5 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Info Técnica</h5>
                    <p className="text-blue-200/90 text-sm">{technicalInfo}</p>
                </div>
            )}

            {/* AI Keywords */}
            {keywords && keywords.length > 0 && (
                <div className="pt-3 border-t border-gray-700 mt-3">
                    <h5 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Keywords para IA</h5>
                    <div className="flex flex-wrap gap-1.5">
                        {keywords.map((keyword) => (
                            <span key={keyword} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};