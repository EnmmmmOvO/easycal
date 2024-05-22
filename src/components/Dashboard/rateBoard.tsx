import  { useContext } from 'react';
import { View } from '@tarojs/components';
import DataContext from '../../contexts/dataContext';
import './index.scss';
import Line from './line';


const RateBoard = () => {
  const { audco_usdt, bnb_usdt, usdt_aud } = useContext(DataContext);

  return (
    <View className='table'>
      <Line coin1='AUDCO' coin2='USDT' rate={audco_usdt} check />
      <Line coin1='BNB' coin2='USDT' rate={bnb_usdt} check />
      <Line coin1='USDT' coin2='AUD' rate={usdt_aud} check={false} />
    </View>
  );
}

export default RateBoard;
