import React, { lazy, useEffect, useRef, useState } from 'react';
import './App.css';
import DataContext from './Context/dataContext';
import Router, { Loader } from './router';
import PageContext from './Context/pageContext';
import DialogContext from './Context/dialogContext';
import SnackbarContext from './Context/snackbarContext';

const CustomerAppBar = Loader(lazy(() => import('./Component/AppBar')));
const Update = Loader(lazy(() => import('./Component/Tool')));
const Background = Loader(lazy(() => import('./Component/Background')));
const CopyRight = Loader(lazy(() => import('./Component/Copyright')));
const Dialog = Loader(lazy(() => import('./Component/Dialog')));
const SnackBar = Loader(lazy(() => import('./Component/SnackBar')));

export const updateAudco_usdt = async () => {
  return fetch('https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=AUDCO&quote_unit=USDT')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

const updateBnb = async () => {
    return fetch('https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=BNB&quote_unit=USDT')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  const updateUsdt = async () => {
    return fetch('https://api.daexglobal.com/pc/counter/optimal?type=OnlineSell&coin=USDT&currency_code=AUD')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

const App = () => {
  const send = useRef(false);
  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(false);
  const [audco_usdt, setAudco_usdt] = useState<number>(0);
  const [usdt_aud, setUsdt_aud] = useState<number>(0);
  const [bnb_usdt, setBnb_usdt] = useState<number>(0);

  const [message, setMessage] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);

  const lockRef = useRef(lock);

  useEffect(() => {
    lockRef.current = lock;
  }, [lock]);

  useEffect(() => {
    update()
    const intervalId = setInterval(() => update(), 15000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line
  }, []);

  const update = () => {
    Promise.all([updateAudco_usdt(), updateBnb(), updateUsdt()])
      .then(([audco_usdt, bnb_usdt, usdt_aud]) => {
        if (!lockRef.current) setAudco_usdt(Number(audco_usdt.data.last));
        setBnb_usdt(Number(bnb_usdt.data.last));
        setUsdt_aud(Number(usdt_aud.data.average_price));
        if ((!lockRef.current && !audco_usdt.data.last) || !bnb_usdt.data.last || !usdt_aud.data.average_price) {
          throw new Error('API Fetch Fail');
        }
        setMessage('汇率已同步');
        setSnackOpen(true);
      })
      .catch(() => {
        setMessage('汇率获取错误');
        setSnackOpen(true);
        if (!send.current) {
          send.current = true;
          fetch('https://api.day.app/VhjbYDxaWG7YSkmrccfNYZ/EasyCal/API Fetch Fail').catch();
        }
      });
  }

  return (
    <SnackbarContext.Provider value={{ message, setMessage, snackOpen, setSnackOpen }}>
      <DialogContext.Provider value={{ open, setOpen }}>
        <PageContext.Provider value={{ page, setPage }}>
          <DataContext.Provider value={{ audco_usdt, lock, send, usdt_aud, bnb_usdt, setLock, setAudco_usdt, update }}>
            <CustomerAppBar />
            <Background />
            <Router />
            <Update />
            <CopyRight />
            <Dialog />
            <SnackBar />
          </DataContext.Provider>
        </PageContext.Provider>
      </DialogContext.Provider>
    </SnackbarContext.Provider>
  );
}

export default App;
