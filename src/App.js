import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route } from 'react-router-dom';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import Post from './post.js';
import Content from './content.js';
import Navbar from './navbar.js';
class App extends Component {
	
	
	
  render() {
    return (
	<BrowserRouter >
      <div>
	  <Navbar />
	  <Route exact path ='/' component={Signup} />
	  <Route exact path ='/login' component={Login} />
	  <br />
	  <Route exact path ='/home' component={Content} />
      
	  <br /> <br />
	  

	  
	  <br />
	  
	 
      </div>
	  </BrowserRouter>
    );
  }
}

export default App;
