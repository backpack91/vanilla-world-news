import React, { Component } from 'react';
import Header from './header.js'
import NewsList from './newsList.js'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newsList: []
    };
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
    debugger;
    console.log('deliverinig...')
    this.setState(() => {
      return { newsList: newsList }
    })
  }

  render() {
    return (
      <div className="App">
        <Header deliverNewsList={this._deliverNewsList.bind(this)}/>
        <NewsList newsList={this.state.newsList}/>
      </div>
    );
  }
}

export default App;
