import React, { Component } from 'react';
import TopNav from './topNav';
import LeftSidebar from './leftSidebar';
import MainContent from './mainContent';
import RightSidebar from './rightSidebar';
import FooterPlayer from './footerPlayer';
import Api from './api';

class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = {hasData: false}
  }

  componentDidMount() {
     this.api.getData().then((response) => {
       this.playlists = response[0];
       this.artists = response[1];
       this.friends = response[2];
       this.songs = response[3];
       this.user = response[4];
       this.albums = response[5];
       this.audio = response[6];
       this.setState({hasData: true});
   })
 }
  render() {
    return (
      <div className="root">
        {
          this.state.hasData
          ?
          <div className="root">
            <TopNav/>
            <div className="maincontainer">
              <LeftSidebar user={this.user} playlists={this.playlists}/>
              <MainContent/>
              <RightSidebar friends={this.friends} songs={this.songs} artists={this.artists}/>
            </div>
            <FooterPlayer data={this.audio}/>
          </div>
          :
          <div className="loader center"><span></span></div>
        }
      </div>
    );
  }
}

export default App;
