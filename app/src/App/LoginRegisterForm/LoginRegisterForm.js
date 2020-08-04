import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import LoginForm from './LoginForm/LoginForm.js';
import RegisterForm from './RegisterForm/RegisterForm.js';

import "./LoginRegisterForm.css";

function LoginRegisterForm(props) {

    const [type, setType] = useState('login');

    return (
        <Box className="LoginRegisterForm">
            {(type === 'login') ? <LoginForm /> : <RegisterForm />} 
            <a onClick={() => setType(type === 'login' ? 'register' : 'login')}>
                <span className="ToggleText">{(type === 'login') ? "Don't have an account? Click here to sign up!" : "Already have an account? Click here to register"}
                </span></a>
        </Box>
    );
}

export default LoginRegisterForm;