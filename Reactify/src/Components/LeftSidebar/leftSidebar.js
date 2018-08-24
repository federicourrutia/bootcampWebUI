import React, { Component } from 'react';
import UserPlaylists from './userPlaylists';

class LeftSidebar extends Component {

  render() {
    return (
      <aside className="leftsidebar">
        <div className="leftsidebar-playlists">
          <a onClick={() => this.props.setExplore()} className="active menu">Explore</a>
          <span className="leftsidebar-subtitle">Playlists</span>
          <UserPlaylists user={this.props.user} playlists={this.props.playlists}/>
        </div>
      </aside>
    );
  }
}

export default LeftSidebar;
