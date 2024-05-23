import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useContext, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import DataContext from '../../Context/dataContext';
import LockIcon from '@mui/icons-material/Lock';
import { LockOpen } from '@mui/icons-material';
import DialogContext from '../../Context/dialogContext';
import SnackbarContext from '../../Context/snackbarContext';

const Update = () => {
  const { update, lock, setLock } = useContext(DataContext);
  const { setOpen } = useContext(DialogContext);

  const { setSnackOpen, setMessage } = useContext(SnackbarContext);
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    update();
    setMessage("Rates Synchronized");
    setSnackOpen(true);
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      setSnackOpen(false);
    }, 500);

  };

  const handleLockClick = () => {
    if (lock) {
      setMessage("Rates UnLocked");
      setSnackOpen(true);
      setLock(false);
    } else {
      setOpen(true);
      setLock(true);
    }
  }

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, zIndex: 9999, bottom: 0, right: 0, position: 'fixed' }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 50, right: 6 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Update"
          icon={<RefreshIcon className={rotating ? "rotate" : ""}/>}
          tooltipTitle="Update"
          onClick={handleClick}
          />
        <SpeedDialAction
          key="Lock Rates"
          icon={lock ? <LockIcon /> : <LockOpen />}
          tooltipTitle="Lock Rates"
          onClick={handleLockClick}
          />
      </SpeedDial>
    </Box>
  )
}

export default Update;