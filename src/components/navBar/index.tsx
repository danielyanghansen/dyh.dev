import React from 'react';

import { Link } from 'react-router-dom';
import './navBar.css';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const toolBarBackgroundImage = '/images/moxin-autumn-banner-1.png';
const menuBackgroundImage = '/images/moxin-autumn-menu-1.png';

export const NavBar: React.FC = () => {
  return (
    <>
      <Box
        className="navBarBox"
        sx={{
          color: 'black',
        }}
      >
        <Toolbar
          className="toolBar"
          sx={{
            backgroundImage: `url(${toolBarBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        >
          {/* The website logo on the far left */}

          <Box className="box">
            <Link className="navLink" to="/model">
              Scene
            </Link>
          </Box>
          <Box className="box">
            <Link className="navLink" to="/landing">
              Landing
            </Link>
          </Box>
          <Box
            className="logoBox"
            sx={{
              paddingLeft: '7.5rem',
            }}
          >
            <Link className="navLink" to="/">
              <img
                src="/images/dyh-logo-autumn-moxin-rounded.png"
                alt="dyh - Daniel Yang Hansen"
                className="logoPicture"
              ></img>
            </Link>
          </Box>
        </Toolbar>
        <Box className="pullDownContainer">
          <Box
            className="pullDownTab"
            sx={{
              backgroundImage: `url(${menuBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          >
            <Typography variant="h4" fontFamily={'monospace'}>
              MENU
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
