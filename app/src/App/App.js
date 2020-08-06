import React, { useEffect } from 'react';
import BrowserRouter from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuBar from './MenuBar/MenuBar.js';
import AppWrapper from './AppWrapper/AppWrapper.js';
import UserActionPane from './UserActionPane/UserActionPane.js';
import LoginRegisterForm from './LoginRegisterForm/LoginRegisterForm.js';
import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: "#fdfdfd",
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: "grey"
  }
}));

function App() {

  const classes = useStyles();
  const theme = useTheme();

  var [currentUser, setCurrentUser] = React.useState('');

  var [loginIsOpen, setLoginState] = React.useState(false);
  var [snackbarIsOpen, setSnackbarState] = React.useState(false);
  var [snackbarMessage, setSnackbarMessage] = React.useState('');
  var [drawerIsOpen, setDrawerState] = React.useState(false);

  var [entryList, modifyEntryList] = React.useState([]);

  var addEntry = function(entryObj) {
    modifyEntryList(entryList.concat(entryObj));
  };
  
  useEffect(() => {
    console.log("Checking for logged in user...");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      console.log(`Found user ${foundUser.username}`);
      setCurrentUser(foundUser);
    }
    else {
      console.log("Did not find a user");
    }
  }, []);

  return (
    <div className="App">
      <MenuBar
        openDrawerAction={() => setDrawerState(true)}
        openLoginAction={() => setLoginState(true)}
        classes={clsx(classes.appBar, {[classes.appBarShift]: drawerIsOpen})}
        logoutAction={() => {
          setCurrentUser(null);
          localStorage.clear();
        }}
        currentUser={currentUser}
      />
      <LoginRegisterForm
        flashFeedbackMessage={function(message){setSnackbarMessage(message);setSnackbarState(true);}}
        closeLoginAction={() => setLoginState(false)}
        setCurrentUser={setCurrentUser}
        open={loginIsOpen} />
      <UserActionPane
        classes={{drawer: classes.drawer, drawerPaper: classes.drawerPaper}}
        exportAction={() => console.log(entryList)}
        currentUser={currentUser}
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
