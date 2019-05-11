const topic = document.getElementById('topic');
const submitTopic = document.getElementById('submit-topic');

const db = firebase.database();
const ref = db.ref('posts');

submitTopic.addEventListener('click', goToTopic);
submitTopic.addEventListener('keydown', function(event) {
	if (event.which == 13 || event.key == 'Enter') {
		goToTopic();
	}
});
    
function goToTopic() {
    location.href = "forum.html?topic=" + topic.value;
}




