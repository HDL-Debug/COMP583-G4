import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { useNavigate } from "react-router-dom";

const styles = {
    nav_button: {
        marginLeft: 10
    }
}

const navs = [
    {
        name: "Dashboard",
        nav: "../dashboardcustomer"
    },
    {
        name: "Profile",
        nav: "../profilepagecustomer"
    }
]

function Navbar () {
    const navigate = useNavigate();

    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Movie Theater
            </Typography>
            {navs.map(e => <Button color="white" style={styles.nav_button} onClick={() => navigate(e.nav)}>
                {e.name}
            </Button>)}
        </Toolbar>
    </AppBar>;
}

export default Navbar;