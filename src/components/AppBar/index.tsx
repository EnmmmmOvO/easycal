import { Image, View } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

const AppBar = () => {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 500);
  }

  return (
    <View className='app-bar'>
      <View className='tool-bar'>
        <View className='box1'>
          <View>
            <Image src={require('../../../static/logo.png')} style={{ height: '23px', width: '68px' }} />
          </View>

          <View onClick={handleClick}>
            <Image src={require('../../../static/settings.svg')} className={`settings-icon ${rotate ? 'rotate' : ''}`} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default AppBar;
