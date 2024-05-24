import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Grid, InputAdornment,
  InputLabel,
  MenuItem,
  Select, TextField
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DataContext from '../Context/dataContext';

const Trading = () => {
  const {audco_usdt, usdt_aud, bnb_usdt} = useContext(DataContext);

  const [type, setType] = useState('0');
  const [total, setTotal] = useState(0);
  const [bnbAmount, setBnbAmount] = useState(0);
  const [audcoAmount, setAudcoAmount] = useState(0);

  const totalRef = React.useRef<HTMLInputElement>(null);
  const bnbRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTotal((audcoAmount * audco_usdt + bnbAmount * bnb_usdt) * (type === '0' ? usdt_aud : 1));
  }, [bnbAmount, audco_usdt, usdt_aud, bnb_usdt, type, audcoAmount]);

  const handleTotalClick = () => {
    const textarea = totalRef.current;
    if (!textarea) return;
    textarea.select();
  }

  const handleBnbClick = () => {
    const textarea = bnbRef.current;
    if (!textarea) return;
    textarea.select();
  }

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ height: 100, mt: 0 }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', mr: 2 }}>
          <img
            style={{height: 35, marginRight: 15}}
            src={`${process.env.PUBLIC_URL}/static/audco.png`}
            alt={'AUDCO'}
          />
          AUDCO
        </Box>
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
            inputRef={totalRef}
            variant="outlined"
            type="number"
            label="Number"
            value={audcoAmount}
            onClick={handleTotalClick}
            onChange={(e) => setAudcoAmount(Number(e.target.value))}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <TextField
            fullWidth
            inputRef={bnbRef}
            variant="outlined"
            type="number"
            label="Number"
            value={bnbAmount}
            onClick={handleBnbClick}
            onChange={(e) => setBnbAmount(Number(e.target.value))}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <img src={`${process.env.PUBLIC_URL}/static/arrow.svg`} alt='arrow' style={{ height: 30 ,marginTop: 5, transform: 'rotate(90deg)'}}/>
        </Box>
      </Grid>

      <Grid item xs={3} />
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
            onChange={handleChange}
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
      <Grid item xs={3} />

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          $ {total.toFixed(2)}
        </Box>
      </Grid>

    </Grid>
  );
}

export default Trading;