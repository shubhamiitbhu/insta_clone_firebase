import React, {Component} from 'react';
import config from './config/fire.js';
import Home from './home.js' ;
import Navbar from './navbar.js' ;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;
import 'firebase/auth' ;


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
		console.log(doc);
		if(doc.type== "added")
		{
		renderContent(doc.doc);
		}
		else if(doc.type == "removed")
		{
			let local = document.querySelector('#' + doc.doc.id);
			document.querySelector('#main-content').removeChild(local);
		}
		else if(doc.type == "modified")
		{
			renderLike(doc.doc);
		}
		
	})
	
}
);
 

	}
	else
	{
		const loggedIn = document.querySelectorAll('.loggedIn');
		loggedIn.forEach(item => item.style.display = 'none');
	}
	


		
	});
	
	
function renderLike(doc)
{
	let counter = document.getElementsByClassName(doc.id)[0];
	counter.textContent = doc.data().Likes;
	
}



function renderModal(doc)
{
	var modal = document.getElementById("modal");
	
	
	let name = document.createElement('div');
	name.setAttribute("id" , doc.id);
	let hr = document.createElement('hr');
	name.textContent = doc.data().value + ' <' + doc.data().email + '>';
	modal.appendChild(name);
	modal.appendChild(hr);
	
}

function clearModal()
{
	var modal = document.getElementById("modal");
	modal.textContent = "";
}




function renderContent(doc)
{
	
const content = document.querySelector('#main-content');
	
	let localdiv = document.createElement('div');
	let header = document.createElement('div');
	header.setAttribute("id", "header");
	localdiv.setAttribute("id", doc.id);
	let linehr = document.createElement('hr');
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
	header.appendChild(linehr);
	
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
	like.setAttribute("class", "dislike");
	let load_comm = document.createElement('span');
	load_comm.setAttribute("id", "load");
	let download = document.createElement('span');
	download.setAttribute("id", doc.id);
	download.setAttribute("class" , "download");
	like.textContent = "Like  ";
	
	download.textContent="Download  ";
	load_comm.textContent ="Load Comments  ";
	let like_comm_div = document.createElement('div');
	like_comm_div.setAttribute("id", "like_comm");
	let viewliker = document.createElement('span');
	viewliker.setAttribute("id", doc.id);
	viewliker.setAttribute("class" ,"liker");
	viewliker.textContent ="View Likes";
	let like_count = document.createElement('span');
	like_count.setAttribute("id", "counter");
	like_count.setAttribute("class", doc.id);
	
	like_count.textContent = doc.data().Likes;
	var counter = doc.data().Likes;
	like_comm_div.appendChild(like_count);
	like_comm_div.appendChild(like);
	like_comm_div.appendChild(viewliker);
	like_comm_div.appendChild(load_comm);
	like_comm_div.appendChild(download);
	
	
	download.addEventListener("click", function(){
		var storageRef = storage.refFromURL(doc.data().imageURL );
		storageRef.getDownloadURL().then(function(url) {
 
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event) {
			var blob = xhr.response;
				};
					xhr.open('GET', url);
			xhr.send();
		});
		
		
		
		
		
	})
	
	
	//
	
	
	
	
	//creating modal
	
	var modal = document.getElementById("myModal");
	viewliker.addEventListener("click", function(){
		db.collection('Post').doc(viewliker.id).collection('Users').get().then( (snapshot) =>
		{   if(doc.length !=0) 
		snapshot.forEach( doc => { renderModal(doc) }) 
		
		})
		
		
		
		modal.style.display = 'block'});
	var clo = document.getElementById("close");
	clo.addEventListener("click", function(){
		clearModal();
		
		
		modal.style.display = 'none'});
	
	window.onclick = function(event) {
				if (event.target == modal) {
					clearModal();
					modal.style.display = "none";
					}
				}
	
	//
	var ref = db.collection('User').doc(auth.currentUser.uid).collection('Likes').doc(doc.id);
	
	like.addEventListener("click", function() {
		
		//
		var likeref = db.collection("Insta").doc(doc.id);
		
		ref.get().then(function(doc) {
		
		if(doc.exists)
	{    
		db.collection('User').doc(auth.currentUser.uid).collection('Likes').doc(doc.id).delete();
		db.collection('Post').doc(doc.id).collection('Users').doc(auth.currentUser.uid).delete();
		
		
		like.setAttribute("class", "dislike");
		
		var likeref = db.collection("Insta").doc(doc.id);
		return db.runTransaction(function(transaction) { return transaction.get(likeref).then(function(likedocs){ var newlike = likedocs.data().Likes -1; transaction.update(likeref, {Likes: newlike})})})
		
		
	}
	
	else{
		db.collection('User').doc(auth.currentUser.uid).collection('Likes').doc(doc.id).set({value : true});
		db.collection('Post').doc(doc.id).collection('Users').doc(auth.currentUser.uid).set({value : auth.currentUser.displayName, email:auth.currentUser.email });
		like.setAttribute("class", "liked");
		
		//
		var likeref = db.collection("Insta").doc(doc.id);
		return db.runTransaction(function(transaction) { return transaction.get(likeref).then(function(likedocs){ var newlike = likedocs.data().Likes +1; transaction.update(likeref, {Likes: newlike})})})
		
		
		
		
		//
		
		
	}
		
	}).catch(function(error) {
    console.log("Error getting document:", error)});
	});
	
	//
	ref.get().then(function(doc) {
		if(doc.exists)
		{
			like.setAttribute("class", "liked");
		}
		
		
	});
	
	
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
	input.setAttribute("placeholder", "share your thoughts here...");
	
	
	
	
	
	
	form.addEventListener("submit", function(e) { e.preventDefault(); var input_string= e.target.ic.value ; console.log(input_string); e.target.ic.value=""; 
		if(!input_string) { alert("Please add text before publishing your comment"); }
		else
		{
		db.collection('Insta').doc(doc.id).collection('Comments').add(
		{
				comments: input_string,
				commented_by: auth.currentUser.displayName,
				
		}
		)}
		if(comment_section.style.display = 'none') {load_comm.textContent = "Hide Comments"; comment_section.style.display = 'block'}
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
			console.log(doc.type);
			if(doc.type=="added")
			{
				
			comment_section.innerHTML += '<div id="text_comm">' + '<div > <span id="commentor">' + doc.doc.data().commented_by + '</span>'   +'</div> ' + '<span id="comments">'+ doc.doc.data().comments + '</span></div> <br />';
			}
		})
	});
	
	
	
	
	comment_section.style.display = 'none';
	load_comm.addEventListener("click", function() {if(comment_section.style.display == 'none') {comment_section.style.display = 'block'; load_comm.textContent = "Hide Comments"}
	else if(comment_section.style.display =='block') {comment_section.style.display = 'none'; load_comm.textContent = "Load Comments"; } });
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
			<div className="loggedIn">
			<Home /> <br /> <br />
			 
			  
			  <div id="main-content" >
				
			  
			  
			  <div id="myModal" class="modal">

								
					<div class="modal-content">
						<span class="close" id="close">&times;</span>
						<p id="modal"> 
						
						
						
						</p>
						</div>

					</div>
			  
			  

			</div>
			</div>
			)
	}
	
}






export default Content;
