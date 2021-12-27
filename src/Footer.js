import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
// MUI
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles((theme) => ({
    conGrid: {
        padding: theme.spacing(4),
    },
    bluep: {
        color: "#EDB76F",
        marginLeft: theme.spacing(1),
    },
    p: {
        color: "#EDB76F",
        marginLeft: theme.spacing(1),
        textDecoration:'none',
    }, 
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container className={classes.conGrid}>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12} className={classes.conGrid}>
                <a className={classes.p}>Designed and coded with</a><FavoriteIcon fontSize="small" className={classes.p} color="secondary"/><a className={classes.p}>by</a><a className={classes.p} href="https://helisusannadev.herokuapp.com/">Heli Hyttinen</a><a className={classes.bluep}> &copy; {new Date().getFullYear()} </a>
            </Grid>
        </Grid>
    );
}


