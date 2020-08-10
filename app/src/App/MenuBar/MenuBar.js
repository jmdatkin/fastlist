import React from 'react';
import { AppBar, IconButton, Button, Toolbar, Grid, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './MenuBar.css';

function MenuBar(props) {

    const classes = props.classes;

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
                    <Grid item style={{flex: 1}}>
                        <TextField key="titleField"
                            variant="standard"
                            style={{maxWidth:350,marginLeft:60}}
                            placeholder="Title"
                            onChange={(e) => props.setListTitle(e.target.value)}
                            value={props.listTitle}>
                        </TextField>
                    </Grid>
                    <Grid item>
                        {(props.currentUser === '') ?
                        <Button edge="end" variant="outlined" onClick={props.openLoginAction} className="LoginButton">Log In/Register</Button> :
                        <Button edge="end" variant="outlined" onClick={props.logoutAction} className="LoginButton">Log Out</Button>}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default MenuBar;