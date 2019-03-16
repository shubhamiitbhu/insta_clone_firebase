import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Post from './post.js';

class App extends Component {
	
	
	
  render() {
    return (
      <div>
	  <Signup />
      <Login />
	  <br /> <br />
	  
	  <Home /> < br />
	  
	  <br />
      </div>
    );
  }
}

export default App;
