const topic = location.search.split('=')[1];
const postsDiv = document.getElementById('posts');
const postRef = firebase.database().ref('posts').child(topic);

postRef.on('child_added', function(snapshot) {
	createPost(snapshot.val(), snapshot.key);
});


const postText = document.getElementById('write-post');
const submitPost = document.getElementById('submit-post');

/* add a new post to the database */
function addPost() {
	const info = {
		text: postText.value,
		date: Date(),
		uid: firebase.auth().currentUser.uid,
		displayName: firebase.auth().currentUser.displayName
	};
	const promise = postRef.push(info);
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







