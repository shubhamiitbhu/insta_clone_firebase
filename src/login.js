import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

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

}

	
	
	
   
	handlesubmit = (e) =>
	{
		e.preventDefault();
		auth.signInWithEmailAndPassword(this.state.username, this.state.password).catch(err => { alert(err.message)});
		
		auth.onAuthStateChanged(user => {
			if(user)
			{window.location = '/home' ;}
		});
		
	}
	
	changeuser = (e) =>
	{
		this.setState(
		{
			[e.target.id] : e.target.value
		}
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

			  <div id="modal-login">
			  <form id="login-form" onSubmit = {this.handlesubmit} >
			  <input type="text" id="username" placeholder = "Enter your email here" onChange= {this.changeuser} /> <br />
			  <br />
			  <input type="text" id="password" placeholder= "Enter your password here" onChange={this.changeuser} /> <br />
			  <span id="btn"><button type="submit" > Login</button></span><hr /> <br />
			     <br />
				 <br /> <br /> <br /> 
			  </form>
			  <button id="google" onClick={this.googlesign} > <strong>Signin with Google</strong></button>
			 
			  
			  </div>


			)
	}
}



export default Login ;