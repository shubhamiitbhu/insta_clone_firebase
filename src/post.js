import React, {Component} from 'react';
import firebase from 'firebase/app';
import auth from './config/fire.js';
import storage from './config/fire.js';
import db from './config/fire.js';


class Post extends Component
{
	
	render()
	{return(
	<form id="post-form">
		<input type="text" id="description" /> <br />
		<button type="submit" > POST! </button>
	</form>
	)
	}
	
}

export default Post;