/* write post section */
const submitButton = document.getElementById('submit-post');
const writePost = document.getElementById('write-post');
submitButton.onclick = function(event) {
    console.log(writePost.value);
};

/* sign up */
const signupButton = document.getElementById('submit-sign-up');
const signupUsername = document.getElementById('sign-up-username');
