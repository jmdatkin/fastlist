import React, { useEffect } from 'react';
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

  var [entryList, modifyEntryList] = React.useState([]);

  var addEntry = function(entryObj) {
    modifyEntryList(entryList.concat(entryObj));
  };
  
  // useEffect(() => {
  //   console.log("updated");
  // })

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
        exportAction={() => console.log(entryList)}
        open={drawerIsOpen}
        onClose={() => setDrawerState(false)}/>
      <AppWrapper
        entryList={entryList}
        modifyEntryList={modifyEntryList}
        addEntryAction={addEntry}/>
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
