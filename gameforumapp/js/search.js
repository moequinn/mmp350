/*

	example of querying database to get subset of posts instead of the whole thing
	search is based on getting all posts with text
	then determining if a specific search string is inside that text
	tag is to check if specific value is true, or another value
	works with search.html
	
*/


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

/* get tag searches */
const tagQuery = document.getElementById('tag-query');
const tagSubmitButton = document.getElementById('submit-tag-query');

tagSubmitButton.addEventListener('click', getTag);
tagQuery.addEventListener('keydown', function(event) {
	if (event.which == 13 || event.key == 'Enter') {
		getTag();	
	}
});



function getTag() {
	postsDiv.innerHTML = '';
	const tag = tagQuery.value;
	const tagRef = db.ref('posts').orderByChild('tags/' + tag).equalTo(true);
	tagRef.on('child_added', function(snapshot) {
		const post = snapshot.val();
		createPost(post, snapshot.key);
	});
}
























