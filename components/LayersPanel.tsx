// components/LayersPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Slide, Element, AIAction, TextElement, ShapeElement, ImageAdjustments, ImagePrompt, Option, StudioPreset, StudioType } from '../types';
import { DownloadIcon, CameraIcon, AngleIcon, LightingIcon, FocusIcon, PencilIcon, ChevronDownIcon, ShapeSquareIcon, ShapeCircleIcon, ShapeTriangleIcon, ShapeArrowIcon } from './icons';
import { ChatAssistant } from './ChatAssistant';
import { CollapsibleSection } from './CollapsibleSection';
import { AdjustmentsPanel } from './AdjustmentsPanel';

interface StudioConfig {
    presets: StudioPreset[];
    cameras: Option[];
    angles: Option[];
    depthsOfField: Option[];
    lightingStyles: Option[];
}

interface LayersPanelProps {
    selectedSlide: Slide | null;
    studioConfig: StudioConfig | null;
    studioType: StudioType | null;
    onDownload: () => void;
    isActionDisabled: boolean;
    elements: Element[];
    onAddElement: (type: 'text' | 'shape', shapeType?: ShapeElement['shapeType']) => void;
    onUpdateElement: (elementId: string, updates: Partial<Element>) => void;
    onDeleteElement: (elementId: string) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string | null) => void;
    onApplySuggestion: (action: AIAction) => void;
    onPreviewElementUpdate: (updates: Partial<Element> | null) => void;
    onApplyAdjustments: (slideId: string, adjustments: ImageAdjustments) => void;
    onAdjustmentsUpdate: (slideId: string, updates: Partial<ImageAdjustments>) => void;
    onRegenerate: (settingsOverride: Partial<ImagePrompt>) => void;
}

const FONT_FAMILIES = [
    'Anton',
    'Arvo',
    'Bebas Neue',
    'Bitter',
    'Caveat',
    'Cormorant Garamond',
    'Dancing Script',
    'Inter',
    'Lato',
    'Libre Baskerville',
    'Lobster',
    'Lora',
    'Merriweather',
    'Montserrat',
    'Open Sans',
    'Oswald',
    'Pacifico',
    'Playfair Display',
    'Poppins',
    'Raleway',
    'Roboto',
    'Roboto Mono',
    'Rubik',
    'Source Code Pro',
    'Ubuntu',
    'Work Sans'
].sort();


const FONT_WEIGHTS = [
    { label: 'Normal', value: '400' },
    { label: 'Negrito', value: '700' },
];


const ImageDna: React.FC<{ slide: Slide | null }> = ({ slide }) => {
    if (!slide || !slide.generatedImage || !slide.prompt) {
        return <p className="text-gray-500 text-center text-xs py-2">Gere uma imagem para ver seu DNA.</p>;
    }

    const { prompt } = slide;
    const dnaItems = [
        { label: 'Câmera', value: prompt.camera.name, Icon: CameraIcon },
        { label: 'Ângulo', value: prompt.angle.name, Icon: AngleIcon },
        { label: 'Iluminação', value: prompt.lighting.name, Icon: LightingIcon },
        { label: 'Foco', value: prompt.depthOfField.name, Icon: FocusIcon },
    ];

    return (
        <div className="space-y-3 p-1">
            {dnaItems.map(({ label, value, Icon }) => (
                <div key={label}>
                    <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </div>
                    <p className="text-gray-200 font-semibold pl-6 text-sm">{value}</p>
                </div>
            ))}
            <div>
                <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
                    <PencilIcon className="w-4 h-4" />
                    <span>Descrição da Cena</span>
                </div>
                <p className="text-gray-200 italic pl-6 text-sm">"{prompt.sceneDescription}"</p>
            </div>
        </div>
    );
};

