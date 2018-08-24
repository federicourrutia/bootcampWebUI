import React, { Component } from 'react';
import logo from './logo.svg';

class TopNav extends Component {

  componentDidMount() {
    let input = document.getElementById('searchinput');
    input.addEventListener('keydown', function(e) {
      if (e.keyCode == 13) {
      this.props.setSearch(input.value);
      }
    }.bind(this))
  }

  render() {

    return (
        <header className="topnav">
          <div className="topnav-menu">
            <a href="index.html"><img className="App-logo" src={logo} alt="Reactify logo"/></a>
          </div>
          <div className="topnav-search">
            <input id="searchinput" type="text" placeholder="Search"/>
          </div>
        </header>
      )
  }
}

export default TopNav;
