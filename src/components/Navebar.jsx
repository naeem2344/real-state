import React, { useState } from 'react'
import { Button, AppBar, Box, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const pages = [{name:'Real state',url: '/'}, {name: 'Auto mobile', url: '/auto-moble'}];
const Navebar = () => {
    const navigate = useNavigate();


    const handleNavigation = url => {
        navigate(url);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({name, url}) => (
                            <Button
                                key={name}
                                onClick={() => handleNavigation(url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navebar