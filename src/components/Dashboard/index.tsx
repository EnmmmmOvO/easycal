import React from 'react';
import { View } from '@tarojs/components';
import RateBoard from './rateBoard';
import './index.scss';
import ToolBar from '../ToolBar';

const Dashboard: React.FC<any> = ({ children }) => {

  return (
    <View className='outer-frame'>
      <RateBoard />
      <View style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: 20 }}>
        <View className='outer-tool-bar'><ToolBar /></View>
      </View>
      <View className='outer-page'>
        {children}
      </View>
    </View>
  )
}

export default Dashboard;
