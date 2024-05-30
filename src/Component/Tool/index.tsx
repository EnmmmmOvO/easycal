import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useContext, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import DataContext from '../../Context/dataContext';
import LockIcon from '@mui/icons-material/Lock';
import { Language, LockOpen } from '@mui/icons-material';
import DialogContext from '../../Context/dialogContext';
import SnackbarContext from '../../Context/snackbarContext';
import { updateAudco_usdt } from '../../App';
import LangContext from '../../Context/langContext';

const Update = () => {
  const { update, lock, setAudco_usdt, send, setLock } = useContext(DataContext);
  const { setOpen } = useContext(DialogContext);
  const { lang, setLang, content } = useContext(LangContext);

  const { setSnackOpen, setMessage } = useContext(SnackbarContext);
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    update();
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 500);

  };

  const handleLangClick = () => {
    if (lang === 'zh') {
      setLang('en');
      setMessage('Switch English');
      setSnackOpen(true);
    } else {
      setLang('zh');
      setMessage('切换成中文');
      setSnackOpen(true);
    }
  }

  const handleLockClick = () => {
    if (lock) {
      setLock(false);
      setMessage(content.unlock);
      setSnackOpen(true);
      updateAudco_usdt()
        .then(audco_usdt => {
          if (!audco_usdt.data.last) throw new Error('API Fetch Fail');
          setAudco_usdt(Number(audco_usdt.data.last))
          setMessage(content.unlock);
        })
        .catch(() => {
          setSnackOpen(false);
          setMessage(content.updateError);
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
        sx={{ position: 'fixed', bottom: 40, right: 6 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Update"
          icon={<RefreshIcon className={rotating ? "rotate" : ""}/>}
          tooltipTitle="Update Data"
          onClick={handleClick}
          />
        <SpeedDialAction
          key="Lock Rates"
          icon={lock ? <LockIcon /> : <LockOpen />}
          tooltipTitle="Lock Rates"
          onClick={handleLockClick}
          />
        <SpeedDialAction
          key="lang"
          icon={<Language />}
          tooltipTitle="Switch Language"
          onClick={handleLangClick}
          />
      </SpeedDial>
    </Box>
  )
}

export default Update;