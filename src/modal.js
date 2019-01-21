import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const body = document.getElementById('body');

    body.classList.add('fixScroll');
  }

  componentWillUnmount() {
    const body = document.getElementById('body');

    body.classList.remove('fixScroll');
  }

  render () {
    return (
      <div className="modalBackground" onClick={this.props.deleteModal} id="modalBackground">
        <div className="modalWrapper">
          {
            this.props.thisInfo.urlToImage ?
            <img src={this.props.thisInfo.urlToImage} alt="alt"/> :
            <img className="cardImage" src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6p6C_Zrbfhc/v0/1000x-1.jpg" alt=""></img>
          }
          <div className="modalInfo">
            <div className="modalTitle">{this.props.thisInfo.title}</div>
            <div className="publishDate">{this.props.thisInfo.publishedAt}</div>
            <div className="modalDescription">{this.props.thisInfo.description}</div>
            <div className="modalContent">{this.props.thisInfo.content}</div>
            <div>
            <div className="modalSourceAuthorWrapper">
              <div>source: {this.props.thisInfo.source.name}</div>
              <div className="modalAuthor">author: {this.props.thisInfo.author}</div>
            </div>
            <div className="modalLink">
              <a href={this.props.thisInfo.url}>go read this article</a>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
