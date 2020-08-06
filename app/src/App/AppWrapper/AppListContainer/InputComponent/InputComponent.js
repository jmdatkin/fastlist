import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import './InputComponent.css';

function InputComponent(props) {
  return (
    <Box className="InputComponent" minHeight="50px">
      <TextField autoFocus id="outlined-basic" fullWidth variant="outlined" placeholder="New item"
        onChange={props.onChangeHandler}
        onKeyPress={props.onKeyPressHandler}>
      </TextField>
    </Box>
  );
}

export default InputComponent;