import React from 'react';
import { TextField, Button } from '@material-ui/core';
import "../LoginRegisterForm.css";

function LoginForm(props) {

    return (
        <div className="LoginForm">
            <form method="POST" submit={`${process.env.PUBLIC_URL}/login`}>
                <TextField label="Username" variant="outlined" /><br/><br/>
                <TextField label="Password" variant="outlined" />
                <Button type="submit" variant="contained" disableElevation>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;