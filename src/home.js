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
		
		
		
		var file = e.target.file.files[0];
		
		
	
		var storeRef = storage.ref('Insta/').child(file.name);
		storeRef.put(file);
		
	}
	
	
	deschange =(e) =>
	{
		this.setState(
		{
			description: e.target.value
		}
		)
	}
	
	
	
	postform = (e) =>
	{
		
		e.preventDefault();
		
		
		
		console.log(this.state.filename);
		storage.ref('Insta/' + this.state.filename).getDownloadURL().then((url)=>{
			
			
			db.collection('Insta').add({
			description: this.state.description,
			imageURL: url,
			comment :[]

		});
			
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
	}
		
	
	
	
	
	
	
	render()
	{
		return(
		<div id="form-modal">
		<form id="file-form" onSubmit = {this.submitFile} >
		<input type="file" id="file"  onChange= {this.filechange}/>
		
		<button type="submit"> Upload </button>
		</form>
		
		
		<form id="post-form" onSubmit={this.postform}>
		<input type="text" id="description"  onChange={this.deschange} /> <br />
		<button type="submit" > POST! </button>
		</form>
		
		</div>
		)
	}
}








export default Home;