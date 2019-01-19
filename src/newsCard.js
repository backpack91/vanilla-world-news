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
    console.log("rendering newsCard...")
    console.log("this.props.newsCard: ", this.props.newsInfo)
    return this.props.newsInfo.map((news, index) => {

      return (
        <div className="cardNews" key={index} id={`${index}`}
        onClick={this._changeStateModal.bind(this)}>
          <img className="cardImage" src={news.urlToImage} alt=""></img>
          <div className="cardNewsInfo">
            <div className="cardTitle">{news.title}</div>
            <div className="cardDetail">{news.author}</div>
          </div>
        </div>
      )
    })
  }

  _changeStateModal(ev) {
    const currentTargetInfo = ev.currentTarget.id;
    const body = document.getElementById('body');
    console.log("body: ", body)
    body.classList.add('fixScroll');
    this.setState(state => {
      return {
        modal: true,
        modalInfo: this.props.newsInfo[currentTargetInfo]
      }
    });
  }

  _deleteModal(ev) {
    if (ev.target.id === "modalBackground") {
      const body = document.getElementById('body');

      body.classList.remove('fixScroll');
      this.setState(state => {
        return {modal: false};
      })
    }
  }

  _renderModal(ev) {
    const thisInfo = this.state.modalInfo;
    console.log("thisInfo: ", thisInfo);
    return (
      <Modal deleteModal={this._deleteModal.bind(this)} thisInfo={thisInfo} />
    )
  }

  render () {
    console.log("this.props.newsCard : ", this.props.newsInfo);
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
