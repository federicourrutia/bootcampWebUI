import React, { Component } from 'react';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleDescription(event) {
    this.setState({description: event.target.value});
  }

  createPlaylist() {
    fetch('http://localhost:3000/playlists')
      .then((response) => {
        return response.json();
      })
      .then((playlists) => {
      let name = this.state.name;
      let description =  this.state.description;
      let id = playlists[playlists.length - 1].id + 1;
      let songs = [];
      let followers = '1';
      let image = 'https://i.imgur.com/HAKs6OO.png';
      let data = { id, name, description, songs, followers, image };
        if (name != '' & description != '') {
          fetch('http://localhost:3000/playlists', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            this.props.user.playlists.push(id);
            fetch(`http://localhost:3000/user/${this.props.user.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.props.user),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(() => {
                this.props.close();
                this.props.updatePlaylists();
              })
              .catch((error) => {
                console.error('Error:', error);
              })
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
        else {
          alert('Playlist name and/or description cannot be empty. Please fill both fields and try again.');
        }
    });
  }


  render() {
    return (
      <div>
      {
        this.props.show
        ?
        <div id="new-playlist" className="newplaylist-window-background">
         <div className="newplaylist-window">
           <div className="newplaylist-window-header">
             <span className="newplaylist-window-headertitle">Create Playlist</span>
           </div>
           <div className="newplaylist-window-playlistname">
             <span>Name</span>
             <input onChange={this.handleName} type="text" maxLength="100" required placeholder="Give your playlist a name." id="newPlayListName"/>
           </div>
           <div className="newplaylist-window-midcontainer">
             <div className="newplaylist-window-uploadimage">
               <span>Your Image</span>
               <div className="newplaylist-window-uploadimage-container">
                 <img src="https://i.imgur.com/KPdp0MV.png" alt="Upload"/>
                 <button className="newplaylist-window-uploadimage-button">Choose Image</button>
               </div>
             </div>
             <div className="newplaylist-window-description">
               <span>Description</span>
               <input onChange={this.handleDescription} type="text" maxLength="300" required placeholder="Give your playlist a catchy description." id="newPlayListDescription"/>
             </div>
           </div>
           <div className="newplaylist-window-footer">
             <button className="newplaylist-window-footer-buttoncancel" onClick={() => this.props.close()}>Cancel</button>
             <button className="newplaylist-window-footer-buttoncreate" onClick={() => this.createPlaylist()}>Create</button>
           </div>
         </div>
        </div>
        :
        <div className="hidden"/>
      }
      </div>
    )
  }
}

export default Modal;
