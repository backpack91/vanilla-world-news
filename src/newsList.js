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
    return this.props.newsInfo.map((news, index) =>
      <div className="news" key={index} id={`${index}`} onClick={this._changeStateModal.bind(this)}>
        {news.urlToImage ?
          <img className="image" src={news.urlToImage} alt=""></img> :
          <img className="image" src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i6p6C_Zrbfhc/v0/1000x-1.jpg" alt=""></img>
        }
        <div className="newsInfo">
          <div className="title">{news.title}</div>
          <div className="detail">{news.author}</div>
          <div className="detail">{news.publishedAt}</div>
          <div className="detail">{news.description}</div>
          <div className="detail">{news.source.name}</div>
        </div>
      </div>
    );
  }

  _changeStateModal(ev) {
    const currentTargetInfo = ev.currentTarget.id;
    const body = document.getElementById('body');

    body.classList.add('fixScroll');
    this.setState(state => ({
      modal: true,
      modalInfo: this.props.newsInfo[currentTargetInfo]
    }));
  }

  _deleteModal(ev) {
    if (ev.target.id === "modalBackground") {
      const body = document.getElementById('body');

      body.classList.remove('fixScroll');
      this.setState(state => {
        return {modal: false};
      });
    }
  }

  _renderModal() {
    const thisInfo = this.state.modalInfo;

    return (
      <Modal deleteModal={this._deleteModal.bind(this)} thisInfo={thisInfo} />
    );
  }

  render () {
    return (
      <div className="newsListWrapper">
        {
          this.props.newsInfo && this.props.newsInfo.length ? this._renderNewsList() : ""
        }
        {this.state.modal ? this._renderModal() : ""}
      </div>
    );
  }
}

export default NewsList;
