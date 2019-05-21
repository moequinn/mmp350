/*

	displays all posts from database on index.html
	most of the work is done by createPost in js/create-post.js

*/

const postsDiv = document.getElementById('posts');
const postRef = firebase.database().ref('posts');

postRef.on('child_added', function(snapshot) {
	createPost(snapshot.val(), snapshot.key);
});











