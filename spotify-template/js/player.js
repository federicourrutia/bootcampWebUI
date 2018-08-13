class Player {
	constructor() {
		this.songElapsed = $('.footernav-audioplayer-songelapsed');
		this.songLength = $('.footernav-audioplayer-songlength');
		this.audioElement = $('audio');
		this.progressBar = $('.progress');
		this.barProgress = $('.completed-progress');
		this.playAudio = this.playAudio.bind(this);
		this.stopAudio = this.stopAudio.bind(this);
		this.muteAudio = this.muteAudio.bind(this);
		this.unmuteAudio = this.unmuteAudio.bind(this);
		this.update = this.update.bind(this);
		this.setVolume = this.setVolume.bind(this);
		this.onBarClick = this.onBarClick.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.previousSong = this.previousSong.bind(this);
		this.currentSong = 0;
	}

	getMinutes() {
		return parseInt(this.audioElement[0].duration / 60);
	}

	getSeconds() {
		return parseInt(this.audioElement[0].duration % 60);
	}

	getMinutesElapsed() {
		return parseInt(this.audioElement[0].currentTime / 60);
	}

	getSecondsElapsed() {
		return parseInt(this.audioElement[0].currentTime % 60);
	}

	playAudio() {
		this.audioElement.trigger('play');
		this.updateTime = setInterval(this.update, 500);
		let playCircle = $('.fa-play-circle');
		let minutes = this.getMinutes();
		let seconds = this.getSeconds();
		if (seconds < 10) {
			this.songLength.html(`${minutes}:0${seconds}`);
		}
		else {
			this.songLength.html(`${minutes}:${seconds}`);
		}
		playCircle.removeClass('fa-play-circle').addClass('fa-pause-circle');
		playCircle.unbind("click");
		$('.fa-pause-circle').click(this.stopAudio);
	}

	stopAudio() {
		clearInterval(this.updateTime);
		let pauseCircle = $('.fa-pause-circle');
		this.audioElement.trigger('pause');
		pauseCircle.removeClass('fa-pause-circle').addClass('fa-play-circle');
		pauseCircle.unbind("click");
		$('.fa-play-circle').click(this.playAudio);
	}

	nextSong() {
		let nextButton = $('.fa-step-forward');
		this.currentSong++;
		$('.audio').attr('src',`${this.currentSong}.mp3`);
	}

	previousSong() {
		let previousButton = $('.fa-step-backward');
		this.currentSong--;
		$('.audio').attr('src',`${this.currentSong}.mp3`);
	}

	muteAudio() {
		let volumeDown = $('.fa-volume-down');
		this.audioElement.prop('muted', true);
		volumeDown.removeClass('fa-volume-down').addClass('fa-volume-off');
		volumeDown.unbind("click");
		$('.fa-volume-off').click(this.unmuteAudio);
	}

	unmuteAudio() {
		let volumeOff = $('.fa-volume-off')
		this.audioElement.prop('muted', false);
		volumeOff.removeClass('fa-volume-off').addClass('fa-volume-down');
		volumeOff.unbind("click");
		$('.fa-volume-down').click(this.muteAudio);
	}

	update() {
		let minutes = this.getMinutes();
		let seconds = this.getSeconds();
		let minutesElapsed = this.getMinutesElapsed();
		let secondsElapsed = this.getSecondsElapsed();
		if (secondsElapsed < 10) {
			this.songElapsed.html(`${minutesElapsed}:0${secondsElapsed}`);
		}
		else {
			this.songElapsed.html(`${minutesElapsed}:${secondsElapsed}`);
		}
		let barSize = parseInt(this.audioElement[0].currentTime * 100 / this.audioElement[0].duration);
		this.barProgress.css('width', `${barSize}%`);
	}

	setVolume() {
		let value = $('#volumeControl').val();
		this.audioElement.prop('volume', value / 100);
	}

	onBarClick(event) {
		let newTime = this.audioElement[0].duration * (event.offsetX / this.progressBar.innerWidth());
		this.audioElement[0].currentTime = newTime;
	}
}
