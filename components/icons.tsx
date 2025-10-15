// components/icons.tsx
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
        <path d="M18.5 7.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
        <path d="M8 12.5c0 .17.02.33.05.5H6v-1h2.05c-.03.17-.05.33-.05.5zm8.5-2.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    </svg>
);

export const ArrowsPointingOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

export const SwapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

export const KeepAllIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-3.75-3.75M17.25 3.75h3.75v3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l3.75 3.75M6.75 20.25H3v-3.75" />
    </svg>
);

export const HarmonizeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 118.158-2.311 2.25 2.25 0 012.137 2.311 3 3 0 00-5.78 1.128z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.47 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 118.158-2.311 2.25 2.25 0 012.137 2.311 3 3 0 00-5.78 1.128z" />
    </svg>
);

export const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const TranslateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.1 10.153 14.1 13.5c0 3.346-.92 6.439-2.566 8.864m-11.434 2.364a48.471 48.471 0 006.344-.37m-6.344.37l-1.36-1.36m10.082 2.722l1.36-1.36" />
    </svg>
);

export const JsonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5M4.5 4.5l7.5 7.5-7.5 7.5" transform="rotate(90 12 12)"/>
    </svg>
);


export const JewelryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.04 16.5l-3.04-3.04 3.04-3.04 3.04 3.04-3.04 3.04z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-4.5-4.5L12 12l4.5 4.5L12 21z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L7.5 7.5 12 3l4.5 4.5L12 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l4.5-4.5L12 12 7.5 16.5 3 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12l-4.5 4.5L12 12l4.5-4.5L21 12z" />
    </svg>
);

export const CosmeticsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.375c0-.621.504-1.125 1.125-1.125h5.5c.621 0 1.125.504 1.125 1.125V7.5m-7.5 3V15c0 .621.504 1.125 1.125-1.125h5.5c.621 0 1.125-.504 1.125-1.125V10.5m-7.5 0h7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v3z" />
    </svg>
);

export const ElectronicsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-9c0-.621-.504-1.125-1.125-1.125H6.75c-.621 0-1.125.504-1.125 1.125v9c0 .621.504 1.125 1.125 1.125z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.5" />
    </svg>
);

export const FashionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 21h11.25c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v10.5c0 .621.504 1.125 1.125 1.125z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5a3 3 0 013-3h0a3 3 0 013 3V9m-6 3h6" />
    </svg>
);

export const PeopleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Fashion Sub-Icons
export const TshirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5a3.5 3.5 0 00-3.5-3.5h-1a3.5 3.5 0 00-3.5 3.5V11h8V9.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
    </svg>
);
export const ShoesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-5.5c0-1.12 0-1.68.218-2.108a2 2 0 01.874-.874C5.52 7.3 6.08 7.3 7.2 7.3h6.6c1.12 0 1.68 0 2.108.218a2 2 0 01.874.874c.218.428.218.988.218 2.108V16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h13.5a.5.5 0 01.5.5v0a2 2 0 01-2 2H6a2 2 0 01-2-2v-.5a.5.5 0 01.5-.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 7.3v-1a2 2 0 00-2-2h-1a2 2 0 00-2 2v1" />
    </svg>
);
export const LingerieIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10c0-3-2-6-5-6s-5 3-5 6h10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10H7c-1 0-2 1-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4c0-1-1-2-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4" />
    </svg>
);

export const CloneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5 .124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 3.375-3.375-3.375m0 0L18 5.25m-3.375 3.375v-3.375" />
  </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const ChevronUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

export const ChevronDoubleLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
  </svg>
);

export const ChevronDoubleRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
  </svg>
);


export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-.75M15.75 5.25H18a2.25 2.25 0 012.25 2.25v1.5M4.5 7.5A2.25 2.25 0 012.25 5.25H5.25M9 3.75H15" />
    </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

export const ZoomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
    </svg>
);

export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.375l-4.5 1.5a.75.75 0 01-.926-.926l1.5-4.5A9.76 9.76 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.704 9 8.25z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.455L12.75 18l1.197-.398a3.375 3.375 0 002.455-2.455l.398-1.197.398 1.197a3.375 3.375 0 002.455 2.455l1.197.398-1.197.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
);

export const DiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125A2.25 2.25 0 014.5 4.875h15a2.25 2.25 0 012.25 2.25v9.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V7.125z" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" strokeWidth="0" />
      <circle cx="15" cy="9" r="1.25" fill="currentColor" strokeWidth="0" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" strokeWidth="0" />
      <circle cx="9" cy="15" r="1.25" fill="currentColor" strokeWidth="0" />
      <circle cx="15" cy="15" r="1.25" fill="currentColor" strokeWidth="0" />
    </svg>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.5l-4.243 1.272 1.272-4.243L16.862 4.487z" />
    </svg>
);

