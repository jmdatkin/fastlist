import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoginForm from './LoginForm/LoginForm.js';
import RegisterForm from './RegisterForm/RegisterForm.js';

import "./LoginRegisterForm.css";

function LoginRegisterForm(props) {

    const [type, setType] = useState('login');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog className="LoginRegisterForm"
            onBackdropClick={props.closeLoginAction}
            fullScreen={fullScreen}
            maxWidth='sm' fullWidth
            open={props.open}>
            <DialogTitle>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item edge="start">
                        <span className="FormLabel noselect">
                            {(type === 'login') ?
                            "Login" :
                            "Register"}
                        </span>
                    </Grid>
                    <Grid item>
                        <IconButton className="DialogCloseButton" onClick={props.closeLoginAction}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {(type === 'login') ?
                <LoginForm
                    toggleAction={() => setType('register')}
                    flashFeedbackMessage={props.flashFeedbackMessage}
                    setCurrentUser={props.setCurrentUser}
                    closeLoginAction={props.closeLoginAction}/> :
                <RegisterForm
                    toggleAction={() => setType('login')}
                    flashFeedbackMessage={props.flashFeedbackMessage}
                    closeLoginAction={props.closeLoginAction} />}
            </DialogContent>
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