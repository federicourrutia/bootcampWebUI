import React, { Component } from 'react';
import PlaylistsApi from '../../../Api/playlists-api';

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      playlists: '',
    }
  }

  componentDidMount() {
    PlaylistsApi.getPlaylistsByQuery(this.props.queryParams).then((response) => {
      let queryParams = new RegExp(this.props.queryParams, 'i');
      let filteredPlaylists = response.filter((playlist) => {
        return playlist.name.match(queryParams);
      });
      this.setState({playlists: filteredPlaylists});
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      PlaylistsApi.getPlaylistsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredPlaylists = response.filter((playlist) => {
          return playlist.name.match(queryParams);
        });
        this.setState({playlists: filteredPlaylists});
      })
    }
  }

  render() {
    if (this.state.playlists.length > 0) {
      return (
        <div className="content-search playlists">
          <div className="search-header">
            <h3 className="content-search-subtitle">Playlists</h3>
          </div>
        {
          this.state.playlists.map((playlist) => {
            return (
            <div className="playlist" key={playlist.id}><img src={playlist.image} alt="Playlist"/><div className="search-info"><p>{playlist.name}</p><p>{playlist.followers} followers</p></div></div>
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
