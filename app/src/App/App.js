import React from 'react';
import BrowserRouter from 'react-router-dom';
import AppWrapper from './AppWrapper/AppWrapper.js';
import LoginRegisterForm from './LoginRegisterForm/LoginRegisterForm.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginRegisterForm />
      <AppWrapper />
    </div>
  );
}

export default App;
