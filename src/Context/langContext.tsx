import { createContext } from 'react';

interface LangContextProps {
  lang: string;
  setLang: (lang: string) => void;
  content: { [key: string]: string };
}

const LangContext = createContext<LangContextProps>({
  lang: 'zh',
  setLang: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  },
  content: {},
});

export default LangContext;

