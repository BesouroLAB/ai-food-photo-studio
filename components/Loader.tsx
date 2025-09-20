import React from 'react';

interface LoaderProps {
    message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center z-10">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400 mb-4"></div>
      <p className="text-white text-xl font-semibold">{message}</p>
      <p className="text-gray-300 mt-2 text-center">A IA está criando sua obra de arte, isso pode levar um momento.</p>
    </div>
  );
};