export const RotateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a3.375 3.375 0 00-3.375-3.375H8.25a3.375 3.375 0 00-3.375 3.375v2.25" />
    </svg>
);

export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
);


// Shape Icons
export const ShapeSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" /></svg>
);
export const ShapeCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="8" /></svg>
);
export const ShapeTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2 L22 21 H2 Z" /></svg>
);
export const ShapeArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12 h14 M12 5 l7 7 -7 7" /></svg>
);


// Aspect Ratio Icons
export const SquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
);
export const PortraitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="5" y="2" width="14" height="20" rx="2" /></svg>
);
export const StoriesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="7" y="2" width="10" height="20" rx="2" /></svg>
);
export const LandscapeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="2" y="7" width="20" height="10" rx="2" /></svg>
);

// Settings Header Icons
export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);
export const AngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0l-2.25.625m18 0l2.25.625m-13.5 0V13.5m-3-3V13.5m10.5-3V13.5" />
    </svg>
);
export const LightingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);
export const FocusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

// Illustrative Food Icons
export const DessertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M3 16.5c0 1.933 1.567 3.5 3.5 3.5h11c1.933 0 3.5-1.567 3.5-3.5v-2.5c0-1.933-1.567-3.5-3.5-3.5h-11C4.567 10.5 3 12.067 3 14v2.5zM16.5 4.5c0-1.933-1.567-3.5-3.5-3.5h-1c-1.933 0-3.5 1.567-3.5 3.5v4.5h8v-4.5z" /></svg>
);
export const MeatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15C12.75 17.0711 11.0711 18.75 9 18.75C6.92893 18.75 5.25 17.0711 5.25 15C5.25 12.9289 6.92893 11.25 9 11.25C11.0711 11.25 12.75 12.9289 12.75 15Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 9C18.75 11.0711 17.0711 12.75 15 12.75C12.9289 12.75 11.25 11.0711 11.25 9C11.25 6.92893 12.9289 5.25 15 5.25C17.0711 5.25 18.75 6.92893 18.75 9Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 11.25C9 9.17893 7.32107 7.5 5.25 7.5C3.17893 7.5 1.5 9.17893 1.5 11.25C1.5 13.3211 3.17893 15 5.25 15C7.32107 15 9 13.3211 9 11.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75C15 14.8211 16.6789 16.5 18.75 16.5C20.8211 16.5 22.5 14.8211 22.5 12.75C22.5 10.6789 20.8211 9 18.75 9C16.6789 9 15 10.6789 15 12.75Z" /></svg>
);
export const SaladIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v3.375c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.375M3.75 6.75c0-1.104.896-2 2-2h12.5c1.104 0 2 .896 2 2v2.25c0 1.104-.896 2-2 2H5.75c-1.104 0-2-.896-2-2V6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 11.25s.75-2.25 3-2.25 3 2.25 3 2.25m4-2.25s.75-2.25 3-2.25 3 2.25 3 2.25" /></svg>
);
export const DrinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-6.75 3h9.75L17.25 21H6.75L3.75 9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 3a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3.75a.75.75 0 01.75-.75z" /></svg>
);
export const BurgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75h19.5M2.25 12.75h19.5m-19.5-3h19.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15c1.104 0 2-.896 2-2V6.5c0-1.104-.896-2-2-2h-15c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2z" /></svg>
);
export const PastaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v3.375c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.375" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 9.375h17.25M9 6.375V4.5m3 1.875V4.5m3 1.875V4.5" /></svg>
);
export const PizzaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12l6.75 3.897-6.75 3.897-6.75-3.897L12 12z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 14.25a.75.75 0 01-1.5 0 .75.75 0 011.5 0zm4.5 0a.75.75 0 01-1.5 0 .75.75 0 011.5 0z" /></svg>
);
export const SushiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75h10.5v4.5H6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 9.75s-.75-3.75 1.5-3.75h9c2.25 0 1.5 3.75 1.5 3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 11.25a.75.75 0 01-1.5 0 .75.75 0 011.5 0zm4.5 0a.75.75 0 01-1.5 0 .75.75 0 011.5 0z" /></svg>
);
export const BrazilianFoodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75a3 3 0 10-5.205-2.205A3.001 3.001 0 0012 15a3 3 0 003.75.75z" /></svg>
);
export const BakeryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125H3.75A1.125 1.125 0 012.625 18.375v-5.25C2.625 12.504 3.129 12 3.75 12z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.375c0-1.48 1.403-2.625 3-2.625h7.5c1.597 0 3 1.145 3 2.625v5.625H5.25V6.375z" /></svg>
);
export const BowlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v3.375c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.375M3.75 6.75c0-1.104.896-2 2-2h12.5c1.104 0 2 .896 2 2v2.25c0 1.104-.896 2-2 2H5.75c-1.104 0-2-.896-2-2V6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 11.25s1.5-1.5 4.5-1.5 4.5 1.5 4.5 1.5" /></svg>
);
export const CoffeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5c0-3.314-2.686-6-6-6h-3c-3.314 0-6 2.686-6 6v7.5c0 3.314 2.686 6 6 6h3c3.314 0 6-2.686 6-6V7.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75h1.5c.828 0 1.5.672 1.5 1.5v3c0 .828-.672 1.5-1.5 1.5h-1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5s-1.5 1.5-1.5 3.75 1.5 3.75 1.5 3.75" /></svg>
);

