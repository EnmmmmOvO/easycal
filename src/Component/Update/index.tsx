import { Box, Button, Fab, Snackbar } from '@mui/material';
import React, { useContext, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import DataContext from '../../Context/dataContext';
import './index.css';

const Update = () => {
  const { update } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    update();
    setOpen(false);
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      setOpen(true);
    }, 500);

  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') { return }
    setOpen(false);
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 50,
      right: 16,
      zIndex: 1000
    }}>
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <RefreshIcon className={rotating ? "rotate" : ""}/>
      </Fab>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Rates have been synchronized"
        action={
          <React.Fragment>
            <Button onClick={() => setOpen(false)} sx={{ color: 'white' }}>Close</Button>
          </React.Fragment>
        }
      />
    </Box>
  )
}

export default Update;