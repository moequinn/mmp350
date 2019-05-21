/*

	this is used to generate HTML to display posts
	used by the index.html posts section for all posts in database
	also used by search.html to show subset of posts based on query
	
	createPost requires the post data from the database and the key value
	
	function el is helper function to make creating an HTML element easier

*/

function el(tag, clas) {
	const element = document.createElement(tag);
	element.classList.add(clas);
	return element;
}

function createPost(post, id) {
	const postDiv = el('div', 'post');
	const postText = el('div', 'post-text');
	postText.textContent = post.text;
	postDiv.appendChild(postText);
	
	const postInfo = el('div', 'post-info');
	
	const author = el('span', 'author');
	const link = el('a');
	author.appendChild(link);
	link.textContent = post.displayName;
	link.href = 'user.html?uid=' + post.uid;
	
	const date = el('span', 'date');
	date.textContent = post.date.split(' ').slice(0, 4).join(' ');
	
	const photo = el('div', 'photo');
	const img = new Image();
	img.onclick = function() {
		location.href = 'user.html?uid=' + post.uid;
	};
	photo.appendChild(img);
	postDiv.appendChild(photo);
	
	const userRef = firebase.database().ref('users').child(post.uid);
	userRef.once('value', function(snapshot) {
		if (snapshot.val().photo) {
			img.src = snapshot.val().photo;
		} else {
			img.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Egg_upright.jpg';
		}
	});

	postInfo.innerHTML += "by ";
	postInfo.appendChild(author);
	postInfo.innerHTML += " on ";
	postInfo.appendChild(date);
	
	/* likes interface */
	const likesDiv = el('div', 'likes');
	const likeButton = el('button', 'like-button');
	const likeDisplay = el('span', 'likes-display');
	likesDiv.appendChild(likeButton);
	likesDiv.appendChild(likeDisplay);
	
	likeButton.textContent = '♡';
	
	if (post.likes) {
		const n = Object.keys(post.likes).length;
		likeDisplay.textContent = n;
	} else {
		likeDisplay.textContent = '0';
	}
	
	likeButton.addEventListener('click', function() {
		const uid = firebase.auth().currentUser.uid;
		const likeRef = postRef.child(id).child('likes').child(uid);
		if (post.likes) {
			if (post.likes[uid]) {
				likeRef.remove();
			} else {
				likeRef.set(true);
			}
		} else {
			likeRef.set(true);
		}
	});
	
	postDiv.appendChild(postInfo);
	postDiv.appendChild(likesDiv);
	postsDiv.insertBefore(postDiv, postsDiv.firstElementChild);
//	postsDiv.appendChild(postDiv);
}
