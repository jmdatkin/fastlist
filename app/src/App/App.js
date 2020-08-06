import React from 'react';
import BrowserRouter from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MenuBar from './MenuBar/MenuBar.js';
import AppWrapper from './AppWrapper/AppWrapper.js';
import UserActionPane from './UserActionPane/UserActionPane.js';
import LoginRegisterForm from './LoginRegisterForm/LoginRegisterForm.js';
import './App.css';

function App() {
  
  var [loginIsOpen, setLoginState] = React.useState(false);
  var [snackbarIsOpen, setSnackbarState] = React.useState(false);
  var [snackbarMessage, setSnackbarMessage] = React.useState('');
  var [drawerIsOpen, setDrawerState] = React.useState(false);

  return (
    <div className="App">
      <MenuBar
        openDrawerAction={() => setDrawerState(true)}
        openLoginAction={() => setLoginState(true)}
      />
      <LoginRegisterForm
        flashFeedbackMessage={function(message){setSnackbarMessage(message);setSnackbarState(true);}}
        closeLoginAction={() => setLoginState(false)}
        open={loginIsOpen} />
      <UserActionPane
        open={drawerIsOpen}
        onClose={() => setDrawerState(false)}/>
      {/* <Drawer
        open={drawerIsOpen}
        onClose={() => setDrawerState(false)}>
      </Drawer> */}
      <AppWrapper />
      <Snackbar
        anchorOrigin={{horizontal: 'left',vertical:'bottom'}}
        open={snackbarIsOpen}
        message={snackbarMessage}
        autoHideDuration={5000}
        onClose={() => setSnackbarState(false)}/>
    </div>
  );
}

export default App;
