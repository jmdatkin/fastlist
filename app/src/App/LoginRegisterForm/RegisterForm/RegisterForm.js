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
            .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="RegisterForm">
        <span className="FormLabel">Register</span>
                <TextField onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" /><br/><br/>
                <TextField onChange={(e) => setPassword(e.target.value)} type="password" label="Password" variant="outlined" /><br/><br/>
                <Button type="submit" onClick={registerSubmitHandler} variant="contained" disableElevation>
                    Submit
                </Button>
        </div>
    );
}

export default RegisterForm;