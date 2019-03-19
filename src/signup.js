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
	
	
	
	render()
	{
		return(

			  <div id="modal-signup">
			  <form id="signup-form" onSubmit = {this.handlesubmit} >
			  <input type="text" id="username" onChange = {this.handlechange} /> <br />
			  <input type="text" id="displayname" onChange = {this.handlechange} /> <br />
			  <input type="password" id="password" onChange={this.handlechange} /> <br />
			  <button type="submit"> Signup</button>
			  </form>
			  </div>


			)
	}
}

export default Signup ;