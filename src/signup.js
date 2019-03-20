import React, { Component } from 'react';
import firebase from 'firebase/app';
import auth from './config/fire.js';


class Signup extends Component
{

	state= 
	{
		username: '',
		displayname: '',
		password: ''
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
         displayName: this.state.displayname
        
      })
	  window.location = '/home';
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
	googlesign =(e) =>
	{
		var provider = new firebase.auth.GoogleAuthProvider();
		
		firebase.auth().signInWithPopup(provider).then(function(result) {
 
  var token = result.credential.accessToken;
  
  var user = result.user;
 
}).catch(function(error) {
 
  var errorCode = error.code;
  var errorMessage = error.message;
  
  var email = error.email;
  
  var credential = error.credential;
 
});
	}
	
	
	
	
	render()
	{
		return(

			  <div id="modal-signup">
			  <form id="signup-form" onSubmit = {this.handlesubmit} >
			  <input type="text" id="username" onChange = {this.handlechange} /> <br /> <br />
			  <input type="text" id="display" onChange = {this.handlechange} /> <br /> <br />
			  <input type="password" id="password" onChange={this.handlechange} /> <br />
			  <button type="submit"> Signup</button>
			  </form>
			   <button id="google" onClick={this.googlesign} > <strong>Signup with Google</strong></button>
			  </div>


			)
	}
}

export default Signup ;