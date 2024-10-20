import React from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    error: {
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
    },
});

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.error}>
            <img src={'/Assets/Images/pngegg.png'} style={{ width: '800px', height: '550px' }} alt="not found" />
        </div>
    )
}

export default NotFound;