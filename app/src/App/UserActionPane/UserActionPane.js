import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IconButton, Divider, Button, Drawer, List, ListItem } from '@material-ui/core';
import './UserActionPane.css';
import UserSavedLists from './UserSavedLists/UserSavedLists.js';


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
                <ListItem className="LoggedInDisplay">
                    Logged in as:  <span>{props.currentUser !== null ? props.currentUser.username : ''}</span>
                </ListItem>
                <ListItem>
                    <Button onClick={props.exportAction}>
                        Export List
                    </Button>
                </ListItem>
                <ListItem>
                    <Button onClick={() => {props.handleUpload(); props.onClose()}}>
                        Upload List
                    </Button>
                </ListItem>
            </List>
            <Divider />
            <UserSavedLists
                userLists={props.userLists}
                putToEntryList={props.putToEntryList}
                closeDrawer={props.onClose} />
        </Drawer>
    );
}

export default UserActionPane;