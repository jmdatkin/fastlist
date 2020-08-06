import React from 'react';
import { AppBar, IconButton, Button, Toolbar, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './MenuBar.css';

function MenuBar(props) {

    return (
        <AppBar style={{'backgroundColor': 'grey'}} position="static" className="MenuBar">
            <Toolbar variant="dense">
                <Grid container
                    justify="space-between"
                    alignItems="center">
                    <Grid item>
                        <IconButton onClick={props.openDrawerAction} edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Button edge="end" variant="outlined" onClick={props.openLoginAction} className="LoginButton">Login/Register</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default MenuBar;