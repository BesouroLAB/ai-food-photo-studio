import React, { useEffect, useRef } from 'react';
import { Slide } from '../types';
import { PlusIcon } from './icons';
import { CarouselItem } from './CarouselItem';

interface CarouselPreviewProps {
    slides: Slide[];
    selectedSlideId: string | null;
    onSelectSlide: (slideId: string) => void;
    onAddSlide: () => void;
    onCloneSlide: (slideId: string) => void;
    onDeleteSlide: (slideId: string) => void;
    onMoveSlide: (dragIndex: number, hoverIndex: number) => void;
}

export const CarouselPreview: React.FC<CarouselPreviewProps> = ({
    slides, selectedSlideId, onSelectSlide, onAddSlide, onCloneSlide, onDeleteSlide, onMoveSlide
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Este efeito lida com a rolagem do slide selecionado para a visualização.
    useEffect(() => {
        if (selectedSlideId && scrollContainerRef.current) {
            // Usamos um seletor de consulta simples aqui, pois é direto.
            const selectedElement = scrollContainerRef.current.querySelector(`#slide-item-${selectedSlideId}`);
            
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [selectedSlideId, slides]); // Executa quando a seleção muda ou quando os slides são adicionados/removidos.


    return (
        <div className="bg-gray-900/70 p-3 backdrop-blur-sm border-t border-gray-700/50">
            <div className="flex items-center gap-4">
                <div 
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto pb-2 -mb-2 flex-grow scroll-smooth"
                >
                    {slides.map((slide, index) => (
                        <CarouselItem
                            key={slide.id}
                            index={index}
                            slide={slide}
                            isSelected={selectedSlideId === slide.id}
                            slidesCount={slides.length}
                            onSelectSlide={onSelectSlide}
                            onCloneSlide={onCloneSlide}
                            onDeleteSlide={onDeleteSlide}
                            onMoveSlide={onMoveSlide}
                        />
                    ))}
                </div>
                <div className="pl-3 border-l border-gray-700/50 flex-shrink-0">
                    <button 
                        onClick={onAddSlide} 
                        className="w-20 h-20 bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-yellow-400 rounded-lg flex flex-col items-center justify-center transition-colors"
                        title="Adicionar Novo Slide"
                    >
                        <PlusIcon className="w-8 h-8" />
                        <span className="text-xs mt-1">Novo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};