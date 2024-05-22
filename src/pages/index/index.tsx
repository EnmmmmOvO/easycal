import Taro from '@tarojs/taro';
import { lazy, useEffect, useState } from 'react'
import { AtMessage } from 'taro-ui';
import "taro-ui/dist/style/components/button.scss"
import './index.scss'
import DataContext from '../../contexts/dataContext';
import PageContext from '../../contexts/pageContext';
import Router, { Loader } from './router';

const AppBar = Loader(lazy(() => import('../../components/AppBar')));
const Update = Loader(lazy(() => import('../../components/Update')));
const Background = Loader(lazy(() => import('../../components/Background')));
const CopyRight = Loader(lazy(() => import('../../components/CopyRight')));


const Index = () => {
  const [audco_usdt, setAudco_usdt] = useState<number>(0);
  const [usdt_aud, setUsdt_aud] = useState<number>(0);
  const [bnb_usdt, setBnb_usdt] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    update();
    const intervalId = setInterval(() => update(), 150000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line
  }, []);

  const updateAudco_usdt = () => {
    Taro.request({
      url: 'https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=AUDCO&quote_unit=USDT',
      method: 'GET',
      success:  res => setAudco_usdt(Number(res.data.data.last)),
      fail: err => console.error('Error:', err)
    })
  }

  const updateBnb = () => {
    Taro.request({
      url: 'https://api.daexglobal.com/pc/exchange/24hr/statistics?coin=BNB&quote_unit=USDT',
      method: 'GET',
      success:  res => setBnb_usdt(Number(res.data.data.last)),
      fail: err => console.error('Error:', err)
    })
  }

  const updateUsdt = () => {
    Taro.request({
      url: 'https://api.daexglobal.com/pc/counter/optimal?type=OnlineSell&coin=USDT&currency_code=AUD',
      method: 'GET',
      success:  res => setUsdt_aud(Number(res.data.data.average_price)),
      fail: err => console.error('Error:', err)
    })
  }

  const update = () => {
    updateBnb();
    updateAudco_usdt();
    updateUsdt();
  }

  return (
    <DataContext.Provider value={{ audco_usdt, usdt_aud, bnb_usdt, update }}>
      <PageContext.Provider value={{ page, setPage }}>
        <AtMessage />
        <AppBar />
        <Update />
        <Router />
        <Background />
        <CopyRight />
      </PageContext.Provider>
    </DataContext.Provider>
  );
};

export default Index;

