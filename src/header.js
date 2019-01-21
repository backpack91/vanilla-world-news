import React, { Component } from 'react';
import DateSetter from './dateSetter.js'
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SourceTab: false,
      selectedSources: [],
      selectedSourcesId: [],
      dateSetterTab: false,
      dateRange: [],
      keyWord: "",
    };
  }

  async componentDidMount() {
    const sources = await this._callSourceApi();

    this.setState({
      sources,
    });
  }

  _callSourceApi() {
    return fetch("https://newsapi.org/v2/sources?apiKey=28004306a1cf423dac8b895d774b3842")
    .then(res => res.json())
    .then(data => {
      return data.sources;
    })
    .catch(err => {
      console.log(err);
    });
  }

  _callSearchApi() {
    const url = 'https://newsapi.org/v2/everything?apiKey=28004306a1cf423dac8b895d774b3842&sortBy=popularity&pageSize=30';
    let withDateData = `&from=${this.state.dateRange[0]}&to=${this.state.dateRange[1]}`;
    let urlToRequest = url;
    let withKeyWord = `&q=${this.state.keyWord}`;
    let withSources = `&sources=${this.state.selectedSourcesId.join(',')}`;

    if (this.state.selectedSourcesId.length) {
      urlToRequest += withSources;
    }
    if (this.state.keyWord.length) {
      urlToRequest += withKeyWord;
    }
    if (this.state.dateRange.length) {
      urlToRequest += withDateData;
    }
    this.props.setCurrentRequest(urlToRequest);

    return fetch(urlToRequest)
    .then(res => res.json())
    .then(data => {
      this.props.makeStateLoading(false);
      this.props.changeHeadLineState(false);
      if (!data.articles.length) {
        this.props.changeEmptyDataState(true);
      } else {
        this.props.changeEmptyDataState(false);
      }
      this.props.changeBlankMessageState(false);

      return data.articles;
    })
    .catch(err => {
      this.props.changeBlankMessageState(true);
      this.props.makeStateLoading(false);
      this.props.changeHeadLineState(false);
      console.log(err);
    });
  }

  _openSourceTab() {
    if (this.state.SourceTab) {
      this.setState({
        SourceTab: false
      });
    } else {
      this.setState({
        SourceTab: true,
        dateSetterTab: false
      });
    }
  }

  _selectSource(ev) {
    const selectedSource = ev.target;

    if (!this.state.selectedSources.includes(selectedSource.innerText) && this.state.selectedSources.length < 20) {
      this.setState((state) => ({
        selectedSources: state.selectedSources.concat(selectedSource.innerText),
        selectedSourcesId: state.selectedSourcesId.concat(selectedSource.id)
      }));
    }
  }

  _renderSources() {
    const sources = this.state.sources.map(source => {
      return (
        <div
          onClick={this._selectSource.bind(this)}
          id={source.id}
          className="source"
          key={source.id}
          style={this.state.selectedSourcesId.includes(source.id) ? {backgroundColor: "#EAEAEA", color: "#464E54"} : {}}
        >
          {source.name}
        </div>
      );
    });

    return sources;
  }

  async _onSearch(ev) {
    const keyValue = ev.target.value;

    if (ev.keyCode === 13) {
      this.props.makeStateLoading(true);
      const filteredSearch = await this._callSearchApi(ev.target.value);
      filteredSearch ? this.props.deliverNewsList(filteredSearch) : this.props.deliverNewsList([]);

      this.setState(state => ({
        keyWord: keyValue,
        SourceTab: false,
        dateSetterTab: false
      }));
    }
  }

  _onKeyWordChange(ev) {
    this.setState({
      keyWord: ev.target.value
    });
  }

  _deleteSelectedSource(ev) {
    const sourceName = ev.target.parentNode.innerText;
    const sourceId = ev.target.parentNode.id;

    this.setState(state => {
      const indexOfSourceTobeRemoved = state.selectedSources.indexOf(sourceName);
      const modifiedSources = state.selectedSources.slice();
      const indexOfSourceIdTobeRemoved = state.selectedSources.indexOf(sourceId);
      const modifiedSourcesId = state.selectedSourcesId.slice();

      modifiedSources.splice(indexOfSourceTobeRemoved, 1);
      modifiedSourcesId.splice(indexOfSourceIdTobeRemoved, 1);

      return {
        selectedSources: modifiedSources,
        selectedSourcesId: modifiedSourcesId
      };
    });
  }

  _writeSelectedSource() {
    return (
      [<div className="filterName" key="filterName">Publishing Company:</div>]
      .concat(this.state.selectedSources.map(sourceName => {
        return (
          <div className="selectedSource" key={sourceName}>
            { sourceName }
            <i className="fas fa-times" onClick={this._deleteSelectedSource.bind(this)}></i>
          </div>
        );
      }))
    );
  }

  _openDateSetterTab() {
    if (this.state.dateSetterTab) {
      this.setState({
        dateSetterTab: false
      });
    } else {
      this.setState({
        dateSetterTab: true,
        SourceTab: false
      });
    }
  }

  _getDateRange(date) {
    this.setState({
      dateRange: date
    });
  }

  _writeSelectedDateRange() {
    return (
      [<div className="filterName" key="dateTitle">Selected date range:</div>]
      .concat([
        <div className="selectedSource" key="date">
          {`from ${this.state.dateRange[0]} to ${this.state.dateRange[1]}`}
          <i className="fas fa-times" onClick={this._deleteSelectedDate.bind(this)}></i>
        </div>
      ])
    );
  }

  _deleteSelectedDate(ev) {
    this.setState(state => (
      {dateRange: []}
    ));
  }

  _goToHeadLine() {
    this.props.changeHeadLineState(true);
  }

  render() {
    const categorySlideDown = {
      animationDuration: '0.8s',
      animationName: 'slideDown',
      animationDirection: 'alternate',
      animationFillMode: 'forwards'
    };

    const dateSetterSlideDown = {
      animationDuration: '0.5s',
      animationName: 'slideDownCalander',
      animationDirection: 'alternate',
      animationFillMode: 'forwards'
    };

    return (
      <React.Fragment>
        <div className="headerWrapper">
          <div className="header">
            <div className="logoWrapper">
              <div className="logo" onClick={this._goToHeadLine.bind(this)}>
                <div>
                  Vanilla
                </div>
                <div>
                  News
                </div>
              </div>
            </div>
            <div className="nav">
              <div>filter </div>
              <div className="navItem" onClick={this._openDateSetterTab.bind(this)}>Date <i className="fas fa-caret-down"></i></div>
              <div className="navItem" onClick={this._openSourceTab.bind(this)}>Source <i className="fas fa-caret-down"></i></div>
            </div>
            <div className="user">
            </div>
          </div>
        </div>
        <div className="searchBar">
          <i className="fas fa-search"></i>
          <input type="text" onChange={this._onKeyWordChange.bind(this)} onKeyDown={this._onSearch.bind(this)}/>
        </div>
        <div className="categoryWrapper">
          <div className="selectedFilter">
            <div className="selectedDate">
              { this.state.dateRange.length ? this._writeSelectedDateRange() : ""}
            </div>
            <div className="selectedSources">
              { this.state.selectedSources.length ? this._writeSelectedSource() : ""}
            </div>
          </div>
          <div className="dateRangeTab" style={this.state.dateSetterTab ? dateSetterSlideDown : {}}>
          { this.state.dateSetterTab ? <DateSetter getDateRange={this._getDateRange.bind(this)}/> : "" }
          </div>
          <div className="category" style={this.state.SourceTab ? categorySlideDown : {}}>
            { this.state.sources && this.state.SourceTab ? this._renderSources() : "" }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
