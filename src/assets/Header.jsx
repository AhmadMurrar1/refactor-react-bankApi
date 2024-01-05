import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

function Header() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Bank
                </Typography>
                <Link href='/' color='inherit' sx={{ marginRight: 2 }}>
                    Home
                </Link>
                <Link href='/transactions' color='inherit'>
                    Transactions
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
