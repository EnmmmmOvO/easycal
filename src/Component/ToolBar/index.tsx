import { Box } from '@mui/material';
import React, { useContext } from 'react';
import PageContext from '../../Context/pageContext';

const ToolBar = () => {
  const pages = ['Total', 'Amount'];
  const {page, setPage} = useContext(PageContext);
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      direction: 'column',
      display: 'flex',
      boxSizing: 'border-box',
      zIndex: 10,
      cursor: 'pointer',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }}>
      {pages.map((p, number) => (
        <Box
          key={p}
          sx={{
            display: 'flex',
            width: '33.3%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 11,
            fontSize: '1rem',
            backgroundColor: number === page ? '#fff' : '',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onClick={() => setPage(number)}
        >
          {p}
        </Box>
      ))}
    </Box>
  )
}

export default ToolBar;