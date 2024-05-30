import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';


const CustomerAppBar = () => {
  return (
    <AppBar sx={{ backgroundColor: 'white', height: '11%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <Box>
            <img src={`${process.env.PUBLIC_URL}/static/logo.png`} alt="logo" style={{ height: 23 }}/>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: 'black' }}>EasyCal</Typography>
          </Box>

          <Box sx={{ ml: 8 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CustomerAppBar;