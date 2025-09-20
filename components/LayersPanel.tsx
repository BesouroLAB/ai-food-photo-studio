import React, { useState } from 'react';
import { Slide, Element } from '../types';
import { DownloadIcon } from './icons';

interface LayersPanelProps {
    slides: Slide[];
    selectedSlide: Slide | null;
    selectedSlideId: string | null;
    onSelectSlide: (slideId: string) => void;
    onAddSlide: () => void;
    onDeleteSlide: (slideId: string) => void;
    onRefineOrEdit: (mode: 'refine' | 'edit', prompt: string) => void;
    onDownload: () => void;
    isActionDisabled: boolean;
    elements: Element[];
    onAddElement: () => void;
    onDeleteElement: (elementId: string) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string | null) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
    slides, selectedSlideId, onSelectSlide, onAddSlide, onDeleteSlide, 
    onRefineOrEdit, onDownload, isActionDisabled,
    elements, onAddElement, onDeleteElement, selectedElementId, onSelectElement
}) => {
    
    const [refinePrompt, setRefinePrompt] = useState('');

    const handleRefine = () => {
        onRefineOrEdit('refine', refinePrompt);
        setRefinePrompt('');
    };

    const handleEdit = () => {
        onRefineOrEdit('edit', refinePrompt);
        setRefinePrompt('');
    };

    return (
        <div className="flex flex-col h-full text-sm">
            {/* Projetos Section */}
            <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                <h2 className="text-lg font-bold text-yellow-400">Projetos</h2>
                <button 
                    onClick={onAddSlide}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors"
                >
                    + Novo
                </button>
            </div>
            <div className="space-y-2 mb-4 overflow-y-auto flex-shrink-0" style={{ maxHeight: '25%' }}>
                {slides.map((slide, index) => (
                    <div key={slide.id} className={`border rounded-lg transition-colors ${selectedSlideId === slide.id ? 'border-yellow-500 bg-gray-700/50' : 'border-gray-600 bg-gray-700/20 hover:bg-gray-700/40'}`}>
                        <div className="p-2 flex justify-between items-center cursor-pointer" onClick={() => onSelectSlide(slide.id)}>
                            <span className="font-semibold truncate">Projeto {index + 1}</span>
                             <button onClick={(e) => { e.stopPropagation(); onDeleteSlide(slide.id); }} className="text-red-500 hover:text-red-400 disabled:text-gray-600" title="Deletar Projeto" disabled={slides.length <= 1}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Elementos Section */}
            <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                <h2 className="text-lg font-bold text-yellow-400">Elementos</h2>
                <button onClick={onAddElement} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors">+ Texto</button>
            </div>
            <div className="space-y-2 mb-4 overflow-y-auto flex-shrink-0" style={{ maxHeight: '25%' }}>
                {elements.length === 0 && <p className="text-gray-500 text-center py-2">Nenhum elemento adicionado.</p>}
                {elements.map((element, index) => (
                    <div key={element.id} className={`border rounded-lg transition-colors ${selectedElementId === element.id ? 'border-yellow-500 bg-gray-700/50' : 'border-gray-600 bg-gray-700/20 hover:bg-gray-700/40'}`}>
                        <div className="p-2 flex justify-between items-center cursor-pointer" onClick={() => onSelectElement(element.id)}>
                            <span className="font-semibold truncate">Texto {index + 1}</span>
                             <button onClick={(e) => { e.stopPropagation(); onDeleteElement(element.id); }} className="text-red-500 hover:text-red-400" title="Deletar Elemento">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Refinamento Section */}
            <div className="flex-grow flex flex-col border-t border-gray-700 pt-2">
                 <h2 className="text-lg font-bold text-yellow-400 mb-2">Refinamento Contínuo</h2>
                 <div className="flex flex-col flex-grow">
                     <label htmlFor="refine-prompt" className="block text-sm font-medium text-gray-300 mb-1">Instruções de Edição</label>
                     <textarea
                         id="refine-prompt"
                         rows={3}
                         className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition disabled:bg-gray-800 disabled:text-gray-500"
                         value={refinePrompt}
                         onChange={(e) => setRefinePrompt(e.target.value)}
                         placeholder={isActionDisabled ? "Gere uma imagem primeiro para poder refinar." : "Ex: Adicione vapor. Mude o fundo."}
                         disabled={isActionDisabled}
                     />
                     <div className="mt-2 space-y-2">
                         <button onClick={handleRefine} disabled={isActionDisabled || !refinePrompt} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Refinar Imagem</button>
                         <button onClick={handleEdit} disabled={isActionDisabled || !refinePrompt} className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Editar Cena</button>
                     </div>
                 </div>
                 <div className="mt-auto pt-2 border-t border-gray-700/50">
                    <button onClick={onDownload} disabled={isActionDisabled} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
                        <DownloadIcon className="w-5 h-5" />
                        Baixar
                    </button>
                 </div>
            </div>
        </div>
    );
};