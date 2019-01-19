import React, { Component } from 'react';
import DateSetter from './dateSetter.js'
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SourceTab: false,
      selectedSources: ["T3n"],
      selectedSourcesId: ["t3n"],
      dateSetterTab: false,
      dateRange: [],
      keyWord: ""
    };
  }

  async componentDidMount() {
    const sources = await this._callSourceApi();
    console.log('this.state.selectedSources: ', this.state.selectedSources)
    console.log('this.state.selectedSourcesId: ', this.state.selectedSourcesId)
    this.setState({
      sources,
    });
  }

  _callSourceApi() {
    return fetch("https://newsapi.org/v2/sources?apiKey=28004306a1cf423dac8b895d774b3842")
    .then(res => res.json())
    .then(data => {
      console.log('source: ', data);

      return data.sources;
    })
    .catch(err => {
      console.log(err);
    });
  }

  _callSearchApi() {
    const url = 'https://newsapi.org/v2/everything?apiKey=28004306a1cf423dac8b895d774b3842&sortBy=popularity&pageSize=30';
    var withDateData = `&from=${this.state.dateRange[0]}&to=${this.state.dateRange[1]}`;
    var urlToRequest = url;
    var withKeyWord = `&q=${this.state.keyWord}`;
    var withSources = `&sources=${this.state.selectedSourcesId.join(',')}`;

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

      return data.articles;
    })
    .catch(err => console.log(err));
  }

  _openSourceTab() {
    if (this.state.SourceTab) {
      this.setState({
        SourceTab: false
      })
    } else {
      this.setState({
        SourceTab: true,
        dateSetterTab: false
      })
    }
  }

  _selectSource(ev) {
    const selectedSource = ev.target;

    if (!this.state.selectedSources.includes(selectedSource.innerText) && this.state.selectedSources.length < 20) {
      this.setState((state) => {
        return {
          selectedSources: state.selectedSources.concat(selectedSource.innerText),
          selectedSourcesId: state.selectedSourcesId.concat(selectedSource.id)
        };
      });
    }
  }

  _renderSources() {
    console.log('_renderSources: ', this.state);
    const sources = this.state.sources.map(source => {
      return <div onClick={this._selectSource.bind(this)} id={source.id} className="source" key={source.id}>{source.name}</div>;
    });

    return sources;
  }

  async _onSearch(ev) {
      const keyValue = ev.target.value;
    if (ev.keyCode === 13) {
      console.log('isEnterWorking')
      const filteredSearch = await this._callSearchApi(ev.target.value);
      console.log('filteredSearch: ', filteredSearch);
      console.log('value: ', keyValue);
      this.props.deliverNewsList(filteredSearch);

      this.setState(state => {
        return {
          keyWord: keyValue,
          SourceTab: false,
          dateSetterTab: false
        }
      })
    }
  }

  _onKeyWordChange(ev) {
    console.log(ev.target.value);
    this.setState({
      keyWord: ev.target.value
    })
  }

  _deleteSelectedSource(ev) {
    const sourceName = ev.target.parentNode.innerText;
    const sourceId = ev.target.parentNode.id;

    this.setState(state => {
      const indexOfSourceTobeRemoved = state.selectedSources.indexOf(sourceName);
      const modifiedSources = state.selectedSources.slice()
      modifiedSources.splice(indexOfSourceTobeRemoved, 1);
      const indexOfSourceIdTobeRemoved = state.selectedSources.indexOf(sourceId);
      const modifiedSourcesId = state.selectedSourcesId.slice()
      modifiedSourcesId.splice(indexOfSourceIdTobeRemoved, 1);

      return {
        selectedSources: modifiedSources,
        selectedSourcesId: modifiedSourcesId
      };
    })
  }

  _writeSelectedSource() {
    const title = [<div className="filterName" key="filterName">Publishing Company:</div>];

    return title.concat(this.state.selectedSources.map(sourceName => {
      return <div className="selectedSource" key={sourceName}>{ sourceName }<i className="fas fa-times" onClick={this._deleteSelectedSource.bind(this)}></i></div>
    }));
  }

  _openDateSetterTab() {
    if (this.state.dateSetterTab) {
      this.setState({
        dateSetterTab: false
      })
    } else {
      this.setState({
        dateSetterTab: true,
        SourceTab: false
      })
    }
  }

  _getDateRange(date) {
    console.log("gotten Date: ", date);
    this.setState({
      dateRange: date
    });
  }

  _writeSelectedDateRange() {
    console.log("writeSelectedDateRange working...")
    const title = [<div className="filterName" key="dateTitle">Selected date range:</div>];

    return title.concat([
      <div className="selectedSource" key="date">{ `from ${this.state.dateRange[0]} to ${this.state.dateRange[1]}`  }<i className="fas fa-times" onClick={this._deleteSelectedDate.bind(this)}></i></div>
    ])
  }

  _deleteSelectedDate(ev) {
    console.log("ev.target.parentNode: ", ev.target.parentNode);
    this.setState(state => {
      return { dateRange: [] }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <div className="header">
            <div className="logoWrapper">
              <div className="logo">vanilla News</div>
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
          <i className="fas fa-search"></i><input type="text" onChange={this._onKeyWordChange.bind(this)} onKeyDown={this._onSearch.bind(this)}/>
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
          { this.state.dateSetterTab ? <DateSetter getDateRange={this._getDateRange.bind(this)} /> : "" }
          <div className="category">
            { this.state.sources && this.state.SourceTab ? this._renderSources() : "" }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;
