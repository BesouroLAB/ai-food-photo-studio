// components/StudioSelector.tsx
import React from 'react';
import { StudioType } from '../types';
import { DessertIcon, JewelryIcon, CosmeticsIcon, ElectronicsIcon, FashionIcon, PeopleIcon } from './icons';

interface StudioSelectorProps {
    onSelectStudio: (studioType: StudioType) => void;
    isApiKeyReady: boolean;
    isCheckingApiKey: boolean;
    onSelectApiKey: () => void;
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

export const StudioSelector: React.FC<StudioSelectorProps> = ({ onSelectStudio, isApiKeyReady, isCheckingApiKey, onSelectApiKey }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in-fast">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">Bem-vindo ao Estúdio AI</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl">
                 {isApiKeyReady ? "Escolha o tipo de produto que você deseja fotografar para começar." : "Primeiro, vamos configurar sua chave de API."}
            </p>

            {isCheckingApiKey && (
                <div className="my-4 p-4 bg-gray-700/50 rounded-lg flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-400"></div>
                    <p className="text-gray-300 font-semibold">Verificando configuração...</p>
                </div>
            )}

            {!isApiKeyReady && !isCheckingApiKey && (
                 <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700 max-w-lg">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">Configuração Necessária</h3>
                    <p className="text-gray-300 mb-5">Para usar o Estúdio AI, você precisa selecionar uma chave de API para o seu projeto. Isso permite que o aplicativo se comunique com os modelos de IA da Google.</p>
                    <button
                        onClick={onSelectApiKey}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors text-lg"
                    >
                        Selecionar Chave de API
                    </button>
                    <p className="text-xs text-gray-500 mt-4">Para mais informações sobre cobrança, visite <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">ai.google.dev/gemini-api/docs/billing</a>.</p>
                </div>
            )}
            
            {isApiKeyReady && (
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
            )}
        </div>
    );
};