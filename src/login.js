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
		auth.signInWithEmailAndPassword(this.state.username, this.state.password).then(this.props.history.push('/home')).catch(err => { alert(err.message)});
		
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
			  <button type="submit" > Login</button>
			  </form>
			  
			  
			  
			  </div>


			)
	}
}



export default Login ;