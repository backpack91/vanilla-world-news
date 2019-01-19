import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './modal.css';

const modalRoot = document.getElementById('modalRoot');

class Modal extends Component {
  constructor(props) {
    super(props);
}

  // componentDidMount() {
  //   modalRoot.appendChild(this.el);
  // }
  //
  // componentWillUnmount() {
  //   modalRoot.removeChild(this.el);
  // }

  render () {
    return (
      <div className="modalBackground" onClick={this.props.deleteModal} id="modalBackground">
        <div className="modalWrapper">
          <img src={this.props.thisInfo.urlToImage} alt="alt"/>
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
