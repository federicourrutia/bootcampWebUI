import React, { Component } from 'react';
import logo from './logo.svg';

class TopNav extends Component {
  render() {
    return (
      <header className="topnav">
        <div className="topnav-menu">
          <a href="index.html"><img className="App-logo" src={logo} alt="Reactify logo"/></a>
        </div>
        <div className="topnav-search">
          <form action="searchresults.html" method="get">
          <input name="q" className="searchinput" type="text" placeholder="Search"/>
          </form>
        </div>
      </header>
    );
  }
}
export default TopNav;
