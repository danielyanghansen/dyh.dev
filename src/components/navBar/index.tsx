import React from 'react';

import { Link } from 'react-router-dom';
import './navBar.css';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const NavBar: React.FC = () => {
  return (
    <>
      <Box className="navBarBox">
        <Toolbar className="toolBar">
          <Box className="box">
            <Link className="navLink" to="/" color="white">
              Home
            </Link>
          </Box>
          <Box className="box">
            <Link className="navLink" to="/model" color="white">
              Scene
            </Link>
          </Box>
          <Box className="box">
            <Link className="navLink" to="/landing" color="inherit">
              Landing
            </Link>
          </Box>
        </Toolbar>
        <Box className="pullDownContainer">
          <Box className="pullDownTab">
            <Typography variant="h4" fontFamily={'monospace'}>
              MENU
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
