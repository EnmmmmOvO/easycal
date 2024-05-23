import { Box } from '@mui/material';
import React from 'react';

const Background = () => {
  return (
    <Box sx={{
      width: '100vw',
      height: '60%',
      top: 0,
      left: 0,
      position: 'fixed',
      zIndex: -9999,
      backgroundColor: 'rgba(46, 66, 234, 1)',
      borderRadius: '15px'
    }} />
  )
}

export default Background;