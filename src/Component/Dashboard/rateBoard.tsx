import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import DataContext from '../../Context/dataContext';
import Line from './line';
import PageContext from '../../Context/pageContext';

const RateBoard = () => {
  const { audco_usdt, usdt_aud, bnb_usdt, audco_aud } = useContext(DataContext);
  const { page } = useContext(PageContext);

  return (
    <Grid container sx={{ backgroundColor: 'white', borderRadius: '10px', mb: 2, p: 1, boxSizing: 'border-box' }}>
      {page !== 3
        ? <>
          <Line coin1="AUDCO" coin2="USDT" rate={audco_usdt} check={true} />
          <Line coin1={'BNB'} coin2={'USDT'} rate={bnb_usdt} check={true} />
          <Line coin1="USDT" coin2="AUD" rate={usdt_aud}  check={false} />
        </>
        : <>
          <Line coin1="AUDCO" coin2="AUD" rate={audco_aud} check={false}/>
        </>
      }


    </Grid>
  );
}

export default RateBoard;