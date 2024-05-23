import { createContext } from 'react';

interface DialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextProps>({
  open: false,
  setOpen: () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DialogContext is not defined');
    }
  }
});

export default DialogContext;