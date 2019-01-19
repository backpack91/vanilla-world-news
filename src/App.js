import React, { Component } from 'react';
import Header from './header.js'
import NewsList from './newsList.js'
import NewsCard from './newsCard.js'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newsList: [],
      listType: true,
      currentRequest: "",
      currentPage: 2
    };
  }

  _callExtraSearchApi() {
    let urlToRequest = `${this.currentRequest}&page=${this.currentPage}`;

    return fetch(urlToRequest)
    .then(res => res.json())
    .then(data => {
      console.log("data.articles: ", data.articles)
      return data.articles;
    })
    .catch(err => console.log(err));
  }

  _setCurrentRequest(url) {
    this.setState(state => {
      return {
        currentRequest: url
      }
    })
  }

  // async componentDidMount() {
  //   const sources = await this._callSourceApi();
  //   const search = await this._callSearchApi();
  //
  //   this.setState({
  //     sources,
  //     search
  //   });
  // }

  // _callSourceApi() {
  //   return fetch("https://newsapi.org/v2/sources?apiKey=28004306a1cf423dac8b895d774b3842")
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log('source: ', data);
  //
  //     return data.sources;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }
  //
  // _callSearchApi() {
  //   return fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=28004306a1cf423dac8b895d774b3842")
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log('serarch: ', data);
  //
  //     return data.articles;
  //   })
  //   .catch(err => console.log(err));
  // }

  // _renderHeader() {
  //   return <Header sources={this.state.sources}/>
  // }

  _deliverNewsList(newsList) {
    console.log('deliverinig...')
    this.setState(() => {
      return { newsList: newsList }
    })
  }

  _toggleNewsType() {
    if (this.state.listType) {
      this.setState(state => {
        return { listType: false }
      });
    } else {
      this.setState(state => {
        return { listType: true }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header deliverNewsList={this._deliverNewsList.bind(this)}
        setCurrentRequest={this._setCurrentRequest.bind(this)}/>
        <div className="main">
          <div className="infoOfMain">
            <div className="mainTitle">
              <h1>News you requested</h1>
            </div>
            <div className="toggleWrapper">
              {
                this.state.listType ?
                <i className="fas fa-th" onClick={this._toggleNewsType.bind(this)}></i> :
                <i onClick={this._toggleNewsType.bind(this)} className="fas fa-bars"></i>
              }
            </div>
          </div>
          {this.state.listType ? <NewsList newsInfo={this.state.newsList}/> : <NewsCard newsInfo={this.state.newsList} />}
        </div>
      </div>
    );
  }
}

export default App;
