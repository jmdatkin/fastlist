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
        .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    }

    return (
        <div className="LoginForm">
            <span className="FormLabel">Login</span>
                <TextField onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" /><br/><br/>
                <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" /> <br/><br/>
                <Button onClick={loginSubmitHandler} type="submit" variant="contained" disableElevation>
                    Submit
                </Button>
        </div>
    );
}

export default LoginForm;