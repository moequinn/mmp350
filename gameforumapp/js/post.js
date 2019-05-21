/*

	user adds post to database
	event listener for when user hits enter in the write post input or hits post button
	posts data from post to database
	used on index.html

*/

const postText = document.getElementById('write-post');
const categoryInput = document.getElementById('category');
const submitPost = document.getElementById('submit-post');

const db = firebase.database();
const ref = db.ref('posts');

/* add a new post to the database */
function addPost() {
	const info = {
		category: categoryInput.value,
		text: postText.value,
		date: Date(),
		uid: firebase.auth().currentUser.uid,
		displayName: firebase.auth().currentUser.displayName
	};
	
	const promise = ref.push(info);
	promise.then(function() { 
		// indicate post went through
		postText.value = '';
	});
	promise.catch(function(error) { alert(error.message); });
}


submitPost.addEventListener('click', addPost);
postText.addEventListener('keydown', function(event) {
	if (event.which == 13 || event.key == 'Enter') {
		addPost();	
	}
});




