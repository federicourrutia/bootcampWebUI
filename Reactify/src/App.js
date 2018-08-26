import React, { Component } from 'react';
import TopNav from './Components/TopNav/topNav';
import LeftSidebar from './Components/LeftSidebar/leftSidebar';
import MainContent from './Components/MainContent/mainContent';
import RightSidebar from './Components/RightSidebar/rightSidebar';
import FooterPlayer from './Components/FooterPlayer/footerPlayer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      content: 'explore',
      queryParams: '',
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

  render() {
    return (
      <div className="root">
        <TopNav setSearch={this.setSearch} setExplore={this.setExplore}/>
        <div className="maincontainer">
          <LeftSidebar setExplore={this.setExplore}/>
          <MainContent queryParams={this.state.queryParams} content={this.state.content}/>
          <RightSidebar/>
        </div>
        <FooterPlayer/>
      </div>
    )
  }
}

export default App;
