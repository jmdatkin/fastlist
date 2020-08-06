import React from 'react';
import { TextField, Button } from '@material-ui/core';
import "../LoginRegisterForm.css";

function LoginForm(props) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function loginSubmitHandler() {
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
        .then(response => response.text())
        .then(data => props.flashFeedbackMessage(data))
        // .then(data => console.log(data))
        .then(props.closeLoginAction())
        .catch(error => props.flashFeedbackMessage(error));
    // .catch(error => console.error('Error:', error));
    }

    return (
        <div className="LoginForm">
                <TextField className="FormInputField" onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth />
                <TextField className="FormInputField" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" fullWidth  />
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