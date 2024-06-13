import React, { useContext, useRef } from 'react';
import {
  Box,
  Grid, InputAdornment,
  TextField, Typography
} from '@mui/material';
import DataContext from '../Context/dataContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Trading = () => {
  const {audco_aud} = useContext(DataContext);

  const audRef = useRef<HTMLInputElement>();
  const audcoRef = useRef<HTMLInputElement>();

  const handleAudChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audcoRef.current) {
      audcoRef.current.value = (value / audco_aud).toFixed(2);
    }
  };

  const handleAudcoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audRef.current) {
      audRef.current.value = (value * audco_aud).toFixed(2);
    }
  };

  return (
    <Grid container spacing={1} sx={{ height: 100, mt: 0 }}>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', mb: 2, mt: 1 }}>
        <Typography variant="h6">商家交易计算器</Typography>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
          <img
            style={{ height: 35, marginRight: 10}}
            src={`${process.env.PUBLIC_URL}/static/audco.jpg`}
            alt={'AUDCO'}
          />
          AUDCO
        </Box>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          variant="outlined"
          inputRef={audcoRef}
          onChange={handleAudcoChange}
          />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <SwapHorizIcon sx={{ fontSize: 50, transform: 'rotate(90deg)', color: '#2e42ea' }} />
      </Grid>

      <Grid item xs={4}>
        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
          <img
            style={{height: 20, marginRight: 20}}
            src={`${process.env.PUBLIC_URL}/static/aud.svg`}
            alt={'AUD'}
          />
          AUD
        </Box>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          variant="outlined"
          inputRef={audRef}
          onChange={handleAudChange}
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'right' }}>
        <Typography variant="body2" sx={{ textAlign: 'right', display: 'block' }}>
          Gas fee: 0.0001 BNB<br />
          A$: {audco_aud * 0.0001}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', mt: 3 }}>
        <Typography variant="body2">暂时没有考虑商家提现的3‰的AUDCO，转账DAEX的费用等，未来会考虑进去</Typography>
      </Grid>

    </Grid>
  );
}

export default Trading;