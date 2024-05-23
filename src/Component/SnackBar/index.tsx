import React, { useContext } from 'react';
import { Button, Snackbar } from '@mui/material';
import snackbarContext from '../../Context/snackbarContext';

const SnackBar = () => {
  const { snackOpen, setSnackOpen, message } = useContext(snackbarContext);

  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={2000}
      onClose={() => setSnackOpen(false)}
      message={message}
      action={
        <React.Fragment>
          <Button onClick={() => setSnackOpen(false)} sx={{ color: 'white' }}>Close</Button>
        </React.Fragment>
      }
    />
  );
}

export default SnackBar;