import React, { Component } from 'react';
import './headLine.css';

class HeadLine extends Component {
  constructor(props) {
    super(props);
    this.state={
      headLineSource: false
    }
  }

  render() {
    return (
      <div className="headLinesWrapper">
        <div className="topHeadLine">
        </div>
        <div className="subHeaders">
          <div className="secondHeadLine">
          </div>
          <div className="thirdFourthWrapper">
            <div className="thirdHeadLine">
            </div>
            <div className="fourthHeadLine">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeadLine;
