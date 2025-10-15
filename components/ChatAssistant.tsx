// components/ChatAssistant.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AIAction, StudioType } from '../types';
import { getChatResponseStream } from '../services/geminiService';
import { ChatBubbleIcon, ChevronDownIcon, PaperAirplaneIcon } from './icons';

interface ChatAssistantProps {
    onApplySuggestion: (action: AIAction) => void;
    studioType: StudioType | null;
}

const ACTION_REGEX = /\[ACTION\](.*?\[\/ACTION\])/s;

const parseAction = (text: string): { cleanText: string; action: AIAction | null } => {
    const match = text.match(ACTION_REGEX);
    if (match && match[1]) {
        try {
            const jsonString = match[1].replace('[/ACTION]', '').trim();
            const action = JSON.parse(jsonString);
            const cleanText = text.replace(ACTION_REGEX, '').trim();
            return { cleanText, action };
        } catch (e) {
            console.error("Failed to parse AI action:", e);
            return { cleanText: text.replace(ACTION_REGEX, '').trim(), action: null }; // Return cleaned text on parse error
        }
    }
    return { cleanText: text, action: null };
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onApplySuggestion, studioType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "Olá! Sou seu assistente de fotografia. Como posso ajudar a criar sua imagem perfeita hoje?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !studioType) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const currentHistory = [...messages, userMessage];
        const modelResponse: ChatMessage = { role: 'model', content: '' };
        setMessages(prev => [...prev, modelResponse]);

        try {
            const stream = getChatResponseStream(currentHistory, input, studioType);
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage) {
                        lastMessage.content = fullResponse;
                    }
                    return newMessages;
                });
            }
            
            // Once streaming is complete, parse for action
            const { cleanText, action } = parseAction(fullResponse);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                 if (lastMessage) {
                    lastMessage.content = cleanText;
                    lastMessage.action = action;
                }
                return newMessages;
            });

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage) {
                    lastMessage.content = "Desculpe, ocorreu um erro ao me comunicar com a IA.";
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const getActionLabel = (action: AIAction) => {
        const settingLabels = {
            camera: 'Câmera',
            angle: 'Ângulo',
            depthOfField: 'Foco',
            lighting: 'Iluminação',
        };
        const setting = settingLabels[action.payload.setting] || 'Configuração';
        return `Aplicar ${setting}: ${action.payload.value}`;
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-inner">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-200 hover:bg-gray-700/50"
            >
                <div className="flex items-center gap-2">
                    <ChatBubbleIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">Assistente AI</span>
                </div>
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-3 border-t border-gray-700/50">
                    <div className="h-64 flex flex-col">
                        <div className="flex-grow overflow-y-auto space-y-4 pr-2 -mr-2 mb-2">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-xs md:max-w-sm rounded-lg px-3 py-2 text-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-yellow-500/80 text-gray-900' 
                                            : 'bg-gray-700 text-gray-200'
                                    }`}>
                                        {msg.content}
                                        {isLoading && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />}
                                    </div>
                                     {msg.action && (
                                        <div className="mt-2">
                                            <button 
                                                onClick={() => onApplySuggestion(msg.action!)}
                                                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1.5 px-3 rounded-md text-xs transition-colors"
                                            >
                                                {getActionLabel(msg.action)}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSubmit} className="flex-shrink-0 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={studioType ? "Pergunte algo..." : "Selecione um estúdio para começar"}
                                className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-md p-2 text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition"
                                disabled={isLoading || !studioType}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || !studioType}
                                className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-gray-900 font-bold p-2 rounded-md transition-colors"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
