import React from 'react';
import BrowserRouter from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MenuBar from './MenuBar/MenuBar.js';
import AppWrapper from './AppWrapper/AppWrapper.js';
import LoginRegisterForm from './LoginRegisterForm/LoginRegisterForm.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuBar></MenuBar>
      <LoginRegisterForm open={false} />
      <AppWrapper />
    </div>
  );
}

export default App;
