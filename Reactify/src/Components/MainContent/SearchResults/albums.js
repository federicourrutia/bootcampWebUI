import React, { Component } from 'react';

class Albums extends Component {

  render() {
    let artistString = '';
    let filteredAlbums = this.props.albums.filter((album) => {
      return album.name.match(this.props.queryParams);
    });

    if (filteredAlbums.length > 0) {
      return (
        <div className="content-search albums">
          <div className="search-header">
            <h3 className="content-search-subtitle">Albums</h3>
          </div>
        {
          filteredAlbums.map((album) => {
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
