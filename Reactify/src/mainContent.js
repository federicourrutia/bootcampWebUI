import React, { Component } from 'react';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  render() {
    return (
      <main className="content"> { this.state.content } </main>
    );
  }
}
export default MainContent;
