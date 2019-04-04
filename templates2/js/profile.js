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

/* update data */
const editButton = document.getElementById('edit');
const editProfile = document.getElementById('edit-profile');

editButton.onclick = function() {
    editProfile.style.display = 'block';
};

profilEditButton.onclick = updateProfile;

function upadteProfile() {
    ref.update({ display })
}