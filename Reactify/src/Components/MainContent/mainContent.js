import React, { Component } from 'react';
import Explore from './Explore/explore';
import SearchResults from './SearchResults/searchResults';

class MainContent extends Component {

  render() {
        switch(this.props.content) {
          case 'explore':
            return (
              <main className="content"><Explore genres={this.props.genres}/></main>
            )
          case 'search':
            return (
              <main className="content">
              <div className="content-title">
                <span className="content-title-text">Search Results</span>
              </div>
              <div className="content-gallery-search">
              <SearchResults playlists={this.props.playlists} songs={this.props.songs} artists={this.props.artists} albums={this.props.albums} queryParams={this.props.queryParams}/>
              </div>
              </main>
            )
            default:
        }
      }
}
export default MainContent;
