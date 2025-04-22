import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import styles from './App.css'

function App(){
  return(
    <Router>
      <Routes>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/welcome' element = {<Welcome/>}/>
      <Route path='/' element = {<Welcome/>}/>
      </Routes>
    </Router>
  );
}

export default App;