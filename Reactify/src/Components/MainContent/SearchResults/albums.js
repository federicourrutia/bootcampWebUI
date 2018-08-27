import React, { Component } from 'react';
import AlbumsApi from '../../../Api/albums-api';

class Albums extends Component {
  constructor() {
    super();
    this.state = {
      albums: '',
    }
  }

  componentDidMount() {
      AlbumsApi.getAlbumsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredAlbums = response.filter((album) => {
          return album.name.match(queryParams);
        });
        this.setState({albums: filteredAlbums});
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      AlbumsApi.getAlbumsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredAlbums = response.filter((album) => {
          return album.name.match(queryParams);
        });
        this.setState({albums: filteredAlbums});
      })
    }
  }

  render() {
    let artistString = '';
    if (this.state.albums.length > 0) {
      return (
        <div className="content-search albums">
          <div className="search-header">
            <h3 className="content-search-subtitle">Albums</h3>
          </div>
        {
          this.state.albums.map((album) => {
            this.props.artists.forEach((artist) => {
              if (album.artist == artist.id) {
                artistString = `${artist.name}`;
              }
            })
            return (
            <div className="album" key={album.id}><img src={album.image} alt="Album"/><div className="search-info"><p>{album.name}</p><p>{artistString}</p></div></div>
            )
          })
        }
        </div>
      )
    }
    else {
      return (null)
    }
  }
}

export default Albums
