import { createContext, MutableRefObject } from 'react';

interface DataProps {
  audco_usdt: number;
  lock: boolean;
  send: MutableRefObject<boolean>;
  usdt_aud: number;
  bnb_usdt: number;
  audco_aud: number;
  setAudco_usdt: (a: number) => void;
  setLock: (a: boolean) => void;
  update: () => void;
}

const DataContext = createContext<DataProps>({
  audco_usdt: 0,
  lock: false,
  send: { current: false },
  usdt_aud: 0,
  bnb_usdt: 0,
  audco_aud: 0,
  setAudco_usdt: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  },
  setLock: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  },
  update: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  }
});

export default DataContext;
