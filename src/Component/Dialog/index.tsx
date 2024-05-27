import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import DataContext from '../../Context/dataContext';
import DialogContext from '../../Context/dialogContext';
import SnackbarContext from '../../Context/snackbarContext';

export default function AlertDialog() {
  const { open, setOpen } = useContext(DialogContext);
  const { audco_usdt, setAudco_usdt } = useContext(DataContext);
  const { setLock } = useContext(DataContext);
  const { setMessage, setSnackOpen } = useContext(SnackbarContext);

  const handleClose = () => {
    setMessage("AUDCO 汇率锁定");
    setSnackOpen(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setLock(false);
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
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
            margin="dense"
            label="AUDOC Rate"
            type="number"
            value={audco_usdt}
            onChange={(e) => setAudco_usdt(Number(e.target.value))}
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
