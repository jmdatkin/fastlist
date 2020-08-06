import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import "../LoginRegisterForm.css";

function RegisterForm(props) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function registerSubmitHandler() {
        var bodyObject = {
            "username": username,
            "password": password
        };
        console.log(bodyObject);
        await fetch('/register',
            {
                method: 'POST',
                body: JSON.stringify(bodyObject),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(data => props.flashFeedbackMessage(data))
            .then(props.closeLoginAction())
            .catch(error => props.flashFeedbackMessage(error));
    }

    return (
        <div className="RegisterForm">
                <TextField className="FormInputField" onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth />
                <TextField className="FormInputField" onChange={(e) => setPassword(e.target.value)} type="password" label="Password" variant="outlined" fullWidth />
                <Button type="submit" onClick={registerSubmitHandler} variant="contained" disableElevation>
                    Register
                </Button><br /><br />
                <a onClick={props.toggleAction}>
                    <span className="ToggleText noselect">
                        Already have an account? Click here to log in!
                    </span>
                </a>
        </div>
    );
}

export default RegisterForm;