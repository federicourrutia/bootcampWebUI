import React, { Component } from 'react';

class Explore extends Component {

  render() {
    return (
      <div className="wrap">
        <div className="content-title">
          <span className="content-title-text">Genre list - index</span>
        </div>
        <div className="content-gallery">
      {
        this.props.genres.map((genre) => {
          return (
            <a href={genre.link} key={genre.id}><img src={genre.image} alt="Genre"/></a>
          )
        })
      }
        </div>
      </div>
    )
  }
}

export default Explore;
