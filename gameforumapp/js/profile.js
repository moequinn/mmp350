/*

	gets content for user profile and logged in user can edit
	update data section is for changing the user profile
	profile photo is for adding a profile photo for the user

*/

// get the user id from the URL
const uid = location.search.split('=')[1];
const db = firebase.database();
const ref = db.ref('users').child(uid);

firebase.auth().onAuthStateChanged(function(user) {
	if (user.uid == uid) {
		document.body.classList.add('is-user');
	} else {
		document.body.classList.remove('is-user');
	}
});

// firebase event, any change to database
ref.on('value', updateUser);

const profileDisplayName = document.getElementById('profile-display-name');

function updateUser(snapshot) {	
	const user = snapshot.val();
	if (user.photo) {
		displayPhoto(user.photo);	
	}
	profileDisplayName.textContent = user.displayName;
	profileNameInput.placeholder = user.displayName;
}

/* update data */
const editButton = document.getElementById('edit');
const editProfile = document.getElementById('edit-profile');
const profileNameInput = document.getElementById('edit-display-name');
const profileEditButton = document.getElementById('submit-display-name');

editButton.onclick = function() {
	editProfile.style.display = 'block';
	const addPhoto = get('add-photo');
	addPhoto.style.display = 'block';
};

profileEditButton.onclick = updateProfile;

function updateProfile() {
	const username = profileNameInput.value;
	if (username.length > 2) {
		ref.update({ displayName: username });
		firebase.auth().currentUser.updateProfile({ displayName: username });
		editProfile.style.display = 'none';
		profileNameInput.classList.remove('error');
	} else {
		profileNameInput.placeholder = "Name must have 3 characters or more.";
		profileNameInput.classList.add('error');
	}
}

function get(id) {
	return document.getElementById(id);
}

/* upload profile photo */
const photoInput = get('photo-input');
const photoSubmit = get('submit-photo');
photoSubmit.addEventListener('click', uploadPhoto);

function uploadPhoto() {
	const file = photoInput.files[0];
	if (file) {
		const storage = firebase.storage();
		const photoRef = storage.ref('users').child(uid).child('profile-photo');
		const promise = photoRef.put(file);
		
		promise.then(function(snapshot) {
			return snapshot.ref.getDownloadURL();
		}).then(updatePhoto);
		
	} else {
		alert('Click Choose File');
	}
}

function updatePhoto(url) {
	ref.update({ photo: url });
	displayPhoto(url);
}

function displayPhoto(url) {
	const profileImg = get('profile-img');
	profileImg.src = url;
	const addPhoto = get('add-photo');
	addPhoto.style.display = 'none';
}












