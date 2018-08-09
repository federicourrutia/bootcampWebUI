$(document).ready(function() {
	$('.leftsidebar-playlists, .rightsidebar').css('opacity','0');
	$('.leftsidebar-playlists, .rightsidebar').animate ({ opacity: 1 }, 'slow');
});


/* let searchFor = (new URL(window.location)).searchParams;
let q = searchFor.get('q'); */


let songElapsed = document.getElementsByClassName('footernav-audioplayer-songelapsed')[0];
let songLength = document.getElementsByClassName('footernav-audioplayer-songlength')[0];
let audio = document.getElementsByClassName('audio')[0];
let progressBar = document.getElementsByClassName('completed-progress')[0];

function playAudio() {
	$('.audio').trigger('play');
	updateTime = setInterval(update,500);
	$('.fa-play-circle').removeClass('fas fa-play-circle').addClass('fas fa-pause-circle');
	$('.fa-pause-circle').attr('onclick','stopAudio()');
	let minutes = parseInt(audio.duration/60);
	let seconds = parseInt(audio.duration%60);
	if (seconds < 10) {
	songLength.innerHTML = minutes + ":0" + seconds;
	}
	else {
	songLength.innerHTML = minutes + ":" + seconds;
	}
}

function stopAudio() {
	$('.audio').trigger('pause');
	$('.fa-pause-circle').removeClass('fas fa-pause-circle').addClass('fas fa-play-circle');
	$('.fa-play-circle').attr('onclick','playAudio()');
	window.clearInterval(updateTime);
}

function muteAudio() {
	$(".audio").prop('muted', true);
	$('.fa-volume-down').removeClass('fas fa-volume-down').addClass('fas fa-volume-off');
	$('.fa-volume-off').attr('onclick','unmuteAudio()')
}
function unmuteAudio() {
	$(".audio").prop('muted', false);
	$('.fa-volume-off').removeClass('fas fa-volume-off').addClass('fas fa-volume-down');
	$('.fa-volume-down').attr('onclick','muteAudio()')
}
function update() {
	let minutes = parseInt(audio.duration/60);
	let seconds = parseInt(audio.duration%60);
	let minutesElapsed = parseInt(audio.currentTime/60);
	let secondsElapsed = parseInt(audio.currentTime%60);
	if (secondsElapsed < 10) {
		songElapsed.innerHTML = minutesElapsed + ":0" + secondsElapsed;
	}
	else if (secondsElapsed > 9) {
		songElapsed.innerHTML = minutesElapsed + ":" + secondsElapsed;
	}
	else {
		songElapsed.innerHTML = "0:00"
	}
	let size = (audio.currentTime*100/audio.duration)
	progressBar.style.width = size + "%";
}

function setVolume(value){
        audio.volume = value / 100;
}