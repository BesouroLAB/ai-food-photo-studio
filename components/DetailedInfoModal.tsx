// components/DetailedInfoModal.tsx
import React from 'react';
import { Option } from '../types';

interface DetailedInfoModalProps {
    option: Option;
    onClose: () => void;
}

export const DetailedInfoModal: React.FC<DetailedInfoModalProps> = ({ option, onClose }) => {
    const { technical_details, keywords } = option;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in-fast" 
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 border border-gray-600 rounded-lg max-w-2xl w-full p-6 shadow-2xl relative" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">{technical_details.title}</h3>
                <div className="space-y-6 text-gray-300 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                    
                    {/* Technical Info */}
                    <div>
                        <h4 className="font-semibold text-lg text-blue-400 mb-2 border-b border-blue-500/30 pb-1">O que é? (Info Técnica)</h4>
                        <p className="text-base text-blue-200/90 leading-relaxed mt-2">{technical_details.description}</p>
                    </div>

                    {/* AI Keywords */}
                    <div>
                        <h4 className="font-semibold text-lg text-green-400 mb-2 border-b border-green-500/30 pb-1">Keywords para IA</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {keywords.map((keyword) => (
                                <span key={keyword} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Practical Info */}
                    <div>
                        <h4 className="font-semibold text-lg text-gray-100 mb-2 border-b border-gray-700 pb-1">Dicas Práticas</h4>
                        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2 text-sm">
                            {technical_details.pro_tips.map((tip, index) => (
                                <li key={index} className="pl-2">{tip}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};