// get the user id from the URL
const uid = location.search.split('=')[1];
const db = firebase.database();
const ref = db.ref('users').child(uid);

// firebase event, any change to database
ref.on('value', updateUser);

const profileDisplayName = document.getElementById('profile-display-name');
function updateUser(snapshot) {
	const user = snapshot.val();
	console.log(user);
	profileDisplayName.textContent = user.displayName;
}