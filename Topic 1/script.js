$(document).ready(function() {
	$('.hidden').removeClass('hidden');
	});


function test() {
	alert('Hello world');
	};


$('#button').click(test);


$.ajax({
        url: 'http://api.icndb.com/jokes/random',
        dataType: 'json',
        success: function(response) {
            $('#section').html(response.value['joke']);
        },
        error: function(error) {
            $("#section").css("color", "red");
        }
    });


function searchGit() {
    let textinput = $('input').val();
    $.ajax({
        url: 'https://api.github.com/search/repositories',
        data: {
            q: textinput,
        },
        success: function(response) {
                $('#searchResults').html("");
                response.items.forEach(function(item) {
                $('#searchResults').append("<ul>" + item.name + "</ul>"); 
                })
        },
        error: function(error) {
            console.log('error')
        }
    })
}