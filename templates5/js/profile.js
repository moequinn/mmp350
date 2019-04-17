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
    profileNameInput.placeholder = user.displayName;
}

/* update data */
const editButton = document.getElementById('edit');
const editProfile = document.getElementById('edit-profile');
const profileNameInput = document.getElementById('edit-display-name');
const bioInput = document.getElementById('edit-bio-info');
//const 
const profileEditButton = document.getElementById('submit-display-name');

editButton.onclick = function () {
    editProfile.style.display = 'block';
};

profileEditButton.onclick = updateProfile;

function updateProfile() {
    const username = profileNameInput.value;
    if (username.length > 2) {
        ref.update({
            displayName: username,
            bio: bioInput.value,
            genre: 'test'
        });
        editProfile.style.display = 'none';
        profileNameInput.classList.remove('error');
    } else {
        profileNameInput.placeholder = "Name must have 3 characters or more.";
        profileNameInput.classList.add('error');
    }
}
