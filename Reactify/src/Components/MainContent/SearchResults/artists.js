import React, { Component } from 'react';
import ArtistsApi from '../../../Api/artists-api';

class Artists extends Component {
  constructor() {
    super();
    this.state = {
      artists: '',
    }
  }

  componentDidMount() {
      ArtistsApi.getArtistsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredArtists = response.filter((artist) => {
          return artist.name.match(queryParams);
        });
        this.setState({artists: filteredArtists});
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      ArtistsApi.getArtistsByQuery(this.props.queryParams).then((response) => {
        let queryParams = new RegExp(this.props.queryParams, 'i');
        let filteredArtists = response.filter((artist) => {
          return artist.name.match(queryParams);
        });
        this.setState({artists: filteredArtists});
      })
    }
  }

  render() {
    if (this.state.artists.length > 0) {
      return (
        <div className="content-search artist">
          <div className="search-header">
            <h3 className="content-search-subtitle">Artist</h3>
          </div>
        {
          this.state.artists.map((artist) => {
            return (
            <div className="artist" key={artist.id}><img src={artist.image} alt="Artist"/><div className="search-info"><p>{artist.name}</p></div></div>
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
