import { ReactInstance } from 'react';

declare module 'react-to-print' {
  interface UseReactToPrintOptions {
    content: () => ReactInstance | null;
    documentTitle?: string;
    onBeforeGetContent?: () => Promise<void>;
    onBeforePrint?: () => Promise<void>;
    onAfterPrint?: () => void;
    removeAfterPrint?: boolean;
    pageStyle?: string;
    copyStyles?: boolean;
  }

  export function useReactToPrint(options: UseReactToPrintOptions): () => void;
}