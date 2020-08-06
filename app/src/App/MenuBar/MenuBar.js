import React from 'react';
import { AppBar, IconButton, Button, Toolbar, Grid } from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons';
import './MenuBar.css';

function MenuBar(props) {

    return (
        <AppBar style={{'backgroundColor': 'grey'}} position="static" className="MenuBar">
            <Toolbar variant="dense">
                <Grid container justify="space-between">
                    <Grid item>
                        <IconButton onClick={props.openDrawerAction} edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={props.openLoginAction} className="LoginButton">Login/Register</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default MenuBar;