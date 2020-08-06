import React from 'react';
import './ToggleExpandButton.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function ToggleExpandButton(props) {

    if (props.isExpanded) {
        return (
            <ExpandLessIcon className="Entry-expand-submenu"
            onClick={(e) => props.entryExpandHandler(e,props.idx,props.isExpanded)}></ExpandLessIcon>
        );
    }
    else {
        return (
            <ExpandMoreIcon className="Entry-expand-submenu"
            onClick={(e) => props.entryExpandHandler(e,props.idx,props.isExpanded)}></ExpandMoreIcon>
        );
    }
}

export default ToggleExpandButton;