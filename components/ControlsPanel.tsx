// components/ControlsPanel.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Slide, ImagePrompt, StudioPreset, TechnicalDetails, ImageObject, AIAction, ReferenceObject, Option } from '../types';
import { ASPECT_RATIOS } from '../constants/index';
import { CollapsibleSection } from './CollapsibleSection';
import { CameraSelector } from './CameraSelector';
import { SquareIcon, PortraitIcon, StoriesIcon, LandscapeIcon, InfoIcon, SparklesIcon, UndoIcon, JsonIcon, ClipboardIcon } from './icons';
import { PresetSelectorGrid } from './FoodTypeSelector';
import { AngleSelector } from './AngleSelector';
import { DepthOfFieldSelector } from './DepthOfFieldSelector';
import { LightingSelector } from './LightingSelector';
import { DetailedInfoModal } from './DetailedInfoModal';
import { ReferenceObjectManager } from './ReferenceObjectManager';

interface StudioConfig {
    presets: StudioPreset[];
    cameras: Option[];
    angles: Option[];
    depthsOfField: Option[];
    lightingStyles: Option[];
}

interface ControlsPanelProps {
    slide: Slide | null;
    onPromptUpdate: (field: keyof ImagePrompt, value: any) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    onSetWorkMode: (workMode: 'creator' | 'retoucher' | 'editor' | 'isolate') => void;
    onSelectPreset: (preset: StudioPreset) => void;
    selectedPresetName: string | null;
    scrollCommand: { targetId: string | null; key: number };
    onAddReferenceObject: (image: ImageObject) => void;
    onUpdateReferenceObject: (id: string, updates: Partial<ReferenceObject>) => void;
    onDeleteReferenceObject: (id: string) => void;
    pendingSuggestion: AIAction | null;
    onConfirmSuggestion: () => void;
    onCancelSuggestion: () => void;
    onGenerateStyles: () => void;
    isGeneratingStyles: boolean;
    styleSuggestions: string[];
    onGenerateJson: () => void;
    isGeneratingJson: boolean;
    studioConfig: StudioConfig;
    onResetStudio: () => void;
    harmonizedPositiveKeywords: string[];
    finalPromptForIA: string;
    onFinalPromptChange: (newPrompt: string) => void;
}

const AspectRatioIcon = ({ ratio, className }: { ratio: string, className?: string }) => {
    switch (ratio) {
        case '1:1': return <SquareIcon className={className} />;
        case '3:4': return <PortraitIcon className={className} />;
        case '9:16': return <StoriesIcon className={className} />;
        case '16:9': return <LandscapeIcon className={className} />;
        default: return null;
    }
};

const workModeTooltips = {
    creator: "Gere uma imagem totalmente nova a partir de texto e das configurações do estúdio.",
    retoucher: "Envie sua foto. A IA manterá seu prato 100% original e criará um novo cenário profissional ao redor.",
    editor: "Envie sua foto. A IA irá recriar a cena inteira, incluindo o prato, com base na sua foto e nas configurações.",
    isolate: "Pinte sobre seu prato para garantir que ele permaneça 100% inalterado. A IA criará um novo cenário apenas ao redor da área protegida. Ideal para máxima fidelidade ao produto."
};

const aspectRatioTooltips: { [key: string]: string } = {
    '1:1': 'Formato quadrado, ideal para o feed do Instagram e cardápios.',
    '3:4': 'Formato vertical, bom para posts no Instagram e Pinterest.',
    '9:16': 'Formato vertical alto, perfeito para Stories, Reels e TikTok.',
    '16:9': 'Formato horizontal (widescreen), ideal para banners de sites e YouTube.'
};

