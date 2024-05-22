import { useContext, useState } from 'react';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import DataContext from '../../contexts/dataContext';
import './index.scss';

const Update = () => {
  const { update } = useContext(DataContext);
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    update();
    setRotating(true);
    setTimeout(() => setRotating(false), 500);
    Taro.atMessage({
      'message': 'Data Synchronized',
      'type': 'success',
      'duration': 1000
    })
  };

  return (
    <View className='fixed-button'>
      <View className='fab' onClick={handleClick}>
        <Image src={require('../../../static/refresh.svg')} className={`refresh-icon ${rotating ? 'rotate' : ''}`} />
      </View>
    </View>
  )
}

export default Update;
