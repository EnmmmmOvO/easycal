import React from 'react';
import { Typography } from '@mui/material';

const Copyright = ()=> {
  return (
    <Typography variant="body2" color="black" align="center" sx={{ position: 'fixed', bottom: 10, display: 'flex', justifyContent: 'center', width: '100%' }}>
      {'© '}
      {new Date().getFullYear()}
      {' DCG. All rights reserved.'}
    </Typography>
  )
}

export default Copyright;