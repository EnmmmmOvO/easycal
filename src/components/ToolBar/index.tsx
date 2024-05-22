import { View } from '@tarojs/components';
import { useContext } from 'react';
import PageContext from '../../contexts/pageContext';
import './index.scss';


const ToolBar = () => {
  const pages = ['Convert', 'Trading', 'Trading2'];
  const {page, setPage} = useContext(PageContext);

  return (
    <View className='inner-tool-bar'>
      {pages.map((item, index) => (
        <View className='bar' key={item} onClick={() => setPage(index)} style={{ backgroundColor: page === index ? '#fff' : ''}} >
          {item}
        </View>
        ))}
    </View>
  );
}

export default ToolBar;
