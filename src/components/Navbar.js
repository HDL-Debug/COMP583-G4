import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/Colors';

const styles = {
    nav_button: {
        marginLeft: 10
    }
}

const navs = [
    {
        name: "Showtimes"
    },
    {
        name: "Customers"
    }
]

function Navbar () {
    return <ThemeProvider theme={theme}>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Movie Manager
            </Typography>
            {navs.map(e => <Button color="white" style={styles.nav_button}>
                {e.name}
            </Button>)}
        </Toolbar>
    </AppBar>
    </ThemeProvider>;
}

export default Navbar;