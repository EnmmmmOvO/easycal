import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../Context/dataContext';
import LangContext from '../Context/langContext';

const M2E = () => {
  const [data, setData] = useState(0);
  const [total, setTotal] = useState(0);
  const [switchData, setSwitchDate] = useState('0')
  const [value, setValue] = useState(0);

  const { content } = useContext(LangContext);

  const { audco_usdt, usdt_aud } = useContext(DataContext);

  useEffect(() => {
    switch (switchData) {
      case '0':
        setValue(total - (Math.pow(0.999, data) * total));
        break;
      case '1':
        setValue(total - (Math.pow(0.999, data * 30) * total));
        break;
      case '2':
        setValue(total - (Math.pow(0.999, data * 365) * total));
        break;
      default:
        break;
    }
  }, [audco_usdt, usdt_aud, total, data, switchData]);

  return (
    <Grid container spacing={2} sx={{ height: 100, mt: '3px', fontSize: 14 }}>
      <Grid item xs={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{height: 30}}
            src={`${process.env.PUBLIC_URL}/static/audco.png`}
            alt={'AUDCO'}
          />
        </Box>
         <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>AUDCO</Box>
      </Grid>

      <Grid item xs={8}>
        <TextField
          fullWidth
          variant="outlined"
          label="M2E Blance"
          placeholder="0"
          onChange={(e) => setTotal(Number(e.target.value))}
          />
      </Grid>

      <Grid item xs={8}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="0"
          label="Date"
          onChange={(e) => setData(Number(e.target.value))}
          />
      </Grid>

      <Grid item xs={4}>
        <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            multiline
            value={switchData}
            fullWidth
            label="Unit"
            sx={{
              '& .MuiSelect-select': {
                display: 'flex', direction: 'column', alignItems: 'center', borderRadius: 0
              },
            }}
            onChange={(e) => setSwitchDate(e.target.value)}
          >
            <MenuItem value='0' sx={{ display: 'flex', direction: 'column', alignItems: 'center' }}>
              {content.day}
            </MenuItem>
            <MenuItem value='1' sx={{ display: 'flex', direction: 'column', alignItems: 'center' }}>
              {content.month}
            </MenuItem>
            <MenuItem value='2' sx={{ display: 'flex', direction: 'column', alignItems: 'center' }}>
              {content.year}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/audco.png`} alt="logo" style={{ height: 16, marginRight: 10 }}/>
        AUDCO {content.pool}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/audco.png`} alt="logo" style={{ height: 16, marginRight: 10 }}/>
        AUDCO {content.destroy}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        {value.toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        {(value * 0.7).toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/usd.svg`} alt="logo" style={{ height: 16, marginRight: 10 }}/>
        {content.invest}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/aud.svg`} alt="logo" style={{ height: 16, marginRight: 10 }}/>
        {content.m2e}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
        $ {(total * audco_usdt * usdt_aud / 3).toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        $ {(value * 0.7 * audco_usdt * usdt_aud).toFixed(2)}
      </Grid>
    </Grid>
  )
}

export default M2E;