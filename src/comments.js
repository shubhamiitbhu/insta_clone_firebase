import React, {Component} from 'react';

import config from './config/fire.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage' ;


const db = firebase.firestore();
const storage = firebase.storage();

class Comment extends Component
{
	render()
	{
		return(
		
			<div id="comment-form">
			<form id="comment">
			<input type="text" />
			<button type="submit"> Comment </button>
			</form>
			</div>
		)
	}
}

export default Comment;