import React, { Component } from 'react';

class Playlists extends Component {

  render() {
    let filteredPlaylists = this.props.playlists.filter((playlist) => {
      return playlist.name.match(this.props.queryParams);
    });

    if (filteredPlaylists.length > 0) {
      return (
        <div className="content-search playlists">
          <div className="search-header">
            <h3 className="content-search-subtitle">Playlists</h3>
          </div>
        {
          filteredPlaylists.map((playlist) => {
            return (
            <div className="playlist"><img src={playlist.image} alt="Playlist image"/><div className="search-info"><p>{playlist.name}</p><p>{playlist.followers} followers</p></div></div>
            )
          })
        }
        </div>
      )
    }
    else {
      return (null)
    }
  }
}

export default Playlists
