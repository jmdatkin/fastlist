import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IconButton, Divider, Button, Drawer, List, ListItem } from '@material-ui/core';
import './UserActionPane.css';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//       },
//       drawerPaper: {
//         width: drawerWidth,
//       }
// }));

function UserActionPane(props) {
    
    return (
        <Drawer className={props.classes.drawer}
            classes={{paper: props.classes.drawerPaper}}
            open={props.open}
            onClose={props.onClose}> 
            <div className={props.classes.drawerHeader}>
            <IconButton style={{float: 'right'}} onClick={props.onClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem>
                    Logged in as: {props.currentUser !== null ? props.currentUser.username : ''}
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