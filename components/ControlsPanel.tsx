import React from 'react';
import { CollapsibleSection } from './CollapsibleSection';
import { CustomSelect } from './CustomSelect';
import { CAMERAS, CAMERA_ANGLES, DEPTHS_OF_FIELD, LIGHTING_STYLES } from '../constants';
import { Option, ImagePrompt, Slide } from '../types';

interface ControlsPanelProps {
    slide: Slide | null;
    onUpdatePrompt: (prompt: ImagePrompt) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const findOptionByName = (options: Option[], name: string): Option => {
    return options.find(o => o.name === name) || options[0];
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ slide, onUpdatePrompt, onGenerate, isGenerating }) => {
    
    if (!slide) {
        return (
            <div className="flex flex-col h-full text-sm justify-center items-center text-gray-400">
                Selecione ou crie um projeto para começar.
            </div>
        );
    }
    
    const { prompt, workMode, originalImage } = slide;

    const handlePromptChange = (updates: Partial<ImagePrompt>) => {
        onUpdatePrompt({ ...prompt, ...updates });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate();
    };
    
    const isGenerationDisabled = isGenerating || !prompt.subject || (!!originalImage && !workMode);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full text-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                 <h2 className="text-lg font-bold text-yellow-400">Controles Criativos</h2>
            </div>

            <div className="overflow-y-auto flex-grow pr-2 -mr-2">
                <CollapsibleSection title="1. Descrição da Cena" defaultOpen={true}>
                    <label htmlFor="subject-prompt" className="block text-sm font-medium text-gray-300 mb-1">
                        Prato / Assunto Principal
                    </label>
                     <textarea
                        id="subject-prompt"
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        value={prompt.subject}
                        onChange={(e) => handlePromptChange({ subject: e.target.value })}
                        placeholder="Ex: um delicioso prato de macarrão à carbonara"
                    />
                     <label htmlFor="style-prompt" className="block text-sm font-medium text-gray-300 mt-3 mb-1">
                        Cenário e Estilo
                    </label>
                     <textarea
                        id="style-prompt"
                        rows={2}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        value={prompt.style}
                        onChange={(e) => handlePromptChange({ style: e.target.value })}
                        placeholder="Ex: em uma mesa de mármore branco, com um garfo ao lado"
                    />
                </CollapsibleSection>

                <CollapsibleSection title="2. Câmera e Lente" defaultOpen={true}>
                    <CustomSelect
                        label="Câmera"
                        value={prompt.camera.name}
                        options={CAMERAS}
                        onChange={(val) => handlePromptChange({ camera: findOptionByName(CAMERAS, val) })}
                    />
                    <CustomSelect
                        label="Profundidade de Campo (Bokeh)"
                        value={prompt.depthOfField.name}
                        options={DEPTHS_OF_FIELD}
                        onChange={(val) => handlePromptChange({ depthOfField: findOptionByName(DEPTHS_OF_FIELD, val) })}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="3. Composição e Iluminação">
                    <CustomSelect
                        label="Ângulo da Câmera"
                        value={prompt.angle}
                        options={CAMERA_ANGLES}
                        onChange={(val) => handlePromptChange({ angle: val })}
                        disabled={workMode === 'retoucher'}
                        disabledTooltip="O ângulo não pode ser alterado no modo 'Alterar detalhes'."
                    />
                    <CustomSelect
                        label="Estilo de Iluminação"
                        value={prompt.lighting.name}
                        options={LIGHTING_STYLES}
                        onChange={(val) => handlePromptChange({ lighting: findOptionByName(LIGHTING_STYLES, val) })}
                        disabled={workMode === 'editor'}
                        disabledTooltip="A iluminação não pode ser alterada no modo 'Editor'."
                    />
                </CollapsibleSection>

                 <CollapsibleSection title="4. Detalhes Finais">
                     <label htmlFor="extra-details-prompt" className="block text-sm font-medium text-gray-300 mb-1">
                        Palavras-chave Adicionais
                    </label>
                     <textarea
                        id="extra-details-prompt"
                        rows={2}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        value={prompt.extraDetails}
                        onChange={(e) => handlePromptChange({ extraDetails: e.target.value })}
                        placeholder="Ex: ultra-realistic, cinematic, vivid colors"
                    />
                </CollapsibleSection>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-700/50">
                <button
                    type="submit"
                    disabled={isGenerationDisabled}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                >
                    {isGenerating ? 'Gerando...' : 'Gerar Cena'}
                </button>
            </div>
        </form>
    );
};