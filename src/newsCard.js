import React, { Component } from 'react';
import './newsCard.css';
import Modal from './modal.js'

class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalInfo: []
    };
  }

  _renderNewsCard() {
    return this.props.newsInfo.map((news, index) => (
      <div className="cardNews" key={index} id={`${index}`} onClick={this._changeStateModal.bind(this)}>
        {news.urlToImage ?
          <img className="cardImage" src={news.urlToImage} alt=""></img> :
          <img className="cardImage" src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6p6C_Zrbfhc/v0/1000x-1.jpg" alt=""></img>
        }
        <div className="cardNewsInfo">
          <div className="cardTitle">{news.title}</div>
          <div className="cardDetail">{news.author}</div>
        </div>
      </div>
    ));
  }

  _changeStateModal(ev) {
    const currentTargetInfo = ev.currentTarget.id;

    this.setState(state => ({
      modal: true,
      modalInfo: this.props.newsInfo[currentTargetInfo]
    }));
  }

  _deleteModal(ev) {
    if (ev.target.id === "modalBackground") {
      this.setState(state => ({
        modal: false
      }));
    }
  }

  _renderModal() {
    const thisInfo = this.state.modalInfo;

    return (
      <Modal deleteModal={this._deleteModal.bind(this)} thisInfo={thisInfo}/>
    );
  }

  render () {
    return (
      <React.Fragment>
        <div className="cardNewsListWrapper">
          {
            this.props.newsInfo && this.props.newsInfo.length ? this._renderNewsCard() : ""
          }
        </div>
        {this.state.modal ? this._renderModal() : ""}
      </React.Fragment>
    )
  }
}

export default NewsCard;
