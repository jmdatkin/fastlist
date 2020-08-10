import React, { useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import UserListLink from './UserListLink/UserListLink.js';

function UserSavedLists(props) {
    console.log(props.userLists);
    return (
        <List>
            {props.userLists.map((val) =>
                <ListItem>
                    <UserListLink putToEntryList={props.putToEntryList}
                        closeDrawer={props.closeDrawer}
                        list={val}></UserListLink>
                </ListItem>
            )}
        </List>
    );
}

export default UserSavedLists;