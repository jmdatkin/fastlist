import React from 'react';
import { Button, Drawer, List, ListItem } from '@material-ui/core';
import './UserActionPane.css';

function UserActionPane(props) {

    return (
        <Drawer className="UserActionPane"
            open={props.open}
            onClose={props.onClose}>
            
            <List>
                <ListItem>
                    Logged in as:
                </ListItem>
                <ListItem>
                    <Button >
                        Export List
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default UserActionPane;