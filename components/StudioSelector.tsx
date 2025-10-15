// components/StudioSelector.tsx
import React from 'react';
import { StudioType } from '../types';
import { DessertIcon, JewelryIcon, CosmeticsIcon, ElectronicsIcon, FashionIcon, PeopleIcon } from './icons';

interface StudioSelectorProps {
    onSelectStudio: (studioType: StudioType) => void;
}

const studios = [
    { 
        type: 'food' as StudioType, 
        name: 'Fotografia de Comida', 
        description: 'Crie imagens incríveis de pratos, sobremesas e bebidas.',
        Icon: DessertIcon,
    },
    { 
        type: 'jewelry' as StudioType, 
        name: 'Fotografia de Joias', 
        description: 'Destaque o brilho e os detalhes de anéis, colares e relógios.',
        Icon: JewelryIcon,
    },
    { 
        type: 'cosmetics' as StudioType, 
        name: 'Fotografia de Cosméticos', 
        description: 'Realce texturas e cores de maquiagens, perfumes e produtos de skincare.',
        Icon: CosmeticsIcon,
    },
    { 
        type: 'electronics' as StudioType, 
        name: 'Fotografia de Eletrônicos', 
        description: 'Capture o design e os detalhes de gadgets, smartphones e notebooks.',
        Icon: ElectronicsIcon,
    },
    { 
        type: 'fashion' as StudioType, 
        name: 'Fotografia de Moda', 
        description: 'Produza editoriais, lookbooks e fotos de street style com modelos.',
        Icon: FashionIcon,
    },
    { 
        type: 'people' as StudioType, 
        name: 'Fotografia de Pessoas', 
        description: 'Crie retratos corporativos, ensaios de família e fotos de lifestyle.',
        Icon: PeopleIcon,
    }
];

export const StudioSelector: React.FC<StudioSelectorProps> = ({ onSelectStudio }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in-fast">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">Bem-vindo ao Estúdio AI</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl">Escolha o tipo de produto que você deseja fotografar para começar.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {studios.map(studio => (
                    <button
                        key={studio.type}
                        onClick={() => onSelectStudio(studio.type)}
                        className="group bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl border-2 border-gray-700 hover:border-yellow-600/50 transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
                    >
                        <studio.Icon className="h-16 w-16 mb-4 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-2xl font-bold text-white mb-2">{studio.name}</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{studio.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};