import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from './images/logo.svg';

const useStyles = makeStyles({
    header: {
        backgroundColor: 'skyblue',
        maxWidth: '1050px',
        margin: '0 auto', 
    },
    spacing: {
        color: 'black',
        fontSize: '18px',
        fontWeight: '600',
        textDecoration: 'none',
    }
});

const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar >

                <NavLink to="/" className={classes.spacing} style={{ paddingTop: 10, paddingLeft: 0, fontWeight: 'bold', fontSize: '1.1rem' }}><Logo width={100} height={80} />Weather in K-Landmarks</NavLink>
                <NavLink to="/all" className={classes.spacing} style={{ paddingTop: 5, marginLeft: 40, }}> All Comments</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;