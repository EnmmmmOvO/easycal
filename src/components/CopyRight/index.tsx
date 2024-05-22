import { View } from '@tarojs/components';

const Copyright = ()=> {
  return (
    <View style={{ position: 'fixed', bottom: 20, display: 'flex', justifyContent: 'center', width: '100%', fontSize: 12 }}>
      {'© '}
      {new Date().getFullYear()}
      {' DCG. All rights reserved.'}
    </View>
  )
}

export default Copyright;