// Illustrative Angle Icons
const PlateIcon: React.FC = () => <circle cx="12" cy="17" r="5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
const CameraBodyIcon: React.FC<{x: number, y: number}> = ({ x, y }) => <rect x={x} y={y} width="6" height="4" rx="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
const CameraLensIcon: React.FC<{cx: number, cy: number, r: number}> = ({ cx, cy, r }) => <circle cx={cx} cy={cy} r={r} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;

export const TopDownAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><PlateIcon /><CameraBodyIcon x={9} y={3} /><CameraLensIcon cx={12} cy={8} r={1.5} /></svg>
);
export const FortyFiveDegreeAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><PlateIcon /><g transform="rotate(-30 6 8)"><CameraBodyIcon x={3} y={6} /><CameraLensIcon cx={9} cy={8} r={1.5} /></g></svg>
);
export const EyeLevelAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><ellipse cx="12" cy="17" rx="5" ry="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><CameraBodyIcon x={2} y={15} /><CameraLensIcon cx={8} cy={17} r={1.5} /></svg>
);
export const HighAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><PlateIcon /><g transform="rotate(-15 7 6)"><CameraBodyIcon x={4} y={4} /><CameraLensIcon cx={10} cy={6} r={1.5} /></g></svg>
);
export const LowAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><ellipse cx="12" cy="17" rx="5" ry="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><g transform="rotate(30 6 18)"><CameraBodyIcon x={3} y={16} /><CameraLensIcon cx={9} cy={18} r={1.5} /></g></svg>
);
export const SideViewAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M7 18.5 V15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><ellipse cx="12" cy="17" rx="5" ry="1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 18.5 V15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><CameraBodyIcon x={2} y={15} /><CameraLensIcon cx={8} cy={17} r={1.5} /></svg>
);
export const ExtremeCloseUpAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><circle cx="12" cy="12" r="8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 12 l3 3 M9 9 l-2 -2 M15 9 l2 -2 M9 15 l-2 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><CameraBodyIcon x={2} y={10} /><CameraLensIcon cx={8} cy={12} r={1.5} /></svg>
);
export const DutchAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><g transform="rotate(15 12 12)"><PlateIcon /><g transform="rotate(-30 6 8)"><CameraBodyIcon x={3} y={6} /><CameraLensIcon cx={9} cy={8} r={1.5} /></g></g></svg>
);
export const PovAngleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path d="M2 21 V12 L12 4 l10 8 v9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><ellipse cx="12" cy="17" rx="5" ry="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Illustrative Depth of Field Icons
const DoFScene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const UltraShallowDofIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <circle cx="6" cy="15" r="3" />
        <circle cx="12" cy="12" r="2" strokeDasharray="2 2" opacity="0.5" />
        <circle cx="18" cy="16" r="4" strokeDasharray="2 2" opacity="0.5" />
    </DoFScene>
);
export const ShallowDofIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <circle cx="6" cy="15" r="3" />
        <circle cx="12" cy="12" r="2" strokeDasharray="2 2" opacity="0.7" />
        <circle cx="18" cy="16" r="4" strokeDasharray="2 2" opacity="0.5" />
    </DoFScene>
);
export const MediumDofIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <circle cx="6" cy="15" r="3" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="16" r="4" strokeDasharray="2 2" opacity="0.7" />
    </DoFScene>
);
export const DeepDofIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <circle cx="6" cy="15" r="3" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="16" r="4" />
    </DoFScene>
);
export const TiltShiftDofIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <path d="M2 8 L22 16" strokeWidth="8" stroke="currentColor" opacity="0.2" />
        <path d="M2 8 L22 16" />
        <circle cx="6" cy="15" r="3" opacity="0.5"/>
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="16" r="4" opacity="0.5"/>
    </DoFScene>
);
export const SelectiveFocusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <DoFScene {...props}>
        <circle cx="12" cy="12" r="5" strokeDasharray="2 2" opacity="0.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </DoFScene>
);


