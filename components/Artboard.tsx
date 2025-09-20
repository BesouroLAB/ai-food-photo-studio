import React, { useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { Slide, ImageObject, Element as ElementType } from '../types';
import { Loader } from './Loader';
import { UploadIcon } from './icons';

interface ArtboardProps {
    slide: Slide | null;
    isLoading: boolean;
    loadingMessage: string;
    error: string | null;
    onUploadImage: (image: ImageObject) => void;
    onSetWorkMode: (mode: 'retoucher' | 'editor') => void;
}

const fileToImageObject = (file: File): Promise<ImageObject> => {
    return new Promise((resolve, reject) => {
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
    });
};

export const Artboard: React.FC<ArtboardProps> = ({ slide, isLoading, loadingMessage, error, onUploadImage, onSetWorkMode }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = async (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            try {
                const imageObject = await fileToImageObject(file);
                onUploadImage(imageObject);
            } catch (err) {
                console.error("Error processing file:", err);
            }
        }
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isEntering);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const renderContent = () => {
        if (isLoading) return <Loader message={loadingMessage} />;
        if (error) return <div className="text-center text-red-400 p-4"><h3 className="text-xl font-bold mb-2">Ocorreu um Erro</h3><p>{error}</p></div>;

        // Step 1: No images at all, show upload prompt
        if (!slide?.originalImage && !slide?.generatedImage) {
            return (
                <div 
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`w-full h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-yellow-400 bg-gray-700/50' : 'border-gray-600'}`}
                >
                    <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                    <UploadIcon className="w-16 h-16 text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300">Arraste e solte uma imagem</h3>
                    <p className="text-gray-500 mt-2">ou <label htmlFor="file-upload" className="text-yellow-400 font-semibold cursor-pointer hover:underline">clique para selecionar</label>.</p>
                    <p className="text-gray-400 mt-6 font-semibold text-lg">OU</p>
                    <p className="text-gray-500 mt-2">Use os controles à esquerda para gerar uma imagem do zero.</p>
                </div>
            );
        }

        // Step 2: Original image exists, but no work mode selected yet
        if (slide.originalImage && !slide.workMode) {
            return (
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Qual o seu objetivo?</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Escolha como a IA deve trabalhar com a sua imagem.</p>
                    <div className="flex gap-6 justify-center">
                        <button onClick={() => onSetWorkMode('retoucher')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">Alterar detalhes</button>
                        <button onClick={() => onSetWorkMode('editor')} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">Editor</button>
                    </div>
                </div>
            );
        }

        // Step 3: Display results
        const originalImageUrl = slide.originalImage ? `data:${slide.originalImage.mimeType};base64,${slide.originalImage.base64}` : null;
        const generatedImageUrl = slide.generatedImage ? `data:${slide.generatedImage.mimeType};base64,${slide.generatedImage.base64}` : null;

        if (originalImageUrl && generatedImageUrl) {
            return (
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="font-bold mb-2 text-gray-400">Original</h4>
                        <img src={originalImageUrl} alt="Original" className="max-w-full max-h-[90%] object-contain rounded-lg"/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="font-bold mb-2 text-yellow-400">Resultado</h4>
                        <img src={generatedImageUrl} alt="Generated" className="max-w-full max-h-[90%] object-contain rounded-lg"/>
                    </div>
                </div>
            );
        }

        if (generatedImageUrl) {
             return <img src={generatedImageUrl} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg"/>;
        }

        if (originalImageUrl) {
            return <img src={originalImageUrl} alt="Original" className="max-w-full max-h-full object-contain rounded-lg"/>;
        }

        return null;
    };
    
    const bgImageUrl = slide?.generatedImage ? `data:${slide.generatedImage.mimeType};base64,${slide.generatedImage.base64}` : null;

    return (
        <div className="w-full h-full bg-gray-900/50 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
             {bgImageUrl && <img src={bgImageUrl} className="absolute inset-0 w-full h-full object-cover opacity-0" alt="" />}
             <div className="relative z-10 w-full h-full flex items-center justify-center">
                {renderContent()}
             </div>
             {/* Render Elements */}
             {slide?.elements.map(el => (
                 <Rnd
                    key={el.id}
                    size={{ width: el.width, height: el.height }}
                    position={{ x: el.x, y: el.y }}
                    className="flex items-center justify-center border border-dashed border-transparent hover:border-yellow-400"
                 >
                     <span style={{ fontSize: `${el.fontSize}px`, color: el.color, fontFamily: el.fontFamily }}>
                         {el.content}
                     </span>
                 </Rnd>
             ))}
        </div>
    );
};