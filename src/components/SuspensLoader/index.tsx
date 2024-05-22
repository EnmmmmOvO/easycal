import { useEffect } from 'react';
import { View } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import Taro from '@tarojs/taro';
import './index.scss';

const SuspenseLoader = () => {
  useEffect(() => {
    Taro.showLoading({
      title: 'Loading...',
    });

    return () => {
      Taro.hideLoading();
    };
  }, []);

  return (
    <View className='loader'>
      <AtActivityIndicator size={64} mode='center' />
    </View>
  );
}

export default SuspenseLoader;
