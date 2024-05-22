import { createContext } from 'react';

interface DataProps {
  audco_aud: number;
  audco_usdt: number;
  usdt_aud: number;
  bnb_usdt: number;
  update: () => void;
}

const DataContext = createContext<DataProps>({
  audco_aud: 0,
  audco_usdt: 0,
  usdt_aud: 0,
  bnb_usdt: 0,
  update: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  }
});

export default DataContext;
