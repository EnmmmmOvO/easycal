import React from 'react';
import { Box } from '@mui/material';
import ToolBar from '../ToolBar';
import RateBoard from './rateBoard';

const Dashboard: React.FC<any> = ({ children }) => {

  return (
    <Box sx={{
      position: 'fixed',
      top: '12%',
      pt: 2,
      pl: 2,
      pr: 2,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <RateBoard />
      <Box sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
        <Box sx={{
          minHeight: 50,
          height: '6vh',
          backgroundColor: '#ebebeb',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }}>
          <ToolBar />
        </Box>

        <Box sx={{
          minHeight: 400,
          height: '94vh',
          width: '100%',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          display: 'flex',
          overflow: 'auto',
          boxSizing: 'border-box',
          p: 1
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
