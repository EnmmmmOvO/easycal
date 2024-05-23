import { createContext } from 'react';

interface SnackbarContextProps {
  snackOpen: boolean;
  message: string;
  setSnackOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  snackOpen: false,
  message: '',
  setSnackOpen: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SnackbarContext is not defined');
    }
  },
  setMessage: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SnackbarContext is not defined');
    }
  }
});

export default SnackbarContext;