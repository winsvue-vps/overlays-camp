import React from 'react';

interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  'seamless-poster'?: boolean;
  autoplay?: boolean;
  'environment-image'?: string;
  exposure?: string;
  'interaction-prompt-threshold'?: string;
  'shadow-intensity'?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'camera-orbit'?: string;
  'disable-pan'?: boolean;
  'disable-zoom'?: boolean;
  alt?: string;
  'interaction-prompt': 'auto' | 'none';
  'auto-rotate': boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
