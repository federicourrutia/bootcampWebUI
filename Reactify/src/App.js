import React, { Component } from 'react';
import TopNav from './Components/TopNav/topNav';
import LeftSidebar from './Components/LeftSidebar/leftSidebar';
import MainContent from './Components/MainContent/mainContent';
import RightSidebar from './Components/RightSidebar/rightSidebar';
import FooterPlayer from './Components/FooterPlayer/footerPlayer';
import Api from './Components/Api/api';

class App extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.state = {
      hasData: false,
      content: 'explore',
      queryParams: ''
    }
    this.setSearch = this.setSearch.bind(this);
    this.setExplore = this.setExplore.bind(this);
  }

  setSearch(value) {
    value = new RegExp(value, 'i');
    this.setState({content: 'search', queryParams: value});
  }

  setExplore() {
    this.setState({content: 'explore'});
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
       this.genres = response[7];
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
            <TopNav setSearch={this.setSearch}/>
            <div className="maincontainer">
              <LeftSidebar setExplore={this.setExplore} user={this.user} playlists={this.playlists}/>
              <MainContent queryParams={this.state.queryParams} content={this.state.content} playlists={this.playlists} songs={this.songs} artists={this.artists} albums={this.albums} genres={this.genres}/>
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
