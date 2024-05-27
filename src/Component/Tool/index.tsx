import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useContext, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import DataContext from '../../Context/dataContext';
import LockIcon from '@mui/icons-material/Lock';
import { LockOpen } from '@mui/icons-material';
import DialogContext from '../../Context/dialogContext';
import SnackbarContext from '../../Context/snackbarContext';
import { updateAudco_usdt } from '../../App';

const Update = () => {
  const { update, lock, setAudco_usdt, send, setLock } = useContext(DataContext);
  const { setOpen } = useContext(DialogContext);

  const { setSnackOpen, setMessage } = useContext(SnackbarContext);
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    update();
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 500);

  };

  const handleLockClick = () => {
    if (lock) {
      setLock(false);
      setMessage("Rates UnLocked");
      setSnackOpen(true);
      updateAudco_usdt()
        .then(audco_usdt => {
          if (!audco_usdt.data.last) throw new Error('API Fetch Fail');
          setAudco_usdt(Number(audco_usdt.data.last))
          setMessage('AUDCO 汇率已同步');
        })
        .catch(() => {
          setSnackOpen(false);
          setMessage('汇率获取错误');
          setSnackOpen(true);
          if (!send.current) {
            send.current = true;
            fetch('https://api.day.app/VhjbYDxaWG7YSkmrccfNYZ/EasyCal/API Fetch Fail').catch();
          }
        });
    } else {
      setLock(true);
      setOpen(true);
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