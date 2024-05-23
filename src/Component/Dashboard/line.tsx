import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface LineProps {
  coin1: string;
  coin2: string;
  rate: number;
  check: boolean;
}

const Line = ({ coin1, coin2, rate, check }: LineProps) => {

  const pic: {[key: string]: string} = {'AUDCO' : 'audco.png', 'USDT' : 'usd.svg', 'BNB' : 'bnb.svg', 'AUD' : 'aud.svg'};
  return (
      <>
        <Grid item xs={4} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 1,
          pb: 1,
          borderBottom: check ? '1px solid #ebebeb' : ''
        }}>
          <Box sx={{ width: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 1 }}>
            <img src={`${process.env.PUBLIC_URL}/static/${pic[coin1]}`} alt="logo" style={{ height: 16 }}/>
          </Box>
          <Typography sx={{ width: 60 }}>{coin1}</Typography>
        </Grid>

        <Grid item xs={4} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 1,
          pb: 1,
          borderBottom: check ? '1px solid #ebebeb' : ''
        }}>
          <Box sx={{ width: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 1 }}>
            <img src={`${process.env.PUBLIC_URL}/static/${pic[coin2]}`} alt="logo" style={{ height: 16 }}/>
          </Box>
          <Typography sx={{ width: 60 }}>{coin2}</Typography>
        </Grid>

        <Grid item xs={4} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 1,
          pb: 1,
          borderBottom: check ? '1px solid #ebebeb' : ''
        }}>
          <Typography>{rate}</Typography>
      </Grid>
      </>
    )
}

export default Line;