import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import "../LoginRegisterForm.css";

function RegisterForm(props) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    //Username 4-12 characters
    function validateUsername(username) {
        if (username === '') {
            setUsernameError("Username cannot be blank.");
            return false;
        }
        var regex = /^[a-zA-Z0-9]{4,12}$/;
        if (!regex.test(username)) {
            setUsernameError("Username must be between 4 and 12 characters long.");
            return false;
        }
        setUsernameError('');
        return true;
    }

    //Password 8-16 characters
    function validatePassword(password) {
        // var truthValue = true;
        if (password === '') {
            setPasswordError("Password cannot be blank");
            return false;
        }
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
        if (!regex.test(password)) {
            setPasswordError("Password must be between 8 and 16 characters long, and contain a mix of lowercase characters, uppercase characters, and digits.");
            return false;
        }
        setPasswordError('');
        return true;
    }

    function handleResponse(response) {
        if (response.status === 400) {
            response.text().then(data => setUsernameError(data));
        }
        else if (response.status === 200) {
            response.text().then(data => {
                console.log(data);
                props.flashFeedbackMessage("User successfully created!");
                props.closeLoginAction();
            });
        }
        //Unrecognized code or error
        else {
            return response;
        }
    }

    async function registerSubmitHandler() {
        var usernameValid = validateUsername(username);
        var passwordValid = validatePassword(password);
        if ( usernameValid && passwordValid ) {
            // setUsernameError(validateUsername(username));
            // setPasswordError(validatePassword(password));
        // }
        // else {
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
                .then(handleResponse)
                // .then(response => response.text())
                // .then(data => props.flashFeedbackMessage(data))
                // .then(props.closeLoginAction())
                .catch(error => props.flashFeedbackMessage(error));
        }
    }

    return (
        <div className="RegisterForm">
                <TextField helperText={usernameError} error={usernameError !== ''} className="FormInputField" onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth />
                <TextField helperText={passwordError} error={passwordError !== ''} className="FormInputField" onChange={(e) => setPassword(e.target.value)} type="password" label="Password" variant="outlined" fullWidth />
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