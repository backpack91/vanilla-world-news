import React, { Component } from 'react';
import './newsList.css';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderNewsList() {
    console.log("rendering newsList...")
    console.log("this.props.newsList: ", this.props.newsList)
    return this.props.newsList.map((news, index) => {

      return (
        <div className="news" key={index}>
          <img className="image" src={news.urlToImage} alt=""></img>
          <div className="newsInfo">
            <div className="title">{news.title}</div>
            <div className="detail">{news.author}</div>
            <div className="detail">{news.publishedAt}</div>
            <div className="detail">{news.source.name}</div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className="newsListWrapper">
        {
          this.props.newsList.length ? this._renderNewsList() : "loading..."
        }
      </div>
    )
  }
}

export default NewsList;
