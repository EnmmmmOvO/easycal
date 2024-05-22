import { AtList } from 'taro-ui';
import { Image, Picker, View } from '@tarojs/components';
import './index.scss';
import arrow from '../../../static/arrow_right.svg';

const Select = ({ options, pic, type, setType }) => {

  return (
    <Picker
      mode='selector'
      range={options}
      onChange={(e) => setType(Number(e.detail.value))}
      className='select'
    >
      <AtList className='select-list'>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}><Image src={pic[type]} className='icon' /></View>
          <View>{options[type]}</View>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <Image src={arrow} className='icon' style={{ height: '24px', transform: 'rotate(90deg)' }} />
        </View>
      </AtList>
    </Picker>
  );
}

export default Select;
