import React, { Component } from 'react';
import ArtistsApi from '../../Api/artists-api';
import FriendsApi from '../../Api/friends-api';
import SongsApi from '../../Api/songs-api';

class RightSidebar extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      artists: '',
      friends: '',
      songs: '',
    }
  }

  componentDidMount() {
    Promise.all([ArtistsApi.getArtists(), FriendsApi.getFriends(), SongsApi.getSongs()]).then((response) => {
      this.setState({artists: response[0], friends: response[1], songs: response[2], hasData: true});
    })
  }

  render() {
    let songString = '';
    let artistString = '';
    return (
      <aside className="rightsidebar">
      {
        this.state.hasData
        ?
        <div className="wrap">
          <span className="rightsidebar-subtitle">Friends Activity</span>
          <hr className="rightsidebar-separator"/>
            {
              this.state.friends.map((friend) => {
                this.state.songs.forEach((song) => {
                  if (friend.songs == song.id) {
                    songString = song.name;
                    this.state.artists.forEach((artist) => {
                      if (song.artist == artist.id) {
                        artistString = artist.name
                      }
                    })
                  }
                })
              return (
              <div className="rightsidebar-friendcontainer" key={friend.id}>
                <div className="rightsidebar-imgwrapper">
                  <img src={friend.image} alt="Profile"/>
                </div>
                <div className="rightsidebar-wrapper">
                  <a className="rightsidebar-friendsname" href="#FriendProfile">{friend.name}</a>
                  <a className="rightsidebar-friendnowplaying" href="#Song">{songString}</a>
                  <a className="rightsidebar-friendnowplayingartist" href="#Artist">{artistString}</a>
                </div>
              </div>
              )
              })
          }
        </div>
        :
        <div className="wrap">
        <div className="loader center"><span></span></div>
        </div>
      }
      </aside>
    )
  }
}

export default RightSidebar;
