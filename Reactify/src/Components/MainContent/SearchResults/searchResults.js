import React, { Component } from 'react';
import Songs from './songs';
import Artists from './artists';
import Albums from './albums';
import Playlists from './playlists';
import PlaylistsApi from '../../../Api/playlists-api';
import ArtistsApi from '../../../Api/artists-api';
import SongsApi from '../../../Api/songs-api';
import AlbumsApi from '../../../Api/albums-api';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      playlists: '',
      artists: '',
      songs: '',
      albums: '',
    }
  }

  componentDidMount() {
    Promise.all([PlaylistsApi.getPlaylists(), ArtistsApi.getArtists(), SongsApi.getSongs(), AlbumsApi.getAlbums()]).then((response) => {
      this.setState({playlists: response[0], artists: response[1], songs: response[2], albums: response[3], hasData: true});
    })
 }

  render() {
    return (
      <div className="wrap">
      {
        this.state.hasData
        ?
        <div className="wrap">
        <Songs songs={this.state.songs} artists={this.state.artists} albums={this.state.albums} queryParams={this.props.queryParams}/>
        <div className="content-bottom">
          <Artists artists={this.state.artists} queryParams={this.props.queryParams}/>
          <Albums albums={this.state.albums} artists={this.state.artists} queryParams={this.props.queryParams}/>
          <Playlists playlists={this.state.playlists} queryParams={this.props.queryParams}/>
        </div>
        </div>
        :
        <main className="content-top">
        <div className="loader center"><span></span></div>
        </main>
      }
    </div>
    )
  }
}

export default SearchResults;
