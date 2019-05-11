/* get search term and query database */
const query = document.getElementById('query');
const submitQuery = document.getElementById('submit-query');

const db = firebase.database();
const ref = db.ref('posts').orderByChild('text');

submitQuery.addEventListener('click', getQuery);
query.addEventListener('keydown', function(event) {
	if (event.key == 'Enter' || event.which == 13) {
		getQuery();
	}
});

const postsDiv = document.getElementById('posts');

function getQuery() {
	postsDiv.innerHTML = '';
	const value = query.value;
	ref.on('child_added', function(snapshot) {
		const post = snapshot.val();
		if (post.text.toLowerCase().includes(value.toLowerCase())) {
			createPost(post, snapshot.key);
		}
	});
}









