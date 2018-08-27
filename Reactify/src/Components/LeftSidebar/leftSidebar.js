import React, { Component } from 'react';
import UserPlaylists from './userPlaylists';
import Modal from '../../Components/Modal/modal';
import UserApi from '../../Api/user-api';
import PlaylistsApi from '../../Api/playlists-api';

class LeftSidebar extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      user: '',
      playlists: '',
      showModal: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  updatePlaylists() {
    PlaylistsApi.getPlaylists().then((response) => {
      this.setState({playlists: response});
    })
  }

  componentDidMount() {
    Promise.all([UserApi.getUser(), PlaylistsApi.getPlaylists()]).then((response) => {
      this.setState({user: response[0], playlists: response[1], hasData: true});
    })
  }

  render() {
    return (
      <aside className="leftsidebar">
      {
        this.state.hasData
        ?
        <div className="wrap">
          <div className="leftsidebar-playlists">
            <a onClick={() => this.props.setExplore()} className="active menu">Explore</a>
            <span className="leftsidebar-subtitle">Playlists</span>
            <UserPlaylists user={this.state.user} playlists={this.state.playlists}/>
          </div>
          <div className="leftsidebar-newplaylist" onClick={() => this.openModal()}>
            <div className="leftsidebar-newplaylist-icon"><i className="fas fa-plus-circle"></i></div>
            <a><span className="leftsidebar-newplaylist-text">New Playlist</span></a>
          </div>
          <Modal playlists={this.state.playlists} user={this.state.user} show={this.state.showModal} close={this.closeModal} updatePlaylists={this.updatePlaylists}/>
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

export default LeftSidebar;
