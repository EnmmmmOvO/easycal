import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Grid, InputAdornment,
  InputLabel,
  MenuItem,
  Select, TextField
} from '@mui/material';
import DataContext from '../Context/dataContext';
import Button from '@mui/material/Button';
import PageContext from '../Context/pageContext';
import LangContext from '../Context/langContext';

const Trading = () => {
  const { audco_usdt, usdt_aud, bnb_usdt, audco_aud_buy, lock } = useContext(DataContext);

  const { setPage, setTemp } = useContext(PageContext);

  const [type, setType] = useState('0');
  const [total, setTotal] = useState(0);
  const [bnbAmount, setBnbAmount] = useState(0);
  const [audcoAmount, setAudcoAmount] = useState(0);

  const { content } = useContext(LangContext);

  useEffect(() => {
    if (type === '0') {
      if (lock) {
        setAudcoAmount((total / usdt_aud - bnbAmount * bnb_usdt) / audco_usdt);
      } else {
        setAudcoAmount((total - bnb_usdt * bnbAmount * usdt_aud) / audco_aud_buy);
      }
    } else {
      setAudcoAmount((total - bnb_usdt * bnbAmount) / audco_usdt);
    }
  }, [total, bnbAmount, audco_usdt, usdt_aud, bnb_usdt, type, audco_aud_buy, lock]);

  return (
    <Grid container spacing={2} sx={{ height: 100, mt: 0 }}>
      <Grid item xs={6}>
        <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            multiline
            value={type}
            fullWidth
            label="Type"
            sx={{
              '& .MuiSelect-select': {
                display: 'flex', direction: 'column', alignItems: 'center', borderRadius: 0
              },
            }}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value='0' sx={{ display: 'flex', direction: 'column', alignItems: 'center' }}>
              <img
                style={{ height: 20, marginRight: 15 }}
                src={`${process.env.PUBLIC_URL}/static/aud.svg`}
                alt={'AUD'}
              />
              AUD
            </MenuItem>
            <MenuItem value='1' sx={{ display: 'flex', direction: 'column', alignItems: 'center' }}>
              <img
                style={{height: 20, marginRight: 15}}
                src={`${process.env.PUBLIC_URL}/static/usd.svg`}
                alt={'USD'}
              />
              USD
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', mr: 2 }}>
          <img
            style={{height: 35, marginRight: 15}}
            src={`${process.env.PUBLIC_URL}/static/bnb.svg`}
            alt={'BNB'}
          />
          BNB
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Total"
            placeholder='0'
            onChange={(e) => setTotal(Number(e.target.value))}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Number"
            placeholder="0"
            onChange={(e) => setBnbAmount(Number(e.target.value))}
            />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <img src={`${process.env.PUBLIC_URL}/static/arrow.svg`} alt='arrow' style={{ height: 30 ,marginTop: 5, transform: 'rotate(90deg)'}}/>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img
            style={{height: 35, marginRight: 20}}
            src={`${process.env.PUBLIC_URL}/static/audco.jpg`}
            alt={'AUDCO'}
          />
          AUDCO
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          {audcoAmount.toFixed(2)}
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button fullWidth onClick={() => {
          setTemp(audcoAmount);
          setPage(2);
        }}>{content.calculate}</Button>
      </Grid>

    </Grid>
  );
}

export default Trading;