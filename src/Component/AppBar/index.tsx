import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


const CustomerAppBar = () => {
  return (
    <AppBar sx={{ backgroundColor: 'white', height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <Box>
            <img src={`${process.env.PUBLIC_URL}/static/logo.png`} alt="logo" style={{ height: 23 }}/>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: 'black' }}>EasyCal</Typography>
          </Box>

          <Box sx={{ ml: 5 }}>
            <SettingsIcon sx={{ color: 'black' }}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CustomerAppBar;