// Illustrative Lighting Icons
const LightingScene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
        <ellipse cx="12" cy="17" rx="5" ry="1.5" />
    </svg>
);
export const NaturalWindowLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <rect x="2" y="4" width="6" height="8" rx="1"/>
        <path d="M8 8 l4 2 M8 12 l4 2"/>
    </LightingScene>
);
export const GoldenHourIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M2 14 A 10 5 0 0 1 22 14" />
        <path d="M2 14 l4 -4 M22 14 l-4 -4 M12 14 l0 -4" />
    </LightingScene>
);
export const HardLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <circle cx="6" cy="6" r="2"/>
        <path d="M8 6 l4 3 M17 15.5 l-5 1.5 l5 1.5 z" fill="currentColor" opacity="0.5"/>
    </LightingScene>
);
export const SoftDiffusedLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <circle cx="6" cy="6" r="2"/>
        <rect x="9" y="8" width="1" height="6" />
        <path d="M10 9 l3 1 M10 13 l3 1"/>
        <path d="M17 15.5 l-5 1.5 l5 1.5 z" fill="currentColor" opacity="0.2"/>
    </LightingScene>
);
export const OverheadLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M9 4 h6 v3 l-3 2 l-3 -2 z" />
        <path d="M12 9 v2" />
    </LightingScene>
);
export const SideLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M4 14 h-2 v6 h2 z M4 17 l3 0" />
    </LightingScene>
);
export const BacklightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M20 14 h2 v6 h-2 z M20 17 l-3 0" />
        <path d="M7.5 16.5 A 4.5 1.0 0 0 1 12 16 A 4.5 1.0 0 0 1 16.5 16.5" strokeDasharray="2 2" />
    </LightingScene>
);
export const LowKeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <rect x="1" y="1" width="22" height="22" opacity="0.3" fill="currentColor" />
        <path d="M4 14 h-2 v6 h2 z M4 17 l3 0" />
    </LightingScene>
);
export const HighKeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M3 3 l2 2 M21 3 l-2 2 M12 3 v2" opacity="0.5" />
        <path d="M4 14 h-2 v6 h2 z M4 17 l3 0" opacity="0.5" />
        <path d="M20 14 h2 v6 h-2 z M20 17 l-3 0" opacity="0.5" />
    </LightingScene>
);
export const StudioLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <rect x="3" y="8" width="5" height="7" rx="1" />
        <path d="M8 11.5 l2 1" />
        <path d="M5.5 15 v3 l-1 1 M5.5 18 h2" />
    </LightingScene>
);
export const CandlelightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M4 16 h2 v4 h-2 z" />
        <path d="M5 16 q 0 -2 1 -2 t 1 2" />
    </LightingScene>
);
export const NeonLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <path d="M4 4 C 8 4, 6 8, 10 8 S 8 12, 12 12" stroke="cyan" strokeWidth="2" />
        <path d="M14 6 C 18 6, 16 10, 20 10" stroke="magenta" strokeWidth="2" />
    </LightingScene>
);
export const MixedLightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <rect x="2" y="4" width="6" height="8" rx="1"/>
        <path d="M8 8 l4 2"/>
        <rect x="18" y="8" width="5" height="7" rx="1" />
        <path d="M18 11.5 l-2 1" />
    </LightingScene>
);
export const FlashBounceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <rect x="18" y="10" width="4" height="2" rx="0.5" />
        <path d="M18 11 l-6 -8 h-1 l6 8" />
        <path d="M11 3 l3 2 M11 3 l-1 3" />
    </LightingScene>
);
export const ColoredGelsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <LightingScene {...props}>
        <circle cx="6" cy="6" r="2"/>
        <rect x="9" y="8" width="1" height="6" stroke="cyan" opacity="0.5" fill="cyan" />
        <path d="M10 9 l3 1 M10 13 l3 1" stroke="cyan" />
    </LightingScene>
);