import React, { lazy, useEffect, useRef, useState } from 'react';
import './App.css';
import DataContext from './Context/dataContext';
import Router, { Loader } from './router';
import PageContext from './Context/pageContext';
import DialogContext from './Context/dialogContext';
import SnackbarContext from './Context/snackbarContext';
import LangContext from './Context/langContext';

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

const updateAudcoAud = async () => {
  return fetch('https://api.daexglobal.com/pc/counter/search?type=OnlineBuy&coin=AUDCO&currency_code=AUD&amount=&page=1&ua=h5&language=en')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

const updateUsdt = async () => {
  return fetch('https://api.daexglobal.com/pc/counter/search?type=OnlineSell&coin=USDT&currency_code=AUD&amount=&page=1&ua=h5&language=en')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

const App = () => {
  const [lang, setLang] = useState<string>('zh');
  const [content, setContent] = useState<{ [key: string]: string }>({});

  const send = useRef(false);
  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState(false);
  const [audco_usdt, setAudco_usdt] = useState<number>(0);
  const [usdt_aud, setUsdt_aud] = useState<number>(0);
  const [bnb_usdt, setBnb_usdt] = useState<number>(0);
  const [audco_aud, setAudco_aud] = useState<number>(0);

  const [temp, setTemp] = useState<number>(-1);

  const [message, setMessage] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const lockRef = useRef(lock);

  useEffect(() => {
    import (`./Content/${lang}.json`)
      .then(data => setContent(data.default))
      .catch(_error => setLang('zh'));
  }, [lang]);

  const update = () => {
    Promise.all([updateAudco_usdt(), updateBnb(), updateUsdt(), updateAudcoAud()])
      .then(([audco_usdt, bnb_usdt, usdt_aud, audco_aud]) => {
        if (!lockRef.current) setAudco_usdt(Number(audco_usdt.data.last));
        setBnb_usdt(Number(bnb_usdt.data.last));
        setUsdt_aud(Number(usdt_aud.data[0].price));
        setAudco_aud(Number(audco_aud.data[0].price));
        if ((!lockRef.current && !audco_usdt.data.last) ||
          !bnb_usdt.data.last ||
          !usdt_aud.data[0].price ||
          !audco_aud.data[0].price) {
          throw new Error('API Fetch Fail');
        }
        setMessage(content.update || '汇率已更新');
        setSnackOpen(true);
      })
      .catch(() => {
        setMessage(content.updateError || '汇率更新失败');
        setSnackOpen(true);
        if (!send.current) {
          send.current = true;
          fetch('https://api.day.app/VhjbYDxaWG7YSkmrccfNYZ/EasyCal/API Fetch Fail').catch();
        }
      });
  }

  const updateRef = useRef<() => void>();

  updateRef.current = update;

  useEffect(() => {
    lockRef.current = lock;
  }, [lock]);

  useEffect(() => {
    update();
    const intervalId = setInterval(() => {
      if (updateRef.current) {
        updateRef.current();
      }
    }, 30000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line
  }, []);

  return (
    <SnackbarContext.Provider value={{ message, setMessage, snackOpen, setSnackOpen }}>
      <DialogContext.Provider value={{ open, setOpen }}>
        <LangContext.Provider value={{ lang, setLang, content }}>
          <PageContext.Provider value={{ page, setPage, temp, setTemp }}>
            <DataContext.Provider value={{ audco_usdt, lock, send, usdt_aud, bnb_usdt, setLock, setAudco_usdt, update, audco_aud }}>
              <CustomerAppBar />
              <Background />
              <Router />
              <Update />
              <CopyRight />
              <Dialog />
              <SnackBar />
            </DataContext.Provider>
          </PageContext.Provider>
        </LangContext.Provider>
      </DialogContext.Provider>
    </SnackbarContext.Provider>
  );
}

export default App;
