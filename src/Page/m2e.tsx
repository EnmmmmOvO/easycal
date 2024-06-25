import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DataContext from '../Context/dataContext';
import LangContext from '../Context/langContext';
import PageContext from '../Context/pageContext';
import { Close } from '@mui/icons-material';

const M2E = () => {
  const [data, setData] = useState(0);
  const [total, setTotal] = useState(0);
  const [switchData, setSwitchDate] = useState('0')
  const [value, setValue] = useState(0);

  const input = useRef<HTMLInputElement>(null);
  const pool = useRef<HTMLInputElement>(null);

  const { content } = useContext(LangContext);
  const { temp, setTemp } = useContext(PageContext);

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

  useEffect(() => {
    if (temp !== -1) {
      if (pool.current) {
        pool.current.value = (temp * 3).toFixed(2);
      }
      if (input.current) {
        input.current.value = temp.toFixed(2);
      }
      setTotal(temp * 3);
      setTemp(-1);
    }

  // eslint-disable-next-line
  }, [temp]);

  return (
    <Grid container spacing={2} sx={{ height: 100, mt: '3px', fontSize: 14 }}>
      <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content.mintTotal}
      </Grid>

      <Grid item xs={8}>
        <TextField
          fullWidth
          inputRef={input}
          variant="outlined"
          placeholder="0.00"
          InputProps={{ endAdornment: <Close sx={{ fontSize: '14px' }} onClick={() => {
              if (input.current) {
                input.current.value = '';
              }
              if (pool.current) {
                pool.current.value = '';
              }
              setTotal(0);
          }} />}}
          onChange={(e) => {
            setTotal(Number(e.target.value) * 3);
            if (pool.current) {
              pool.current.value = (Number(e.target.value) * 3).toFixed(2);
            }
          }}
          />
      </Grid>

      <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content.m2eBalance}
      </Grid>

      <Grid item xs={8}>
        <TextField
          fullWidth
          inputRef={pool}
          variant="outlined"
          placeholder="0.00"
          InputProps={{ endAdornment: <Close sx={{ fontSize: '14px' }} onClick={() => {
              if (input.current) {
                input.current.value = '';
              }
              if (pool.current) {
                pool.current.value = '';
              }
              setTotal(0);
          }} />}}
          onChange={(e) => {
            setTotal(Number(e.target.value));
            if (input.current) {
              input.current.value = (Number(e.target.value) / 3).toFixed(2);
            }
          }}
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
        <img src={`${process.env.PUBLIC_URL}/static/audco.png`} alt="logo" style={{ height: 18, marginRight: 10 }}/>
        AUDCO {content.pool}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/audco.png`} alt="logo" style={{ height: 18, marginRight: 10 }}/>
        AUDCO {content.destroy}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        {value.toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        {(value * 0.7).toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/usdt.svg`} alt="logo" style={{ height: 18, marginRight: 10 }}/>
        {content.invest}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center', mt: 1 }}>
        <img src={`${process.env.PUBLIC_URL}/static/aud.svg`} alt="logo" style={{ height: 18, marginRight: 10 }}/>
        {content.m2e}
      </Grid>

      <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
        {(value * 0.7 * audco_usdt).toFixed(2)}
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        $ {(value * 0.7 * audco_usdt * usdt_aud).toFixed(2)}
      </Grid>
    </Grid>
  )
}

export default M2E;