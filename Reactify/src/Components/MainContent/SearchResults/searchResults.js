import React, { Component } from 'react';
import Songs from './songs';
import Artists from './artists';
import Albums from './albums';
import Playlists from './playlists';
import ArtistsApi from '../../../Api/artists-api';
import AlbumsApi from '../../../Api/albums-api';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      artists: '',
      albums: '',
    }
  }

  componentDidMount() {
    Promise.all([ArtistsApi.getArtists(), AlbumsApi.getAlbums()]).then((response) => {
      this.setState({artists: response[0], albums: response[1], hasData: true});
    })
  }

  render() {
    return (
      <div className="wrap">
      {
        this.state.hasData
        ?
        <div className="wrap">
        <Songs artists={this.state.artists} albums={this.state.albums} queryParams={this.props.queryParams}/>
        <div className="content-bottom">
          <Artists queryParams={this.props.queryParams}/>
          <Albums artists={this.state.artists} queryParams={this.props.queryParams}/>
          <Playlists queryParams={this.props.queryParams}/>
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
