import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

class Navbar extends Component
{
	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			name: ''
		}
		
		auth.onAuthStateChanged( user => {
			
			
			if(user) { console.log(user);
				
				const loggedIn = document.querySelectorAll('.logged_in');
				const loggedOut = document.querySelectorAll('.logged_out');
				loggedIn.forEach(item => item.style.display = 'block');
			loggedOut.forEach(item => item.style.display = 'none');
			}
			else
			{
				const loggedIn = document.querySelectorAll('.logged_in');
				const loggedOut = document.querySelectorAll('.logged_out');
				loggedIn.forEach(item => item.style.display = 'none');
			loggedOut.forEach(item => item.style.display = 'block');
			}
			
			
			this.setState(
			{name: user.displayName});
			
		
	});
	console.log(this.state.name);
	}
	
	
	
	
	
	logoutuser = (e) =>
	{	
	    console.log("signout");
		auth.signOut().then(this.props.history.push('login'))
		
		
	}
	
	
	render()
	{
		return(
		
			<div id="comment-form">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/signup"><strong>InstaClone</strong></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav"> 
      <Link to="/" class="logged_out">Signup <span class="sr-only">(current)</span></Link>
      <Link to="/login" class="logged_out" >Login</Link>
      <Link to="/home" class="logged_in">Home</Link>
	  <Link to='/login' onClick={this.logoutuser} class="logged_in">Logout</Link>
	   <Link to='/home' class="logged_in"> Logged in as <span id="nav"> {this.state.name}</span> </Link>
	  
	  
      
    </div>
  </div>
</nav>
			</div>
		)
	}
}

export default Navbar;