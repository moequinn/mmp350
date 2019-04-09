window.addEventListener('load', function() {
    // post code
});

const publishButton = document.getElementById('submit-post');
const postInput = document.getElementById('post-body');
publishButton.addEventListener('click', publishPost);

function publishPost() {
    const uid = firebase.auth().currentUser.uid;
    const db = firebase.database();
    const ref = db.ref('posts').child(uid);
    const postInfo = {
        text: postInput.value,
        date: Date.now(),
        author: firebase.auth().currentUser.displayName,
        id: uid
    };
    ref.push(postInfo);
    postInput.value = "";
}