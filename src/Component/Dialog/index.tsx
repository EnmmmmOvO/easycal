import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useContext, useRef } from 'react';
import DataContext from '../../Context/dataContext';
import DialogContext from '../../Context/dialogContext';
import SnackbarContext from '../../Context/snackbarContext';
import LangContext from '../../Context/langContext';

export default function AlertDialog() {
  const { open, setOpen } = useContext(DialogContext);
  const { audco_usdt, setAudco_usdt } = useContext(DataContext);
  const { setLock } = useContext(DataContext);
  const { setMessage, setSnackOpen } = useContext(SnackbarContext);
  const { content } = useContext(LangContext);
  const ref = useRef<HTMLInputElement>(null);

  const handleClose = () => {

    if (ref.current) {
      const value = parseFloat(ref.current.value);
      if (!isNaN(value) && value > 0) {
        setAudco_usdt(value);
        setMessage(content.lock);
        setSnackOpen(true);
        setOpen(false);
      } else {
        setMessage(content.lockError);
        setSnackOpen(true);
      }
    }


  };

  const handleCancel = () => {
    setOpen(false);
    setLock(false);
  }

  return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Lock AUDCO Rates"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputRef={ref}
            margin="dense"
            label="AUDOC Rate"
            placeholder={audco_usdt.toString()}
            fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
