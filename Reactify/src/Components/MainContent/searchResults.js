import React, { Component } from 'react';
import Songs from './songs';
import Artists from './artists';
import Albums from './albums';
import Playlists from './playlists';
class SearchResults extends Component {

  render() {
    return (
      <div className="wrap">
        <Songs songs={this.props.songs} artists={this.props.artists} albums={this.props.albums} queryParams={this.props.queryParams}/>
        <div className="content-bottom">
          <Artists artists={this.props.artists} queryParams={this.props.queryParams}/>
          <Albums albums={this.props.albums} artists={this.props.artists} queryParams={this.props.queryParams}/>
          <Playlists playlists={this.props.playlists} queryParams={this.props.queryParams}/>
        </div>
      </div>
    )
  }
}

export default SearchResults;
