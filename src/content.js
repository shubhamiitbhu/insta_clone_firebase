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
	

	if(user != null) {
		console.log("signin");
		db.collection('Insta').onSnapshot(snapshot =>
{
	let changes = snapshot.docChanges();
	changes.forEach(doc=> {
		if(doc.type=="added")
		{
		renderContent(doc.doc);
		}
		else if(doc.type == "removed")
		{
			let local = document.querySelector('#' + doc.doc.id);
			document.querySelector('#main-content').removeChild(local);
		}
		
	})
	
}
);
 

	}
	


		
	});


		
	




function renderContent(doc)
{
	
const content = document.querySelector('#main-content');
	
	let localdiv = document.createElement('div');
	let header = document.createElement('div');
	header.setAttribute("id", "header");
	localdiv.setAttribute("id", doc.id);
	
	localdiv.setAttribute("class", "localdiv" );
	let displayname = document.createElement('span');
	displayname.setAttribute("id", "displayname");
	displayname.textContent = doc.data().username + '   ';
	let emaildisplay = document.createElement('span');
	emaildisplay.setAttribute("id", "emaildisplay");
	emaildisplay.textContent = '<' + doc.data().email + '>  posted an update';
    header.appendChild(displayname); header.appendChild(emaildisplay);
	let cross = document.createElement('span');
	cross.setAttribute("id" ,"cross");

	cross.textContent = "X";
	if(doc.data().userid == auth.currentUser.uid)
	{
		header.appendChild(cross);
	}
	
	cross.addEventListener("click" , function()
	{
		var result = window.confirm("Are you sure you want to delete this post");
		if(result)
		{
			db.collection('Insta').doc(doc.id).delete().catch(function(err) {alert(err.message)});
		}
	}
	);
	
	
	let description = document.createElement('div');
	description.setAttribute("id", "descript");
	let like = document.createElement('span');
	like.setAttribute("id", "like");
	let load_comm = document.createElement('span');
	load_comm.setAttribute("id", "load_comm");
	let download = document.createElement('span');
	download.setAttribute("id", doc.id);
	download.setAttribute("class" , "download");
	like.textContent = "LIKE  ";
	download.textContent="DOWNLOAD  ";
	load_comm.textContent ="LOAD COMMENTS  ";
	let like_comm_div = document.createElement('div');
	like_comm_div.setAttribute("id", "like_comm");
	like_comm_div.appendChild(like);
	like_comm_div.appendChild(load_comm);
	like_comm_div.appendChild(download);
	description.textContent = doc.data().description;
	header.appendChild(description);
	
	
	
	let img = document.createElement('IMG');
	img.setAttribute("src", doc.data().imageURL);
	img.setAttribute("id", "image");
	
	
	
	
	let form = 	document.createElement('form');
	form.setAttribute("id" , "comm_form");
	let input = document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("id", "ic");
	input.setAttribute("placeholder", "write your thoughts here...");
	like.addEventListener("click", function(e) {e.preventDefault(); if(like.textContent== "LIKE  ") {like.textContent = "UNLIKE  "; 
	var postRef = db.collection('Insta');
	
	function updateLike(doc)
	{
		return db.ref('Insta/{$doc}/Likes').transaction(Likes => Likes++);
	}
	
	
	} else {like.textContent= "LIKE  "};} );
	
	form.addEventListener("submit", function(e) { e.preventDefault(); var input_string= e.target.ic.value ; console.log(input_string); e.target.ic.value=""; 
		if(!input_string) { alert("Please add text before publishing your comment"); }
		else
		{
		db.collection('Insta').doc(doc.id).collection('Comments').add(
		{
				comments: input_string,
				commented_by: auth.currentUser.displayName
		}
		)}
		if(comment_section.style.display = 'none') {load_comm.textContent = "HIDE COMMENTS  "; comment_section.style.display = 'block'}
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
			comment_section.innerHTML += '<div id="text_comm">' + '<div > <span id="commentor">' + doc.doc.data().commented_by + '</span> wrote</div> ' + '<span id="comments">'+ doc.doc.data().comments + '</span></div> <br />';
			}
		})
	});
	
	
	
	
	comment_section.style.display = 'none';
	load_comm.addEventListener("click", function() {if(comment_section.style.display == 'none') {comment_section.style.display = 'block'; load_comm.textContent = "HIDE COMMENTS  "}
	else if(comment_section.style.display =='block') {comment_section.style.display = 'none'; load_comm.textContent = "LOAD COMMENTS"; } });
	localdiv.appendChild(header);
	
	localdiv.appendChild(img);
	localdiv.appendChild(like_comm_div);
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
			 
			  
			  <div id="main-content" >
				
			  
			  

			</div>
			</div>
			)
	}
	
}






export default Content;
