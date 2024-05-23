import React, { lazy, useEffect, useState } from 'react';
import './App.css';
import DataContext from './Context/dataContext';
import Router, { Loader } from './router';
import PageContext from './Context/pageContext';

const CustomerAppBar = Loader(lazy(() => import('./Component/AppBar')));
const Update = Loader(lazy(() => import('./Component/Update')));
const Background = Loader(lazy(() => import('./Component/Background')));
const CopyRight = Loader(lazy(() => import('./Component/Copyright')));

const App = () => {
  const [audco_usdt, setAudco_usdt] = useState<number>(0);
  const [usdt_aud, setUsdt_aud] = useState<number>(0);
  const [bnb_usdt, setBnb_usdt] = useState<number>(0);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    update();
    const intervalId = setInterval(() => update(), 15000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line
  }, []);

  const updateAudco_usdt = () => {
    fetch('https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=AUDCO&quote_unit=USDT')
      .then(response => response.json())
      .then(data => setAudco_usdt(Number(data.data.last)))
      .catch((error) => console.error('Error:', error))
  }

  const updateBnb = () => {
    fetch('https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=BNB&quote_unit=USDT')
      .then(response => response.json())
      .then(data => setBnb_usdt(Number(data.data.last)))
      .catch((error) => console.error('Error:', error))
  }

  const updateUsdt = () => {
    fetch('https://api.daexglobal.com/pc/counter/optimal?type=OnlineSell&coin=USDT&currency_code=AUD')
      .then(response => response.json())
      .then(data => setUsdt_aud(Number(data.data.average_price)))
      .catch((error) => console.error('Error:', error))
  }

  const update = () => {
    updateBnb();
    updateAudco_usdt();
    updateUsdt();
  }

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <DataContext.Provider value={{ audco_usdt, usdt_aud, bnb_usdt, update }}>
        <CustomerAppBar />
        <Background />
        <Router />
        <Update />
        <CopyRight />
      </DataContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
