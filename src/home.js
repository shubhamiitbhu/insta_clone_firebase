import React, {Component} from 'react';

import config from './config/fire.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();



class Home extends Component
{
	
	constructor(props)
	{
		super(props);
		this.state = 
		{
			filename: '',
			description: '',
			
		}
		
		
		
		
		
	}
	
	submitFile = (e) =>
	{
		e.preventDefault();
		
		
		var f = document.getElementById("file")
		var file = e.target.file.files[0];
		var filename = this.state.filename;
		if(filename)
		{
		var uploader = document.getElementById("uploader");
		
		var storeRef = storage.ref('Insta/').child(file.name);
		var task = storeRef.put(file);
		task.then(
		storage.ref('Insta/' + this.state.filename).getDownloadURL().then((url)=>{
			
			
			db.collection('Insta').add({
			description: this.state.description,
			imageURL: url,
			username: auth.currentUser.displayName,
			email : auth.currentUser.email,
			userid: auth.currentUser.uid,
			Likes: 0
		});
			
		}))
		
		
		
		
		
		
		
		
		task.on('state_changed', function progress(snapshot){
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
			uploader.value = percentage;
			
		})
		
		
		
		} else {alert("No files added!"); }
		
		
		
	}
	
	
	deschange =(e) =>
	{
		this.setState(
		{
			description: e.target.value
		}
		)
	}
	
	
	
	
	
	filechange = (e) =>
	{
		this.setState(
		{
		filename: e.target.files[0].name,
		}
		
	
	)
	console.log(this.state.filename);
	var uploader = document.getElementById("uploader");
		uploader.value = 0;
	 
	
	
	}
		
	
	
	
	
	
	
	render()
	{
		return(
		<div id="loggedIn">
		<form id="file-form" onSubmit = {this.submitFile} >
		<input type="file" id="file"  onChange= {this.filechange}/>
		<progress value="0" max="100" id="uploader" > 0%  </progress>
		
		
		
		<br />
		
		<input type="text" id="description" placeholder = "Add a description about your post! (Optional)"  onChange={this.deschange} /> <br />
		<button type="submit" id="post" > POST! </button>
		</form>
		
		</div>
		)
	}
}








export default Home;