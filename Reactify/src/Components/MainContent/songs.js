import React, { Component } from 'react';

class Songs extends Component {

  render() {
    let artistString = '';
    let albumString = '';
    let filteredSongs = this.props.songs.filter((song) => {
      return song.name.match(this.props.queryParams);
    });

    if (filteredSongs.length > 0) {
      return (
        <div className="content-top" key="1">
          <div className="content-album-header">
            <p className="head-info">TITLE</p>
            <p className="head-info-responsive">ARTIST</p>
            <p className="head-info-responsive">ALBUM</p>
            <p className="head-info"><i className="far fa-clock"></i></p>
          </div>
        {
            filteredSongs.map((song) => {
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
