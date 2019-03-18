import React, { Component } from 'react';
import firebase from 'firebase/app';
import auth from './config/fire.js';
import db from './config/fire.js' ;



class Login extends Component
{
	
	constructor(props)
	{
		super(props);
	this.state = 
	{
		username: '',
		password: '',
	}
	
	
	firebase.auth().onAuthStateChanged(user => {
	if(user)
	{
		console.log("User LoggedIn");
	}
	else
	{
		console.log("User SignedOut");
	}
});

	
	}
	
   
	handlesubmit = (e) =>
	{
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
	}
	
	changeuser = (e) =>
	{
		this.setState(
		{
			[e.target.id] : e.target.value
		}
		)
	}
	
	
	
	
	
	render()
	{
		return(

			  <div id="modal-login">
			  <form id="login-form" onSubmit = {this.handlesubmit} >
			  <input type="text" id="username" onChange= {this.changeuser} /> <br />
			  
			  <input type="text" id="password" onChange={this.changeuser} /> <br />
			  <button type="submit"> Login</button>
			  </form>
			  
			  
			  
			  </div>


			)
	}
}



export default Login ;