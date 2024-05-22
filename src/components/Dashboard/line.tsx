import { Image, View } from '@tarojs/components';
import audcoPic from '../../../static/audco.png';
import usdtPic from '../../../static/usd.svg';
import audPic from '../../../static/aud.svg';
import bnbPic from '../../../static/bnb.svg';

interface LineProps {
  coin1: string;
  coin2: string;
  rate: number;
  check : boolean;
}

const Line = ({ coin1, coin2, rate, check }: LineProps) => {
  const pic: {[key: string]: string} = {
    'AUDCO': audcoPic,
    'USDT': usdtPic,
    'AUD': audPic,
    'BNB': bnbPic,
  }

  return (
    <View className='line'>
      <View className='cell' style={{ borderBottom: check ? '1px solid #ebebeb' : '' }}>
        <View className='icon'><Image src={pic[coin1]} style={{ height: '16px' }} /></View>
        <View className='text'>{coin1}</View>
      </View>
      <View className='cell' style={{ borderBottom: check ? '1px solid #ebebeb' : '' }}>
        <View className='icon'><Image src={pic[coin2]} style={{ height: '16px' }} /></View>
        <View className='text'>{coin2}</View>
      </View>
      <View className='cell' style={{ borderBottom: check ? '1px solid #ebebeb' : '' }}>
        {rate}
      </View>
    </View>
  );
}

export default Line;
