import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function ToggleButton(props) {
    if (props.isChecked) {
        return (
            <div className={`ToggleButton
                ${props.isChecked ? 'ToggleButton-checked' : ''}`}
                onClick={(e) => props.entryToggleHandler(e,props.idx,props.isChecked)}>
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            </div>
        );
    }
    else {
        return (
            <div className={`ToggleButton
                ${props.isChecked ? 'ToggleButton-checked' : ''}`}
                onClick={(e) => props.entryToggleHandler(e,props.idx,props.isChecked)}>
                    <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>
            </div>
        );
    }
    // <div className={`ToggleButton
    //     ${props.checked ? 'ToggleButton-checked' : ''}`}
    //     onClick={(e) => props.toggleHandler(e,props.idx,props.checked)}></div>
}

export default ToggleButton;