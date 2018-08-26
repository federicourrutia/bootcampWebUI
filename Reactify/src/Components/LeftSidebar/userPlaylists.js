import React, { Component } from 'react';

class UserPlaylists extends Component {

  render() {
    let playlistName = '';
    return (
      <div>
        {
          this.props.user.playlists.map((userPlaylist) => {
            this.props.playlists.forEach((playlist) => {
              if (userPlaylist === playlist.id) {
                playlistName = `${playlist.name}`
                if (playlistName.length > 15) {
                playlistName = `${playlistName.substring(0,15)}...`
                }
              }
            })
            return (
              <div className="userplaylist" key={userPlaylist}>{playlistName}{playlistName = ''}</div>
            )
          })
        }
      </div>
    )
  }
}

export default UserPlaylists;
