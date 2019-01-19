import React, { Component } from 'react';
import Modal from './modal.js'
import './newsList.css';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalInfo: []
    };
  }

  _renderNewsList() {
    return this.props.newsInfo.map((news, index) => {
      return (
        <div className="news" key={index} id={`${index}`}
        onClick={this._changeStateModal.bind(this)}>
          <img className="image" src={news.urlToImage} alt=""></img>
          <div className="newsInfo">
            <div className="title">{news.title}</div>
            <div className="detail">{news.author}</div>
            <div className="detail">{news.publishedAt}</div>
            <div className="detail">{news.description}</div>
            <div className="detail">{news.source.name}</div>
          </div>
        </div>
      )
    })
  }

  _changeStateModal(ev) {
    const currentTargetInfo = ev.currentTarget.id;
    const body = document.getElementById('body');

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

    return (
      <Modal deleteModal={this._deleteModal.bind(this)} thisInfo={thisInfo} />
    )
  }

  render () {
    return (
      <div className="newsListWrapper">
        {
          this.props.newsInfo && this.props.newsInfo.length ? this._renderNewsList() : ""
        }
        {this.state.modal ? this._renderModal() : ""}
      </div>
    )
  }
}

export default NewsList;
