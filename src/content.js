import React, {Component} from 'react';
import config from './config/fire.js';
import Comment from './comments.js' ;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;


const db = firebase.firestore();
const storage = firebase.storage();

class Content extends Component
{
	
	render()
	{
		return(
			<div>
			  <div id="main-content">
				
			  </div>
			  

			</div>
			)
	}
	
}




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

		//to_do
		});

	});
	
	let button = document.createElement('button');
	button.setAttribute("type", "submit");
	button.textContent = "Comment";
	form.appendChild(input);
	form.appendChild(button);
	
	localdiv.appendChild(description);
	localdiv.appendChild(img);
	localdiv.appendChild(form);
	
	
	content.appendChild(localdiv);
    
	
}

db.collection('Insta').get().then((snapshots) =>
{
	snapshots.docs.forEach(doc=> {
		renderContent(doc);
	})
}
);

export default Content;
