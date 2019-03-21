import React, { Component } from 'react';
import firebase from 'firebase/app';
import auth from './config/fire.js';


class Signup extends Component
{
constructor(props)
{
	super(props);
	this.state= 
	{
		username: '',
		display: '',
		password: ''
	}
}	
	handlesubmit = (e) =>
	{
		e.preventDefault();
	    
		//
		firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then(
  (data) => {

	const { user } = data
	if (user) {
      user.updateProfile({
         displayName: this.state.display
        
      })
	  
    }
})
      
    }


		
		//
		
	
	handlechange = (e) =>
	{
		this.setState 
		(
		{ [e.target.id]: e.target.value}
		
		)
		
	}
	
	googlesign =(e) => { var provider = new firebase.auth.GoogleAuthProvider(); firebase.auth().signInWithPopup(provider).then(function(result) { var token = result.credential.accessToken; var user = result.user; }).catch(function(error) { var errorCode = error.code; var errorMessage = error.message; var email = error.email; var credential = error.credential; }); }
	
	
	
	render()
	{
		return(

			  <div id="modal-signup">
			  <form id="signup-form" onSubmit = {this.handlesubmit} >
			  <input type="text" id="username" onChange = {this.handlechange} placeholder="Enter your email" /> <br /> <br />
			  <input type="text" id="display" onChange = {this.handlechange} placeholder="Enter your display name" /> <br /> <br />
			  <input type="password" id="password" onChange={this.handlechange} placeholder="Set a password" /> <br /><br />
			  <button type="submit" id="signup-btn"> Signup</button> <hr />
			  </form> 
			   <button id="google-signup" onClick={this.googlesign} > <strong>Signup with Google</strong></button>
			 
			  </div>


			)
	}
}

export default Signup ;