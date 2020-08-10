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

  const [listTitle, setListTitle] = React.useState('');
  var [entryList, modifyEntryList] = React.useState([]);
  const [userLists, updateUserLists] = React.useState([]);

  var addEntry = function(entryObj) {
    modifyEntryList(entryList.concat(entryObj));
  };

  //Extracts vital information to prepare list data to be stored in DB
  function exportList() {
    return entryList.map((val,idx) => {
      return {
        idx: idx,
        content: val.content,
        isChecked: val.isChecked
      };
    });
  }

  //Converts list data from the form returned by MongoDB to a form usable by Fastlist
  function MongoToApp(data) {
    return data.map((val) => {
      return {
        content: val.content,
        isChecked: val.isChecked,
        isExpanded: false,
        ref: React.createRef()
      };
    });
  }

  function putToEntryList(data) {
    console.log("putting list");
    console.log(data);
    setListTitle(data.title);
    modifyEntryList(MongoToApp(data.list));
  }

  //Uses JWT token to authorize retrieval of current user's saved lists
  async function retrieveUserSavedLists(user, callback) {
    function handleResponse(response) {
      if (response.status === 500) {
        console.log("Could not connect to server");
      }
      else if (response.status === 401) {
        console.log("User could not be authenticated");
      }
      else if (response.status === 200) {
        response.text().then(data => JSON.parse(data))
        .then(data => callback(data));
      }
    }

    return await fetch(`./userlists`,
      {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(handleResponse)
      // .then((data) => {
      //   console.log(data);
      //   data.text().then(data => JSON.parse(data))
      //   .then((data) => {
      //     callback(data);
      //   });
      // })
      .catch(error => console.log(error));
  }

  function flashFeedbackMessage(message) {
      setSnackbarMessage(message);
      setSnackbarState(true);
  }

  //Bundles exported list in object with user ID to be sent to DB
  function getListForUpload() {
    var genRandomTitle = (len) => {
      const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var str=''
      for (var i=0; i<len; i++) {
        let ranIdx = Math.floor(Math.random()*charset.length);
        str+=charset.substring(ranIdx,ranIdx+1);
      }
      return str;
    } 
    if (currentUser) {
      return {
        list: exportList(),
        title: listTitle || genRandomTitle(7),
        user_ID: currentUser._id
      };
    }
    else {
      console.log("User is not signed in");
      return {};
    }
  }


  async function uploadHandler(data) {    
    console.log("uploading!");
      function handleResponse(response) {
          if (response.status === 403) {
              console.log("Upload forbidden");
          }
          else if (response.status === 200) {
              console.log("Upload successful");
          }
      }

      await fetch('/submit',
      {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer <token>'
          }
      })
      .then(handleResponse)
      .catch(error => flashFeedbackMessage(error));
  }
  
  useEffect(() => {
    console.log("Checking for logged in user...");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      console.log(`Found user ${foundUser.username}`);
      setCurrentUser(foundUser);
      retrieveUserSavedLists(foundUser, (data) => updateUserLists(data));
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
        listTitle={listTitle}
        setListTitle={setListTitle}
        classes={clsx(classes.appBar, {[classes.appBarShift]: drawerIsOpen})}
        logoutAction={() => {
          setCurrentUser(null);
          localStorage.clear();
        }}
        currentUser={currentUser}
      />
      <LoginRegisterForm
        flashFeedbackMessage={flashFeedbackMessage}
        closeLoginAction={() => setLoginState(false)}
        setCurrentUser={setCurrentUser}
        open={loginIsOpen} />
      <UserActionPane
        classes={{drawer: classes.drawer, drawerPaper: classes.drawerPaper}}
        flashFeedbackMessage={flashFeedbackMessage}
        exportAction={() => console.log(exportList())}
        handleUpload={() => uploadHandler(getListForUpload())}
        userLists={userLists}
        putToEntryList={putToEntryList}
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
