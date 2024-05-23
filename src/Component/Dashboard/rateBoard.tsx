import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import DataContext from '../../Context/dataContext';
import Line from './line';

const RateBoard = () => {
  const { audco_usdt, usdt_aud, bnb_usdt } = useContext(DataContext);

  return (
    <Grid container sx={{ backgroundColor: 'white', borderRadius: '10px', mb: 2, p: 1, boxSizing: 'border-box' }}>
      <Line coin1="AUDCO" coin2="USDT" rate={audco_usdt} check={true} />
      <Line coin1={'BNB'} coin2={'USDT'} rate={bnb_usdt} check={true} />
      <Line coin1="USDT" coin2="AUD" rate={usdt_aud}  check={false} />
    </Grid>
  );
}

export default RateBoard;