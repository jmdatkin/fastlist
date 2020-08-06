import React from 'react';
import { TextField, Button } from '@material-ui/core';
import "../LoginRegisterForm.css";

function LoginForm(props) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    function validateUsername(username) {
        if (username === '') {
            setUsernameError("Username cannot be blank.");
            return false;
        }
        setUsernameError("");
        return true;
    }

    function validatePassword(password) {
        if (password === '') {
            setPasswordError("Password cannot be blank.");
            return false;
        }
        setPasswordError("");
        return true;
    }

    function handleResponse(response) {
        //Authentication failed
        if (response.status === 403) {
            response.text().then(data => setUsernameError(data));
        }
        else if (response.status === 200) {
            response.text().then(data => JSON.parse(data))
            .then(data => {
                console.log(data);
                localStorage.setItem("user",JSON.stringify(data.user));
                props.setCurrentUser(data.user);
                props.flashFeedbackMessage("Logged in successfully!");
                props.closeLoginAction();
            });
        }
        else {
            return response;
        }
    }


    async function loginSubmitHandler() {
        var usernameValid = validateUsername(username);
        var passwordValid = validatePassword(password);
        if ( usernameValid && passwordValid ) {
            setUsernameError('');
            setPasswordError('');
            var bodyObject = {
                "username": username,
                "password": password
            };
            await fetch('/login',
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
            // // .then(data => console.log(data))
            // .then(props.closeLoginAction())
            .catch(error => props.flashFeedbackMessage(error));
        }
    // .catch(error => console.error('Error:', error));
    }

    return (
        <div className="LoginForm">
                <TextField helperText={usernameError} error={usernameError !== ''} className="FormInputField" onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth />
                <TextField helperText={passwordError} error={passwordError !== ''} className="FormInputField" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" fullWidth  />
                <Button onClick={loginSubmitHandler} type="submit" variant="contained" disableElevation>
                    Log In
                </Button>
                <a onClick={props.toggleAction}><br /><br /> 
                    <span className="ToggleText noselect">
                        Don't have an account? Click here to sign up!
                    </span>
                </a>
        </div>
    );
}

export default LoginForm;