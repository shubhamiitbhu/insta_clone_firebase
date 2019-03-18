import React, {Component} from 'react';
import config from './config/fire.js';
import Home from './home.js' ;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

class Content extends Component
{
	
	constructor(props)
	{
		super(props);
		auth.onAuthStateChanged(user =>{
	

	if(user) {
		
		db.collection('Insta').onSnapshot(snapshot =>
{
	let changes = snapshot.docChanges();
	changes.forEach(doc=> {
		if(doc.type=="added")
		{
		renderContent(doc.doc);
		}
	})
}
);
 

	}


else
{
	
	renderContent();
	
}	
		
	});


		
	




function renderContent(doc)
{
	
const content = document.querySelector('#main-content');
	
	let localdiv = document.createElement('div');
	localdiv.setAttribute("id", doc.id);
	localdiv.setAttribute("class", "localdiv" );
	let description = document.createElement('div');
	description.setAttribute("id", doc.data().description.id);
	description.textContent = doc.data().description;
	let img = document.createElement('IMG');
	img.setAttribute("src", doc.data().imageURL);
	img.setAttribute("id", doc.data().imageURL.id);
	
	
	let form = 	document.createElement('form');
	let input = document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("id", "ic");
	form.addEventListener("submit", function(e) { e.preventDefault(); var input_string= e.target.ic.value ; console.log(input_string); e.target.ic.value=""; 

		db.collection('Insta').doc(doc.id).collection('Comments').add(
		{
				comments: input_string
		}
		)
		});


	
	let button = document.createElement('button');
	button.setAttribute("type", "submit");
	button.textContent = "Comment";
	form.appendChild(input);
	form.appendChild(button);
	
	let line_break = document.createElement('hr');
	let comment_section = document.createElement('div');
	comment_section.setAttribute("id", "comment_section");
	
	db.collection("Insta").doc(doc.id).collection("Comments").onSnapshot(snapshots =>
	{
		let changes = snapshots.docChanges();
		
		changes.forEach(doc=> {
			if(doc.type=="added")
			{
			comment_section.innerHTML += '<div>' + doc.doc.data().comments + '</div><hr />';
			}
		})
	});
	
	
	localdiv.appendChild(description);
	localdiv.appendChild(img);
	localdiv.appendChild(form);
	localdiv.appendChild(comment_section);
	localdiv.appendChild(line_break);
	
	
	content.appendChild(localdiv);
    
	
}

	}
	
	render()
	{
		return(
			<div id="loggedIn">
			<Home />
			  <div id="main-content">
				
			  </div>
			  

			</div>
			)
	}
	
}






export default Content;
