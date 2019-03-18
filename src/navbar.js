import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

class Navbar extends Component
{
	logoutuser = (e) =>
	{	
	
		auth.signOut();
		
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
      <a class="nav-item nav-link active" href="/signup">Signup <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/login">Login</a>
      <a class="nav-item nav-link" href="/home">Home</a>
	  <a class="nav-item nav-link" href="/signup" onClick={this.logoutuser} >Logout</a>
	  
      
    </div>
  </div>
</nav>
			</div>
		)
	}
}

export default Navbar;