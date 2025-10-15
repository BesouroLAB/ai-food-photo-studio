// components/CarouselItem.tsx
import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Slide } from '../types';
import { CloneIcon, TrashIcon } from './icons';

interface CarouselItemProps {
    slide: Slide;
    index: number;
    isSelected: boolean;
    slidesCount: number;
    onSelectSlide: (slideId: string) => void;
    onCloneSlide: (slideId: string) => void;
    onDeleteSlide: (slideId: string) => void;
    onMoveSlide: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const ItemType = 'SLIDE';

export const CarouselItem: React.FC<CarouselItemProps> = ({
    slide, index, isSelected, slidesCount, onSelectSlide, onCloneSlide, onDeleteSlide, onMoveSlide
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<DragItem, void, { handlerId: any }>({
        accept: ItemType,
        hover(item: DragItem, monitor) {
            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

            onMoveSlide(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: () => ({ id: slide.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));
    
    const imageUrl = slide.generatedImage 
        ? `data:${slide.generatedImage.mimeType};base64,${slide.generatedImage.base64}`
        : slide.originalImage 
        ? `data:${slide.originalImage.mimeType};base64,${slide.originalImage.base64}`
        : null;

    return (
        <div ref={ref} id={`slide-item-${slide.id}`} className={`group relative flex-shrink-0 text-center transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`} style={{ cursor: 'move' }}>
            <span className="text-xs text-gray-400 mb-1 block">Slide {index + 1}</span>
            <div className="relative">
                <button
                    onClick={() => onSelectSlide(slide.id)}
                    className={`w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${isSelected ? 'border-yellow-500' : 'border-gray-600 hover:border-gray-500'}`}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-700/50 flex items-center justify-center text-gray-500">
                            <p className="text-sm font-semibold">Vazio</p>
                        </div>
                    )}
                </button>
                <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onCloneSlide(slide.id); }} 
                        className="bg-blue-500/80 hover:bg-blue-500 text-white p-1 rounded-full shadow-lg transition-all"
                        title="Clonar Slide"
                    >
                        <CloneIcon className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteSlide(slide.id); }} 
                        disabled={slidesCount <= 1} 
                        className="bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-full shadow-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                        title="Deletar Slide"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};