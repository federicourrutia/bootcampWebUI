import React, { Component } from 'react';
import SongsApi from '../../../Api/songs-api';

class Songs extends Component {
  constructor() {
    super();
    this.state = {
      songs: '',
    }
  }

  componentDidMount() {
    SongsApi.getSongsByQuery(this.props.queryParams).then((response) => {
      let queryParams = new RegExp(this.props.queryParams, 'i');
      let filteredSongs = response.filter((song) => {
        return song.name.match(queryParams);
      });
      this.setState({songs: filteredSongs});
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      SongsApi.getSongsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredSongs = response.filter((song) => {
          return song.name.match(queryParams);
        });
        this.setState({songs: filteredSongs});
      })
    }
  }

  render() {
    let artistString = '';
    let albumString = '';

    if (this.state.songs.length > 0) {
      return (
        <div className="content-top" key="1">
          <div className="content-album-header">
            <p className="head-info">TITLE</p>
            <p className="head-info-responsive">ARTIST</p>
            <p className="head-info-responsive">ALBUM</p>
            <p className="head-info"><i className="far fa-clock"></i></p>
          </div>
        {
            this.state.songs.map((song) => {
              artistString = '';
              this.props.artists.map((artist) => {
                return song.artist.forEach((songArtist) => {
                  if (songArtist === artist.id) {
                    artistString += `${artist.name}, `;
                  }
                })
              });
              this.props.albums.forEach((album) => {
                if (song.albums == album.id) {
                  albumString = `${album.name}`;
                }
              });
                return (
                    <div className="content-album" key={song.id}>
                      <p className="to-playlist"><i className="fas fa-plus"></i></p><p className="line-info">{song.name}</p>
                      <p className="line-info-responsive">{artistString.substring(0, artistString.length - 2)}</p>
                      <p className="line-info-responsive">{albumString}</p>
                      <p className="line-info">{song.duration}</p>
                    </div>
                )
            })
          }
        </div>
        )
    }
    else {
      return (
        <p>Oops! No songs matching your criteria were found...</p>
      )
    }
  }
}

export default Songs;
