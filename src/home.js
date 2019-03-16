import React, {Component} from 'react';
import firebase from 'firebase/app';
import auth from './config/fire.js';
import storage from './config/fire.js';

class Home extends Component
{
	
	submitFile = (e) =>
	{
		e.preventDefault();
		var file = e.target.file.files[0];
		
		var storeRef = firebase.storage().ref('Insta/' + file.name);
		storeRef.put(file);
		
		
	}
	
	
	render()
	{
		return(
		<div>
		<form id="file-form" onSubmit = {this.submitFile} >
		<input type="file" id="file" />
		<input type="text" id="description" />
		<button type="submit"> Upload </button>
		</form>
		</div>
		)
	}
}

export default Home;