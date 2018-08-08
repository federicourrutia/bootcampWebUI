window.onload = function() {
	document.getElementsByClassName('hidden')[0].classList.remove('hidden');
	};
function test() {
	alert('Hello world');
	};
document.getElementById('button').addEventListener('click', test);

fetch('http://api.icndb.com/jokes/random')
	.then(function(response) {
		    return response.json();
  	})
  	.then(function(response) {
    	document.getElementById('section').innerHTML = response.value['joke'];
  	})