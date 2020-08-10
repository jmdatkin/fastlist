import React from 'react';

function UserListLink(props) {

    function onClickHandler(e) {
        e.preventDefault();
        props.putToEntryList(props.list);
        props.closeDrawer();
    }

    return (
        <a style={{cursor: 'pointer'}}
        onClick={onClickHandler}>
            {props.list.title}
        </a>
    );
}

export default UserListLink;