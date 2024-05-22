import { Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import './index.scss';


const TextField = ({
  fullWidth = false,
  variant = 'outlined',
  adornment = '',
  value,
  set,
}) => {

  const onChange = (e: any) => {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      set(e.target.value)
    } else {
      Taro.showToast({
        title: 'Please enter a valid number',
        icon: 'none'
      });
      set(0)
    }
  };

  return (
    <View className={`textfield ${fullWidth ? 'fullWidth' : ''} ${variant}`}>
      <View className='inputContainer'>
        {adornment && <View className='adornment'>{adornment}</View>}
        <Input
          type='digit'
          value={value}
          onInput={onChange}
          className='input'
        />
      </View>
    </View>
  );
};

export default TextField;
