/* write post section */
const submitButton = document.getElementById('submit-post');
const writePost = document.getElementById('write-post');
submitButton.onclick = function(event) {
	console.log(writePost.value);
};


/* sign up */
const signupButton = document.getElementById('submit-sign-up');
const signupUsername = document.getElementById("sign-up-username");
const signupEmail = document.getElementById("sign-up-email");
const signupPassword = document.getElementById("sign-up-password");
const signupBorough = document.getElementById('borough');
signupButton.onclick = function() {
	const username = signupUsername.value;
	const email = signupEmail.value;
	const password = signupPassword.value;
	const b = signupBorough.value;
	
	const response = document.getElementById('signup-response');
	response.textContent = "Hello " + username + ", from " + b + ". Welcome to My App."
};






