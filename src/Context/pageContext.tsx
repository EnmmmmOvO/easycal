import { createContext } from 'react';

interface PageProps {
  page: number;
  setPage: (page: number) => void;
  temp: number;
  setTemp: (temp: number) => void;
}

const PageContext = createContext<PageProps>({
  page: 0,
  setPage: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  },
  temp: -1,
  setTemp: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  },
});

export default PageContext;
