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
            console.log(response);
            $('#section').html(response.value['joke']);
        },
        error: function(error) {
            $("#section").css("color", "red");
        }
    });


function searchGit() {
    $.ajax({
        url: 'https://api.github.com/search/repositories',
        data: {
            q: 'JavaScript',
        },
        success: function(response) {
           console.log(response.items)
            response.items.forEach(function(e) {
                $('#searchResults').append("<ul>" + e.name + "</ul>"); 
            })
        },
        error: function(error) {
            console.log('error')
        }
    })
}