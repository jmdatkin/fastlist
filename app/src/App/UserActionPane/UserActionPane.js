import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Drawer, List, ListItem } from '@material-ui/core';
import './UserActionPane.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      }
}));

function UserActionPane(props) {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer}
            classes={{paper: classes.drawerPaper}}
            open={props.open}
            onClose={props.onClose}>
            <Divider />
            <List>
                <ListItem>
                    Logged in as: {(props.currentUser === null) ? '' : props.currentUser.username}
                </ListItem>
                <ListItem>
                    <Button onClick={props.exportAction}>
                        Export List
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default UserActionPane;