const settingLabels = {
    camera: 'Câmera',
    angle: 'Ângulo',
    depthOfField: 'Foco',
    lighting: 'Iluminação',
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
    slide,
    onPromptUpdate,
    onGenerate,
    isGenerating,
    onSetWorkMode,
    onSelectPreset,
    selectedPresetName,
    scrollCommand,
    onAddReferenceObject,
    onUpdateReferenceObject,
    onDeleteReferenceObject,
    pendingSuggestion,
    onConfirmSuggestion,
    onCancelSuggestion,
    onGenerateStyles,
    isGeneratingStyles,
    styleSuggestions,
    onGenerateJson,
    isGeneratingJson,
    studioConfig,
    onResetStudio,
    harmonizedPositiveKeywords,
    finalPromptForIA,
    onFinalPromptChange,
}) => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        presets: true,
        camera: true,
        lighting: true,
        reference: true,
    });
    const [isStyleHelpModalOpen, setIsStyleHelpModalOpen] = useState(false);
    const [detailedInfo, setDetailedInfo] = useState<Option | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    
    const panelRef = useRef<HTMLDivElement>(null);

    const isPromptReady = !finalPromptForIA.startsWith("Ajuste as configurações");

    useEffect(() => {
        if (scrollCommand.targetId && panelRef.current) {
            const element = document.getElementById(scrollCommand.targetId);
            if (element) {
                // Determine which section the element is in and open it
                if (scrollCommand.targetId.includes('camera') || scrollCommand.targetId.includes('angle')) {
                    setOpenSections(prev => ({ ...prev, camera: true }));
                }
                if (scrollCommand.targetId.includes('focus') || scrollCommand.targetId.includes('lighting')) {
                    setOpenSections(prev => ({ ...prev, lighting: true }));
                }

                // Use a short timeout to allow the section to open before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100); 
            }
        }
    }, [scrollCommand]);
    
    const handleToggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };
    
    const handleShowDetails = (option: Option) => {
        setDetailedInfo(option);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(finalPromptForIA);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onPromptUpdate('style', suggestion);
    };

    if (!slide || !slide.prompt) {
        return <div className="text-center text-gray-500">Selecione um slide para começar.</div>;
    }
    
    const { prompt, workMode } = slide;
    const aiNegativeKeywords = prompt.negativeKeywords || [];

    const isRetoucherMode = workMode === 'retoucher';
    const isRegenerateMode = !!slide.generatedImage;
    const hasOriginalImage = !!slide.originalImage;
    
    const workModes: { key: 'creator' | 'editor' | 'retoucher' | 'isolate'; label: string }[] = [
        { key: 'creator', label: 'Criar' },
        { key: 'editor', label: 'Editar' },
        { key: 'retoucher', label: 'Retocar' },
        { key: 'isolate', label: 'Isolar Produto' },
    ];
    
    return (
        <div className="flex flex-col h-full overflow-hidden">
             <div className="flex-shrink-0 mb-4">
                <button
                    onClick={onResetStudio}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg py-2 transition-colors"
                    title="Voltar para a seleção de estúdio"
                >
                    <UndoIcon className="w-4 h-4" />
                    <span>Mudar Estúdio</span>
                </button>
            </div>
            <div ref={panelRef} className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4">

                {/* Modo de Trabalho */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Modo de Trabalho</label>
                     <div className="grid grid-cols-2 gap-2">
                        {workModes.map(modeInfo => {
                            const isImageRequired = modeInfo.key !== 'creator';
                            const isDisabled = isImageRequired && !hasOriginalImage;
                            return (
                                <div key={modeInfo.key} className="relative group">
                                    <button
                                        onClick={() => onSetWorkMode(modeInfo.key)}
                                        disabled={isDisabled}
                                        className={`p-2 h-12 w-full flex items-center justify-center text-center rounded-lg border-2 transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed
                                        ${workMode === modeInfo.key ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 text-gray-300 disabled:hover:border-gray-600'}
                                        `}
                                    >
                                        {modeInfo.label}
                                    </button>
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg`}>
                                        {isDisabled ? "Este modo requer o envio de uma imagem primeiro." : workModeTooltips[modeInfo.key]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <CollapsibleSection title="Objetos de Referência" isOpen={openSections.reference} onToggle={() => handleToggleSection('reference')}>
                    <ReferenceObjectManager
                        referenceObjects={slide.referenceObjects || []}
                        onAdd={onAddReferenceObject}
                        onUpdate={onUpdateReferenceObject}
                        onDelete={onDeleteReferenceObject}
                    />
                </CollapsibleSection>

                <CollapsibleSection title="Presets" isOpen={openSections.presets} onToggle={() => handleToggleSection('presets')}>
                    <PresetSelectorGrid
                        presets={studioConfig.presets}
                        onSelectPreset={onSelectPreset}
                        selectedPresetName={selectedPresetName}
                    />
                </CollapsibleSection>
                
                <div className="space-y-4 pt-4 border-t border-gray-700/50">
                     <div>
                        <label htmlFor="subject-input" className="block text-sm font-medium text-gray-300 mb-1">
                            Objeto Principal
                        </label>
                        <input
                            type="text"
                            id="subject-input"
                            value={prompt.subject}
                            onChange={(e) => onPromptUpdate('subject', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition font-mono text-xs"
                            placeholder="Ex: bolo de chocolate, anel de diamante..."
                        />
                    </div>
                </div>

                <CollapsibleSection title="Configurações da Câmera" isOpen={openSections.camera} onToggle={() => handleToggleSection('camera')}>
                     <div id="camera-control-anchor" className="mb-4">
                        <CameraSelector
                            label="Câmera e Lente"
                            value={prompt.camera.name}
                            options={studioConfig.cameras}
                            onChange={(val) => onPromptUpdate('camera', studioConfig.cameras.find(c => c.name === val))}
                            onShowDetails={handleShowDetails}
                            pendingSuggestion={pendingSuggestion}
                        />
                    </div>
                    <div id="angle-control-anchor" className="mb-4">
                        <AngleSelector
                            label="Ângulo"
                            value={prompt.angle.name}
                            options={studioConfig.angles}
                            onChange={(val) => onPromptUpdate('angle', studioConfig.angles.find(a => a.name === val))}
                            disabled={isRetoucherMode && !isRegenerateMode}
                            disabledTooltip="O ângulo é preservado no modo Retocar. Para alterar, use o modo 'Regerar' após a primeira geração."
                            onShowDetails={handleShowDetails}
                            pendingSuggestion={pendingSuggestion}
                        />
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Iluminação e Foco" isOpen={openSections.lighting} onToggle={() => handleToggleSection('lighting')}>
                     <DepthOfFieldSelector
                        label="Profundidade de Campo (Foco)"
                        value={prompt.depthOfField.name}
                        options={studioConfig.depthsOfField}
                        onChange={(val) => onPromptUpdate('depthOfField', studioConfig.depthsOfField.find(d => d.name === val))}
                        onShowDetails={handleShowDetails}
                        pendingSuggestion={pendingSuggestion}
                    />
                    <LightingSelector
                        label="Estilo de Iluminação"
                        value={prompt.lighting.name}
                        options={studioConfig.lightingStyles}
                        onChange={(val) => onPromptUpdate('lighting', studioConfig.lightingStyles.find(l => l.name === val))}
                        onShowDetails={handleShowDetails}
                        pendingSuggestion={pendingSuggestion}
                    />
                </CollapsibleSection>
                
                {/* Detalhes da Geração */}
                <div className="space-y-4 pt-4 border-t border-gray-700/50">
                     <div id="style-prompt-anchor">
                        <label htmlFor="style-prompt" className="flex items-center justify-between text-sm font-medium text-gray-300 mb-1">
                            <div className="flex items-center">
                                Estilo do Cenário
                                <button onClick={() => setIsStyleHelpModalOpen(true)} className="ml-2 text-gray-400 hover:text-yellow-400" title="Dicas de como usar">
                                    <InfoIcon className="h-4 w-4" />
                                </button>
                            </div>
                             <div className="relative group">
                                <button onClick={onGenerateStyles} disabled={isGeneratingStyles || isGenerating || !slide.presetName} className="flex items-center gap-1.5 p-1.5 text-yellow-400 hover:text-yellow-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors" title="Gerar Estilos com IA">
                                    {isGeneratingStyles ? <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-yellow-400 rounded-full"></span> : <SparklesIcon className="h-4 w-4" />}
                                    <span className="text-xs font-semibold">Gerar Estilos</span>
                                </button>
                                 {!slide.presetName && (
                                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-gray-900 border border-gray-600 rounded-lg text-xs text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                                        Selecione um Preset primeiro para ativar o gerador de estilos.
                                    </div>
                                 )}
                            </div>
                        </label>
                        <textarea
                            id="style-prompt"
                            rows={4}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition font-mono text-xs"
                            value={prompt.style}
                            onChange={(e) => onPromptUpdate('style', e.target.value)}
                            placeholder="Ex: em uma mesa de madeira rústica, com frutas vermelhas espalhadas..."
                        />
                        {styleSuggestions.length > 0 && (
                            <div className="mt-2 space-y-1 animate-fade-in-fast">
                                {styleSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-md p-2 text-xs text-gray-300 transition-colors"
                                    >
                                        "{suggestion}"
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Keywords Adicionais da IA (Automático)</label>
                        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-2 min-h-[60px] flex flex-wrap gap-2">
                            {harmonizedPositiveKeywords.map(keyword => (
                                <span key={keyword} className="bg-gray-600 text-gray-200 text-sm font-medium px-2 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Prompt Negativo (Automático)</label>
                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-2 min-h-[60px] flex flex-wrap gap-2">
                            {aiNegativeKeywords.map(keyword => (
                                <span key={keyword} className="bg-red-500/20 text-red-300 text-sm font-medium px-2 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                     </div>
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            Número de Imagens
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {([1, 2, 4] as const).map(num => (
                                <button
                                    key={num}
                                    onClick={() => onPromptUpdate('numberOfImages', num)}
                                    className={`p-2 h-12 flex items-center justify-center text-center rounded-lg border-2 transition-all text-xl font-bold ${prompt.numberOfImages === num ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 text-gray-300'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            Proporção (Aspect Ratio)
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {ASPECT_RATIOS.map(ar => (
                                <div key={ar.value} className="relative group">
                                    <button
                                        onClick={() => onPromptUpdate('aspectRatio', ar.value)}
                                        className={`w-full p-2 h-12 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-all ${prompt.aspectRatio === ar.value ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 text-gray-300'}`}
                                    >
                                        <AspectRatioIcon ratio={ar.value} className="w-5 h-5 mb-1" />
                                        <span className="text-xs">{ar.label}</span>
                                    </button>
                                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 border border-gray-600 rounded-lg text-xs text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                                        {aspectRatioTooltips[ar.value]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Final Prompt Display */}
                    <div className="relative pt-4 border-t border-gray-700/50">
                        <label htmlFor="final-prompt-ia" className="text-sm font-medium text-gray-300 mb-1 block">Prompt Final para IA (Automático)</label>
                         <textarea
                            id="final-prompt-ia"
                            rows={6}
                            readOnly
                            className="w-full bg-gray-900/50 border border-gray-600 text-gray-400 rounded-md p-2 font-mono text-xs focus:ring-1 focus:ring-yellow-500"
                            value={finalPromptForIA}
                         />
                         <div className="absolute top-[4.5rem] right-2 flex flex-col gap-2">
                            <button 
                                onClick={handleCopyToClipboard}
                                className="p-1.5 bg-gray-600 hover:bg-gray-500 rounded-md text-gray-300 hover:text-white transition-colors"
                                title="Copiar Prompt Final"
                            >
                                <ClipboardIcon className="w-4 h-4" />
                            </button>
                             <button
                                onClick={onGenerateJson}
                                disabled={isGeneratingJson || isGenerating || !isPromptReady}
                                className="p-1.5 bg-green-900/80 hover:bg-green-800/80 rounded-md text-green-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Converter para JSON"
                            >
                                <JsonIcon className="w-4 h-4" />
                            </button>
                         </div>
                        {isCopied && <span className="absolute top-[4.7rem] right-12 text-xs text-green-400 animate-fade-in-fast">Copiado!</span>}
                    </div>
                </div>
            </div>
            
            {detailedInfo && <DetailedInfoModal option={detailedInfo} onClose={() => setDetailedInfo(null)} />}

            {isStyleHelpModalOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={() => setIsStyleHelpModalOpen(false)}>
                    <div className="bg-gray-800 border border-gray-600 rounded-lg max-w-2xl w-full p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setIsStyleHelpModalOpen(false)} 
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Dicas para o Estilo do Cenário</h3>
                        <p className="text-base text-gray-300 mb-4 leading-relaxed">Este campo é o seu poder criativo! Descreva o ambiente onde o produto deve estar. A IA usará suas palavras para construir um cenário fotorrealista. Seja específico para melhores resultados.</p>
                        
                        <div className="space-y-4 text-sm">
                            <div>
                                <h4 className="font-semibold text-gray-100">Exemplos de Bons Prompts:</h4>
                                <ul className="list-disc list-inside text-gray-400 mt-1 space-y-1">
                                    <li>em uma mesa de mármore branco, com talheres de prata e um guardanapo de linho ao lado</li>
                                    <li>sobre uma tábua de madeira rústica, com um fundo de tijolos desfocado e luz de fim de tarde</li>
                                    <li>em um prato de cerâmica artesanal, com um fundo de toalha de mesa xadrez vermelha, estilo piquenique</li>
                                    <li>em um balcão de bar de neon, com o fundo de uma cidade noturna desfocado</li>
                                    <li>em um prato branco minimalista, sobre um fundo de concreto, com uma única folha de manjericão</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-100">Dicas Profissionais:</h4>
                                 <ul className="list-disc list-inside text-gray-400 mt-1 space-y-1">
                                    <li><strong className="text-gray-300">Materiais e Texturas:</strong> Use palavras como "madeira rústica", "mármore polido", "linho amassado", "concreto".</li>
                                    <li><strong className="text-gray-300">Itens Adicionais:</strong> Mencione "talheres", "copos", "flores", "ingredientes espalhados" (ex: "grãos de café espalhados").</li>
                                    <li><strong className="text-gray-300">Ambiente:</strong> Descreva o local: "em um café parisiense", "em uma cozinha de fazenda", "em um restaurante de luxo".</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Suggestion & Generate Button Container */}
            <div className="flex-shrink-0 mt-auto pt-4 border-t border-gray-700/50">
                {pendingSuggestion && (
                    <div className="p-3 mb-2 bg-gray-900/50 border-t border-b border-yellow-700/50 animate-fade-in-fast">
                        <div className="text-center">
                            <p className="text-xs text-yellow-400 uppercase tracking-wider">Sugestão do Assistente</p>
                            <p className="text-base text-gray-200 mt-1">
                                Alterar <span className="font-bold">{settingLabels[pendingSuggestion.payload.setting]}</span> para <span className="font-bold text-yellow-300">"{pendingSuggestion.payload.value}"</span>?
                            </p>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <button onClick={onCancelSuggestion} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">Cancelar</button>
                            <button onClick={onConfirmSuggestion} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm">Confirmar</button>
                        </div>
                    </div>
                )}
                <div className="space-y-3">
                    <div className="relative group">
                        <button
                            onClick={onGenerate}
                            disabled={isGenerating}
                            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg
                                ${isRegenerateMode 
                                    ? 'bg-blue-600 hover:bg-blue-500' 
                                    : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'}
                                ${isGenerating ? 'bg-gray-600' : ''}
                            `}
                        >
                            {isGenerating ? 'Gerando...' : (isRegenerateMode ? 'Regerar Cena' : 'Gerar Cena')}
                        </button>
                        {isRegenerateMode && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                                Cria uma nova versão usando a imagem original deste slide com as novas configurações que você selecionou no painel.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};