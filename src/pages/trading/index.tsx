import { Image, Text, View } from '@tarojs/components';
import { useContext, useEffect, useState } from 'react';
import './index.scss';
import TextField from '../../components/TextField';
import usd from '../../../static/usd.svg'
import aud from '../../../static/aud.svg'
import Select from '../../components/Select';
import bnbPic from '../../../static/bnb.svg'
import arrow from '../../../static/arrow.svg'
import audcoPic from '../../../static/audco.png'
import DataContext from '../../contexts/dataContext';

const Trading = () => {

  const { audco_usdt, usdt_aud, bnb_usdt } = useContext(DataContext);

  const [type, setType] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [bnb, setBnb] = useState<number>(0);
  const [audco, setAudco] = useState<number>(0);

  useEffect(() => {
    setAudco(((type == 0 ? total / usdt_aud : total) - (bnb * bnb_usdt)) / audco_usdt);
  }, [audco_usdt, usdt_aud, bnb_usdt, total, bnb, type]);

  return (
    <View style={{ width: '100%', marginTop: 30, marginBottom: 50 }}>
      <View className='line-box'>
        <View className='grid-line-6'>
          <Select options={['AUD', 'USDT']} pic={[aud, usd]} type={type} setType={setType} />
        </View>

        <View className='grid-line-6' style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ display: 'flex', alignItems: 'center' }}><Image src={bnbPic} className='show-icon' /></View>
            <View>BNB</View>
          </View>
        </View>


      </View>

      <View className='line-box'>
        <View className='grid-line-6'>
          <TextField fullWidth variant='outlined' adornment='$' value={total} set={setTotal} />
        </View>
        <View className='grid-line-6'>
          <TextField fullWidth variant='outlined' adornment='$' value={bnb} set={setBnb} />
        </View>
      </View>

      <View className='line-box' style={{ marginTop: 5, marginBottom: 20 }}>
        <Image src={arrow} style={{ transform: 'rotate(90deg)', height: '30px' }} />
      </View>

      <View className='line-box'>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}><Image src={audcoPic} className='show-icon' /></View>
          <View>AUDCO</View>
        </View>
      </View>

      <View className='line-box' style={{ marginTop: 10 }}>
        <Text>$ {audco.toFixed(2)}</Text>
      </View>

    </View>
  );
};

export default Trading;
