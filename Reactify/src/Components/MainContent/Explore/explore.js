import React, { Component } from 'react';
import GenresApi from '../../../Api/genres-api';

class Explore extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      genres: '',
    }
  }

  componentDidMount() {
    GenresApi.getGenres().then((response) => {
      this.setState({genres: response});
      this.setState({hasData: true});
   })
  }

  render() {
    return (
      <div className="wrap">
      {
        this.state.hasData
        ?
        <div className="wrap">
          <div className="content-title">
            <span className="content-title-text">Genre list - index</span>
          </div>
          <div className="content-gallery">
          {
            this.state.genres.map((genre) => {
              return (
                <a key={genre.id}><img src={genre.image} alt="Genre"/></a>
              )
            })
          }
          </div>
        </div>
        :
        <div className="loader center"><span></span></div>
      }
      </div>
    )
  }
}

export default Explore;
