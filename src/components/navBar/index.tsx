import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navBar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const NavBar = () => {
    return (
        <>
            <Box className='navBarBox'>
                <Toolbar className='toolBar'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>

                    <Button className='navLinkButton'><Link to="/" color='white'>Home</Link></Button>
                    <Button color="inherit"><Link to="/landing">Landing</Link></Button>
                </Toolbar>
                <Box className='pullDownContainer'>
                    <Box className='pullDownTab'>
                        <Typography variant='h4' fontFamily={'monospace'}>MENU</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}