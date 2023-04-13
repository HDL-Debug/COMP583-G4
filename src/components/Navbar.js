import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/Colors';

import { useNavigate } from "react-router-dom";

const styles = {
    nav_button: {
        marginLeft: 10
    }
}

const navs = [
    {
        name: "Dashboard",
        nav: "../dashboard"
    },
    {
        name: "Customers",
        nav: "../dashboard"
    }
]

function Navbar () {
    const navigate = useNavigate();

    return <ThemeProvider theme={theme}>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Movie Manager
            </Typography>
            {navs.map(e => <Button color="white" style={styles.nav_button} onClick={() => navigate(e.nav)}>
                {e.name}
            </Button>)}
        </Toolbar>
    </AppBar>
    </ThemeProvider>;
}

export default Navbar;