import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    header: {
        backgroundColor: 'lightGray',
        maxWidth: '1050px',
        margin: '0 auto', // Center the header
    },
    spacing: {
        paddingLeft: 20,
        color: 'black',
        fontSize: '18px',
        fontWeight: '500',
        textDecoration: 'none',
    }
});

const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar >
                <NavLink to="/" className={classes.spacing}>Weather in K-Landmarks</NavLink>
                <NavLink to="/detailpage/1" className={classes.spacing}>1번 포항그림 눌렀을 때 </NavLink>
                <NavLink to="all" className={classes.spacing}> All Comments</NavLink>
                <NavLink to="add" className={classes.spacing}> Add Comments</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;