const TextPropertiesPanel: React.FC<{
    element: TextElement;
    onUpdate: (updates: Partial<TextElement>) => void;
    onPreviewUpdate: (updates: Partial<TextElement> | null) => void;
}> = ({ element, onUpdate, onPreviewUpdate }) => {
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFontDropdownOpen(false);
                onPreviewUpdate(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, onPreviewUpdate]);

    return (
        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 animate-fade-in-fast">
            <h2 className="text-lg font-bold text-yellow-400 mb-3">Propriedades do Texto</h2>
            <div className="space-y-3">
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1">Conteúdo</label>
                    <textarea
                        value={element.content}
                        onChange={e => onUpdate({ content: e.target.value })}
                        rows={2}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1">Fonte</label>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsFontDropdownOpen(prev => !prev)}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500 flex justify-between items-center"
                        >
                            <span style={{ fontFamily: element.fontFamily }}>{element.fontFamily}</span>
                            <ChevronDownIcon className={`h-4 w-4 transition-transform ${isFontDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isFontDropdownOpen && (
                            <ul
                                onMouseLeave={() => onPreviewUpdate(null)}
                                className="absolute w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
                            >
                                {FONT_FAMILIES.map(font => (
                                    <li
                                        key={font}
                                        onMouseEnter={() => onPreviewUpdate({ fontFamily: font })}
                                        onClick={() => {
                                            onUpdate({ fontFamily: font });
                                            setIsFontDropdownOpen(false);
                                        }}
                                        className="px-3 py-2 text-white hover:bg-yellow-500 hover:text-gray-900 cursor-pointer transition-colors text-sm"
                                        style={{ fontFamily: font }}
                                    >
                                        {font}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Tamanho</label>
                        <input
                            type="number"
                            value={element.fontSize}
                            onChange={e => onUpdate({ fontSize: parseInt(e.target.value, 10) })}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Peso</label>
                        <select
                            value={element.fontWeight}
                            onChange={e => onUpdate({ fontWeight: e.target.value as '400' | '700' })}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                        >
                            {FONT_WEIGHTS.map(weight => <option key={weight.value} value={weight.value}>{weight.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Cor</label>
                        <input
                            type="color"
                            value={element.color}
                            onChange={e => onUpdate({ color: e.target.value })}
                            className="w-full h-10 bg-gray-700 border border-gray-600 rounded-md p-0 cursor-pointer"
                        />
                    </div>
                     <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Opacidade</label>
                        <input
                            type="range"
                            min="0" max="1" step="0.05"
                            value={element.opacity}
                            onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                </div>
                 <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1">Rotação (°)</label>
                    <input
                        type="number"
                        value={Math.round(element.rotation || 0)}
                        onChange={e => onUpdate({ rotation: parseInt(e.target.value, 10) || 0 })}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                    />
                </div>
            </div>
        </div>
    );
};

const ShapePropertiesPanel: React.FC<{
    element: ShapeElement;
    onUpdate: (updates: Partial<ShapeElement>) => void;
}> = ({ element, onUpdate }) => {
    return (
        <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 animate-fade-in-fast">
            <h2 className="text-lg font-bold text-yellow-400 mb-3">Propriedades da Forma</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Preenchimento</label>
                        <input
                            type="color"
                            value={element.backgroundColor}
                            onChange={e => onUpdate({ backgroundColor: e.target.value })}
                            className="w-full h-10 bg-gray-700 border border-gray-600 rounded-md p-0 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Borda</label>
                        <input
                            type="color"
                            value={element.borderColor}
                            onChange={e => onUpdate({ borderColor: e.target.value })}
                            className="w-full h-10 bg-gray-700 border border-gray-600 rounded-md p-0 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Espessura da Borda</label>
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={element.borderWidth}
                            onChange={e => onUpdate({ borderWidth: parseInt(e.target.value, 10) || 0 })}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1">Opacidade</label>
                        <input
                            type="range"
                            min="0" max="1" step="0.05"
                            value={element.opacity}
                            onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
                            className="w-full mt-2"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1">Rotação (°)</label>
                    <input
                        type="number"
                        value={Math.round(element.rotation || 0)}
                        onChange={e => onUpdate({ rotation: parseInt(e.target.value, 10) || 0 })}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                    />
                </div>
            </div>
        </div>
    );
};

const RegenerationPanel: React.FC<{
    slide: Slide;
    studioConfig: StudioConfig;
    onRegenerate: (settingsOverride: Partial<ImagePrompt>) => void;
    isActionDisabled: boolean;
}> = ({ slide, studioConfig, onRegenerate, isActionDisabled }) => {
    const [newSettings, setNewSettings] = useState<Partial<ImagePrompt>>({});
    
    useEffect(() => {
        setNewSettings({});
    }, [slide.id]);

    if (!slide.prompt) return null;

    const handleSettingChange = (field: keyof ImagePrompt, value: Option) => {
        setNewSettings(prev => ({ ...prev, [field]: value }));
    };

    const settings = [
        { key: 'camera' as const, label: 'Câmera', options: studioConfig.cameras, current: slide.prompt.camera },
        { key: 'angle' as const, label: 'Ângulo', options: studioConfig.angles, current: slide.prompt.angle },
        { key: 'depthOfField' as const, label: 'Foco', options: studioConfig.depthsOfField, current: slide.prompt.depthOfField },
        { key: 'lighting' as const, label: 'Iluminação', options: studioConfig.lightingStyles, current: slide.prompt.lighting },
    ];
    
    const hasChanges = Object.keys(newSettings).length > 0;
    const buttonText = hasChanges ? 'Continuar com Novos Ajustes' : 'Altere um ajuste para continuar';

    return (
        <div className="p-1 space-y-3">
            <p className="text-xs text-gray-400">Altere uma ou mais configurações abaixo para um novo "take", mantendo o mesmo assunto e estilo.</p>
            {settings.map(setting => (
                <div key={setting.key}>
                    <label className="text-xs font-medium text-gray-400 block mb-1">{setting.label}</label>
                    <select
                        value={(newSettings[setting.key] as Option)?.name ?? setting.current.name}
                        onChange={e => handleSettingChange(setting.key, setting.options.find(opt => opt.name === e.target.value)!)}
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500"
                    >
                        {setting.options.map(opt => <option key={opt.name} value={opt.name}>{opt.name}</option>)}
                    </select>
                </div>
            ))}
            <button
                onClick={() => onRegenerate(newSettings)}
                disabled={isActionDisabled || !hasChanges}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
                {buttonText}
            </button>
        </div>
    );
};


export const LayersPanel: React.FC<LayersPanelProps> = ({
    selectedSlide, studioConfig, studioType,
    onDownload, isActionDisabled,
    elements, onAddElement, onUpdateElement, onDeleteElement, selectedElementId, onSelectElement,
    onApplySuggestion, onPreviewElementUpdate, onApplyAdjustments, onAdjustmentsUpdate, onRegenerate,
}) => {
    const [openSections, setOpenSections] = useState({
        dna: true,
        adjustments: true,
        elements: true,
        regenerate: true,
    });
    const handleToggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const selectedElement = selectedElementId && elements ? elements.find(el => el.id === selectedElementId) : null;
    const canDownload = !!(selectedSlide?.generatedImage || selectedSlide?.originalImage);

    const getElementLabel = (element: Element, index: number): string => {
        if (element.type === 'text') {
            const content = element.content.length > 15 ? `${element.content.substring(0, 15)}...` : element.content;
            return `Texto: "${content}"`;
        }
        switch (element.shapeType) {
            case 'square': return `Quadrado ${index + 1}`;
            case 'circle': return `Círculo ${index + 1}`;
            case 'triangle': return `Triângulo ${index + 1}`;
            case 'arrow': return `Seta ${index + 1}`;
            default: return `Forma ${index + 1}`;
        }
    };
    
    return (
        <div className="flex flex-col h-full text-sm">
            {/* Scrollable content area */}
            <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-1">
                <CollapsibleSection title="DNA da Imagem" isOpen={openSections.dna} onToggle={() => handleToggleSection('dna')}>
                    <ImageDna slide={selectedSlide} />
                </CollapsibleSection>
                
                {selectedSlide?.generatedImage && (
                    <>
                        <CollapsibleSection title="Ajustes e Filtros" isOpen={openSections.adjustments} onToggle={() => handleToggleSection('adjustments')}>
                            <AdjustmentsPanel
                                slide={selectedSlide}
                                onAdjustmentsUpdate={(updates) => onAdjustmentsUpdate(selectedSlide.id, updates)}
                                onApplyAdjustments={(adjustments) => onApplyAdjustments(selectedSlide.id, adjustments)}
                                isActionDisabled={isActionDisabled}
                            />
                        </CollapsibleSection>

                        {studioConfig && (
                             <CollapsibleSection title="Continuar Ensaio" isOpen={openSections.regenerate} onToggle={() => handleToggleSection('regenerate')}>
                                <RegenerationPanel
                                    slide={selectedSlide}
                                    studioConfig={studioConfig}
                                    onRegenerate={onRegenerate}
                                    isActionDisabled={isActionDisabled}
                                />
                            </CollapsibleSection>
                        )}
                    </>
                )}

                <CollapsibleSection title="Elementos" isOpen={openSections.elements} onToggle={() => handleToggleSection('elements')}>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1">
                             <button
                                onClick={() => onAddElement('text')}
                                disabled={!selectedSlide?.generatedImage && !selectedSlide?.originalImage}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded-md text-xs transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                + Texto
                            </button>
                            <button onClick={() => onAddElement('shape', 'square')} disabled={!selectedSlide?.generatedImage && !selectedSlide?.originalImage} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed" title="Adicionar Quadrado"><ShapeSquareIcon className="w-4 h-4 text-white"/></button>
                            <button onClick={() => onAddElement('shape', 'circle')} disabled={!selectedSlide?.generatedImage && !selectedSlide?.originalImage} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed" title="Adicionar Círculo"><ShapeCircleIcon className="w-4 h-4 text-white"/></button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {elements.length === 0 && <p className="text-gray-500 text-center text-xs py-2">Nenhum elemento adicionado.</p>}
                        {elements.map((element, index) => (
                            <div key={element.id} className={`border rounded-lg transition-colors ${selectedElementId === element.id ? 'border-yellow-500 bg-gray-700/50' : 'border-gray-600 bg-gray-700/20 hover:bg-gray-700/40'}`}>
                                <div className="p-2 flex justify-between items-center cursor-pointer" onClick={() => onSelectElement(element.id)}>
                                    <span className="font-semibold truncate text-sm">{getElementLabel(element, index)}</span>
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteElement(element.id); }} className="text-red-500 hover:text-red-400" title="Deletar Elemento">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                {selectedElement && (
                    <div className="mt-2">
                        {selectedElement.type === 'text' ? (
                            <TextPropertiesPanel
                                element={selectedElement as TextElement}
                                onUpdate={(updates) => onUpdateElement(selectedElement.id, updates)}
                                onPreviewUpdate={onPreviewElementUpdate}
                            />
                        ) : (
                            <ShapePropertiesPanel
                                element={selectedElement as ShapeElement}
                                onUpdate={(updates) => onUpdateElement(selectedElement.id, updates)}
                            />
                        )}
                    </div>
                )}
            </div>
            
            {/* Fixed bottom area */}
            <div className="flex-shrink-0 mt-4 space-y-4">
                 {/* Download Section */}
                <div className="pt-2 border-t border-gray-700/50">
                    <button onClick={onDownload} disabled={isActionDisabled || !canDownload} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
                        <DownloadIcon className="w-5 h-5" />
                        Baixar
                    </button>
                </div>
                {/* Chat Assistant */}
                <div>
                    <ChatAssistant onApplySuggestion={onApplySuggestion} studioType={studioType} />
                </div>
            </div>
        </div>
    );
};