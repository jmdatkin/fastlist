import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import LoginForm from './LoginForm/LoginForm.js';
import RegisterForm from './RegisterForm/RegisterForm.js';

import "./LoginRegisterForm.css";

function LoginRegisterForm(props) {

    const [type, setType] = useState('login');

    return (
        <Dialog className="LoginRegisterForm" open={props.open}>
            {(type === 'login') ? <LoginForm /> : <RegisterForm />} 
            <a onClick={() => setType(type === 'login' ? 'register' : 'login')}>
                <span className="ToggleText noselect">{(type === 'login') ? "Don't have an account? Click here to sign up!" : "Already have an account? Click here to log in!"}
                </span></a>
        </Dialog>
    );

    // return (
    //     <Box className="LoginRegisterForm">
    //         {(type === 'login') ? <LoginForm /> : <RegisterForm />} 
    //         <a onClick={() => setType(type === 'login' ? 'register' : 'login')}>
    //             <span className="ToggleText noselect">{(type === 'login') ? "Don't have an account? Click here to sign up!" : "Already have an account? Click here to log in!"}
    //             </span></a>
    //     </Box>
    // );
}

export default LoginRegisterForm;