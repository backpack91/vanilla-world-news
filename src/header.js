import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SourceTab: false,
      selectedSources: []
    };
  }

  async componentDidMount() {
    const sources = await this._callSourceApi();
    const search = await this._callSearchApi();

    this.setState({
      sources,
      search
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
    var queryList = "";
    console.log("selectedSources: ", this.state.selectedSources);
    return fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=28004306a1cf423dac8b895d774b3842&sources=${this.state.selectedSources.join(',')}`)
    .then(res => res.json())
    .then(data => {
      console.log('serarch: ', data);

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
        SourceTab: true
      })
    }
  }

  _selectSource(ev) {
    console.log(ev.target.innerText);
    const selectedSource = ev.target
    this.setState((state) => {
      return { selectedSources: state.selectedSources.concat(selectedSource.innerText) };
    });
  }

  // _renderSources() {
  //   console.log('_renderSources: ', this.state);
  //   const sources = this.props.sources.map(source => {
  //     return <div onClick={this._selectSource.bind(this)} className="source" key={source.id}>{source.name}</div>;
  //   });
  //
  //   return sources;
  // }

  _renderSources() {
    console.log('_renderSources: ', this.state);
    const sources = this.state.sources.map(source => {
      return <div onClick={this._selectSource.bind(this)} className="source" key={source.id}>{source.name}</div>;
    });

    return sources;
  }

  async _onSearch(ev) {
    if (ev.keyCode === 13) {
      const filteredSearch = await this._callSearchApi();
      console.log('filteredSearch: ', filteredSearch);
      this.props.deliverNewsList(filteredSearch);
    }
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
              <div className="navItem">Date <i className="fas fa-caret-down"></i></div>
              <div className="navItem" onClick={this._openSourceTab.bind(this)}>Source <i className="fas fa-caret-down"></i></div>
            </div>
            <div className="user">
            </div>
          </div>
        </div>
        <div className="searchBar">
          <i className="fas fa-search"></i><input type="text" onKeyDown={this._onSearch.bind(this)}/>
        </div>
        <div className="categoryWrapper">
          <div className="selectedFilter">
            { this.state.selectedSources }
          </div>
          <div className="category">
            { this.state.sources && this.state.SourceTab ? this._renderSources() : "" }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;
