import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function ToggleExpandButton(props) {

    if (props.toggled) {
        return (
            <ExpandMoreIcon className="Entry-expand-submenu"></ExpandMoreIcon>
        );
    }
    else {
        return (
            <ExpandMoreIcon className="Entry-expand-submenu"></ExpandMoreIcon>
        );
    }
}

export default ToggleExpandButton;