$(document).ready(function() {
	$('.hidden').removeClass('hidden');
	});
function test() {
	alert('Hello world');
	};
$('#button').click(test);

fetch('http://api.icndb.com/jokes/random')
	.then(function(response) {
		return response.json();
  	})
  	.then(function(response) {
    	$('#section').html(response.value['joke']);
  	});