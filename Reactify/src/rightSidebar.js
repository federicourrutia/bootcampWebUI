import React, { Component } from 'react';

class RightSidebar extends Component {

  render() {
    let songString = '';
    let artistString = '';

    return (
      <div className="rightsidebar">
          {
            this.props.friends.map((friend) => {
              this.props.songs.forEach((song) => {
                if (friend.songs == song.id) {
                  songString = song.name;
                  this.props.artists.forEach((artist) => {
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
    )
  }
}

export default RightSidebar;
