import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar () {
    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Movie Manager
            </Typography>
            <Button>
                Name1
            </Button>
            <Button>
                Name2
            </Button>
        </Toolbar>
    </AppBar>
}

export default Navbar;