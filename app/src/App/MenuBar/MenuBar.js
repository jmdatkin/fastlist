import React from 'react';
import { AppBar, IconButton } from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons';
import './MenuBar.css';

function MenuBar(props) {

    return (
        <AppBar position="fixed" className="MenuBar">
        <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
        </AppBar>
    )
}

export default MenuBar;