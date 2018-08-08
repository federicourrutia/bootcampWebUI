$(document).ready(function() {
	$('.hidden').removeClass('hidden');
	});
function test() {
	alert('Hello world');
	};
$('#button').click(test);
$.ajax({
        url: 'http://api.icndb.com/jokes/random',
        success: function(response) {
            $('#section').html(response.value['joke']);
        },
        error: function(error) {
            $("#section").css("color", "red");
        }
    });