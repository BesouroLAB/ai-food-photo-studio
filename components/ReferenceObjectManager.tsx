// components/ReferenceObjectManager.tsx
import React, { useRef } from 'react';
import { ReferenceObject, ImageObject } from '../types';
import { TrashIcon, UploadIcon } from './icons';

interface ReferenceObjectManagerProps {
    referenceObjects: ReferenceObject[];
    onAdd: (image: ImageObject) => void;
    onUpdate: (id: string, updates: Partial<ReferenceObject>) => void;
    onDelete: (id: string) => void;
}

const fileToImageObject = (file: File): Promise<ImageObject> => {
    return new Promise((resolve, reject) => {
        const browserSupportedTypes = ['image/png', 'image/jpeg', 'image/webp'];

        if (browserSupportedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') {
                    return reject(new Error("File could not be read as a data URL."));
                }
                const base64 = event.target.result.split(',')[1];
                resolve({ base64, mimeType: file.type });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        } else {
            console.warn(`Unsupported file type: ${file.type}. Converting to JPEG.`);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (typeof event.target?.result !== 'string') {
                    return reject(new Error("File could not be read as a data URL."));
                }
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return reject(new Error('Could not get canvas context for image conversion.'));
                    }
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                    const base64 = dataUrl.split(',')[1];
                    resolve({ base64, mimeType: 'image/jpeg' });
                };
                img.onerror = () => reject(new Error(`Could not load image for conversion.`));
                img.src = event.target.result as string;
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        }
    });
};

const RoleSelector: React.FC<{ selectedRole: ReferenceObject['role']; onSelect: (role: ReferenceObject['role']) => void }> = ({ selectedRole, onSelect }) => {
    const roles: { id: ReferenceObject['role']; label: string }[] = [
        { id: 'object', label: 'Objeto' },
        { id: 'style', label: 'Estilo' },
        { id: 'background', label: 'Cenário' },
        { id: 'person', label: 'Pessoa' },
    ];
    return (
        <div className="flex bg-gray-800 rounded-md p-0.5">
            {roles.map(role => (
                <button
                    key={role.id}
                    onClick={() => onSelect(role.id)}
                    className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors w-full ${selectedRole === role.id ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    {role.label}
                </button>
            ))}
        </div>
    );
};

export const ReferenceObjectManager: React.FC<ReferenceObjectManagerProps> = ({
    referenceObjects, onAdd, onUpdate, onDelete
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canAddMore = referenceObjects.length < 3;

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!canAddMore) return;
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageObject = await fileToImageObject(file);
                onAdd(imageObject);
            } catch (err) {
                console.error("Error processing reference image:", err);
            }
        }
        if (event.target) {
            event.target.value = '';
        }
    };

    const getPlaceholderText = (role: ReferenceObject['role']) => {
        switch (role) {
            case 'object':
                return "Ex: coloque este logo na parede do fundo.";
            case 'style':
                return "Ex: use as cores e a iluminação desta imagem.";
            case 'background':
                return "Ex: crie um cenário de praia como este.";
            case 'person':
                return "Ex: use esta pessoa como modelo principal.";
            default:
                return "Descreva como usar esta imagem...";
        }
    };

    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-400 -mt-2 mb-2">Adicione até 3 imagens para guiar a IA (estilo, objetos, cenários ou pessoas).</p>
            {referenceObjects.map(obj => (
                <div key={obj.id} className="p-2 bg-gray-700/30 border border-gray-600/50 rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                        <img 
                            src={`data:${obj.image.mimeType};base64,${obj.image.base64}`}
                            alt="Objeto de referência" 
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-grow space-y-1.5">
                           <RoleSelector selectedRole={obj.role} onSelect={(role) => onUpdate(obj.id, { role })} />
                           <textarea
                                rows={2}
                                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-1.5 text-xs focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition"
                                value={obj.description}
                                onChange={(e) => onUpdate(obj.id, { description: e.target.value })}
                                placeholder={getPlaceholderText(obj.role)}
                            />
                        </div>
                         <button onClick={() => onDelete(obj.id)} className="text-red-500 hover:text-red-400 p-1 flex-shrink-0" title="Remover Objeto">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <div className="relative group">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!canAddMore}
                    className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-600 hover:border-yellow-500 text-gray-400 hover:text-yellow-400 rounded-lg transition-colors disabled:border-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                    <UploadIcon className="w-5 h-5" />
                    <span className="text-sm font-semibold">Adicionar Referência</span>
                </button>
                {!canAddMore && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 bg-gray-900 border border-gray-600 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                        Limite de 3 objetos de referência atingido.
                    </div>
                )}
            </div>
        </div>
    );
};