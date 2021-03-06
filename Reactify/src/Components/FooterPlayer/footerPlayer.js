import React, { Component } from 'react';
import AudioApi from '../../Api/audio-api';

class FooterPlayer extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.i = 1;
    this.state = {
      hasData: false,
      isPlaying: false,
      isMuted: false,
      isNextSong: false,
      completedProgress: 0,
      currentSong: ''
    }
    this.update = this.update.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
  }

  componentDidMount() {
    AudioApi.getAudio(1).then((response) => {
      this.setState({currentSong: response, hasData: true});
     })
  }

  getMinutesElapsed() {
		return this.audioRef.currentTime ? parseInt(this.audioRef.currentTime / 60, 10) : 0;
	}

	getSecondsElapsed() {
		return this.audioRef.currentTime ? parseInt(this.audioRef.currentTime % 60, 10) : 0;
	}

  parseTimeElapsed() {
    let minutes = this.getMinutesElapsed();
		let seconds = this.getSecondsElapsed();
		if (seconds < 10) {
			return `${minutes}:0${seconds}`;
		}
		else {
			return `${minutes}:${seconds}`;
		}
  }

	triggerAudio() {
    this.setState({ isPlaying : true });
    this.audioRef.play();
		this.updateTime = setInterval(this.update, 1000);
	}

	stopAudio() {
    this.setState({ isPlaying : false });
		clearInterval(this.updateTime);
		this.audioRef.pause();
	}

	nextSong() {
    if (this.i < 8) {
      this.i++;
      AudioApi.getAudio(this.i).then((song) => {
        this.setState({ currentSong: song})
        this.triggerAudio();
      })
    }
  }

	previousSong() {
    if (this.i > 1) {
      this.i--;
      AudioApi.getAudio(this.i).then((song) => {
      this.setState({ currentSong: song, isPlaying: false})
      })
    }
  }

	muteAudio() {
		this.audioRef.muted = !this.state.isMuted;
    this.setState({ isMuted: !this.state.isMuted });
	}

	update() {
    if (this.state.isNextSong) {
      this.triggerAudio();
      this.setState({ isNextSong: false });
    }
		let progress = this.audioRef.currentTime * 100 / this.audioRef.duration;
    this.setState({ completedProgress: progress });
	}

	setVolume(event) {
    this.audioRef.volume = event.target.value / 100;
	}

	onBarClick(event) {
		let newTime = this.audioRef.duration * (event.nativeEvent.offsetX / this.progressBarRef.clientWidth);
    this.audioRef.currentTime = newTime;
	}

  render() {
    return (
      <div className="root">
      {
        this.state.hasData
        ?
        <footer className="footernav">
          <div className="footernav-nowplaying-container">
            <img className="album-mini" src={this.state.currentSong.image} alt="Album cover"/>
            <div className="footernav-nowplaying">
              <a className="nowplayingartist">{this.state.currentSong.name}</a>
              <a className="nowplayingsong">{this.state.currentSong.artist}</a>
            </div>
          </div>
          <div className="footernav-audioplayer">
            <div className="footernav-audioplayer-buttons">
              <i className="fas fa-step-backward" onClick={() => this.previousSong()}/>{ this.state.isPlaying ? <i className="fas fa-pause-circle" onClick={() => this.stopAudio()}/> : <i className="fas fa-play-circle" onClick={() => this.triggerAudio()}/> }<i className="fas fa-step-forward" onClick={() => this.nextSong()}/>
            </div>
            <div className="footernav-audioplayer-progress">
              <span className="footernav-audioplayer-songelapsed">{this.parseTimeElapsed()}</span>
              <div className="progress" onClick={(event) => { this.onBarClick(event) }} ref={(ref) => this.progressBarRef = ref}>
                <span className="completed-progress" style={{ width: `${this.state.completedProgress}%` }}></span>
              </div>
              <span id="fullDuration" className="footernav-audioplayer-songlength">{this.state.currentSong.duration}</span>
            </div>
          </div>
          <div className="footernav-volumecontrol">
            <i className={this.state.isMuted ? "fas fa-volume-off" : "fas fa-volume-down"} onClick={() => { this.muteAudio() }}/><input id="volumeControl" type="range" min="0" max="100" step="1" className="volumecontrol-slider" onChange={(event) => this.setVolume(event)}/>
          </div>
          <audio ref={(audio) => this.audioRef = audio} id="mytrack" src={`${this.state.currentSong.source}.mp3`} type="audio/mpeg" controls preload="metadata"/>
        </footer>
        :
        <div className="wrap">
          <div className="loader center"><span></span></div>
        </div>
      }
      </div>
    )
  }
}

export default FooterPlayer;
