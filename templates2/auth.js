const signupButton = document.getElementById('submit-sign-up');
const signupUsername = document.getElementById('sign-up-username');
const signupEmail = document.getElementById('sign-up-email');
const signupPassword = document.getElementById('sign-up-password');

function updateUser(credential) {
    const userInfo = {
        displayName: signupUsername.value
    };
    credential.user.updateProfile(userInfo);
}

function createUser() {
    const email = signupEmail.value;
    const password = signupPassword.value;
    console.log(email, password);
    const promise = 
    firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.then(updateUser);
    promise.catch(function(error));{
                  console.log(error);
                  alert(error.message);
                  });
}
signupButton.onclick = createUser;


 /* log in */
const loginButton = document.getElementById('submit-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginButton.onclick = function() {
    const email = loginEmail.value;
    const password = loginPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password);
};


/* auth state */

