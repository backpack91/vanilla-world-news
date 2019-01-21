import React, { Component } from 'react';
import Header from './header.js';
import NewsList from './newsList.js';
import NewsCard from './newsCard.js';
import Loading from './loading.js';
import './App.css';

let extraRequest = false;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeadLine: [],
      newsList: [],
      listType: false,
      currentRequest: '',
      currentPage: 2,
      scrollTop: false,
      isLoading: false,
      isExtraPagesLoading: false,
      isHeadLineOn: true,
      blankMessage: false,
      emptyDataMessage: false
    };
  }

  _callExtraSearchApi() {
    const urlToRequest = `${this.state.currentRequest}&page=${this.state.currentPage}`;

    return fetch(urlToRequest)
    .then(res => res.json())
    .then(data => {
      this._makeStateExtraPagesLoading(false);
      this.setState(state => ({
        newsList: state.newsList.concat(data.articles),
        currentPage: state.currentPage + 1
      }));
      extraRequest = false;

      return data.articles;
    })
    .catch(err => {
      this._makeStateExtraPagesLoading(false);
      console.log(err);
    });
  }

  _callHeadLineApi() {
    this.setState(state => {
      return {
        isLoading: true
      };
    });
    return fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=28004306a1cf423dac8b895d774b3842")
    .then(res => res.json())
    .then(data => {
      return data.articles;
    })
    .catch(err => {
      console.log(err);
    });
  }

  _setCurrentRequest(currentRequest) {
    this.setState(state => ({
      currentRequest
    }));
  }

  _makeStateLoading(isLoading) {
    this.setState(state => ({
      isLoading
    }));
  }

  _makeStateExtraPagesLoading(isExtraPagesLoading) {
    this.setState(state => ({
      isExtraPagesLoading
    }));
  }

  _deliverNewsList(newsList) {
    this.setState(() => ({
      newsList
    }));
  }

  _toggleNewsType() {
    if (this.state.listType) {
      this.setState(state => ({
        listType: false
      }));
    } else {
      this.setState(state => ({
        listType: true
      }));
    }
  }

  _infinityScroll () {
    if (!extraRequest &&
    (document.body.offsetHeight - 400 < window.scrollY + window.innerHeight) &&
    this.state.currentRequest.length > 0 &&
    !this.state.isHeadLineOn &&
    this.state.newsList.length) {
      this._makeStateExtraPagesLoading(true);
      this._callExtraSearchApi();
      extraRequest = true;
    }

    if (window.scrollY > 1300 && !this.state.scrollTop) {
      this.setState(state => ({
        scrollTop: true
      }));
    } else if (window.scrollY <= 1300 && this.state.scrollTop) {
      this.setState(state => ({
        scrollTop: false
      }));
    }
  }

  _changeHeadLineState(isHeadLineOn) {
    if (isHeadLineOn) {
      this.setState(state => ({
        isHeadLineOn,
        blankMessage: false,
        emptyDataMessage: false
      }));
    } else {
      this.setState(state => ({
        isHeadLineOn
      }));
    }
  }

  _changeBlankMessageState(isInputEmpty) {
    if (isInputEmpty) {
      this.setState(state => ({
        blankMessage: isInputEmpty,
        emptyDataMessage: false
      }));
    } else {
      this.setState(state => ({
        blankMessage: isInputEmpty
      }));
    }
  }

  _changeEmptyDataState(isDataEmpty) {
    if (isDataEmpty) {
      this.setState(state => ({
        emptyDataMessage: isDataEmpty,
        blankMessage: false
      }));
    } else {
      this.setState(state => ({
        emptyDataMessage: isDataEmpty,
      }));
    }
  }

  _topBtn () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async componentDidMount() {
    const headLineData = await this._callHeadLineApi();

    window.addEventListener('scroll', this._infinityScroll.bind(this));
    this.setState(state => ({
      isLoading: false,
      topHeadLine: headLineData,
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._infinityScroll.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Header deliverNewsList={this._deliverNewsList.bind(this)}
          setCurrentRequest={this._setCurrentRequest.bind(this)}
          makeStateLoading={this._makeStateLoading.bind(this)}
          changeHeadLineState={this._changeHeadLineState.bind(this)}
          changeBlankMessageState={this._changeBlankMessageState.bind(this)}
          changeEmptyDataState={this._changeEmptyDataState.bind(this)}
        />
        <div className="main">
          <i className={this.state.scrollTop ? "fas fa-arrow-circle-up topBtn" : "fas fa-arrow-circle-up topBtn hide"}
            onClick={this._topBtn}>
          </i>
          <div className="infoOfMain">
            <div className="mainTitle">
              {this.state.isHeadLineOn ? <h1>Head Line</h1> : <h1>News you requested</h1>}
            </div>
            <div className="toggleWrapper">
              {
                this.state.listType ?
                  <i className="fas fa-th" onClick={this._toggleNewsType.bind(this)}></i> :
                  <i onClick={this._toggleNewsType.bind(this)} className="fas fa-bars"></i>
              }
            </div>
          </div>
          {this.state.isLoading ? <Loading/> : ""}
          {this.state.blankMessage ? <div className="alertMessage">Please, select any source/date or write Keyword on Search box :)</div> : ""}
          {this.state.emptyDataMessage ? <div className="alertMessage">there's no articles with this Keyword :(</div> : ""}
          {
            this.state.listType ? <NewsList newsInfo={this.state.isHeadLineOn ? this.state.topHeadLine : this.state.newsList}/> :
            <NewsCard newsInfo={this.state.isHeadLineOn ? this.state.topHeadLine : this.state.newsList}/>
          }
          {this.state.isExtraPagesLoading ? <Loading/> : ""}
        </div>
      </div>
    );
  }
}

export default App;
