import React, { Component } from 'react';

class Artists extends Component {

  render() {
    let filteredArtists = this.props.artists.filter((artist) => {
      return artist.name.match(this.props.queryParams);
    });

    if (filteredArtists.length > 0) {
      return (
        <div className="content-search artist">
          <div className="search-header">
            <h3 className="content-search-subtitle">Artist</h3>
          </div>
        {
          filteredArtists.map((artist) => {
            return (
            <div className="artist" key={artist.id}><img src={artist.image} alt="Artist photo"/><div className="search-info"><p>{artist.name}</p></div></div>
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

export default Artists
