import React, { Component } from 'react';
import './dateSetter.css';
import Calendar from 'react-calendar';

class DateSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange (date) {
    console.log("date: ", date);
    const convertedDateFrom = `${date[0].getYear() + 1900}-${date[0].getMonth() + 1}-${date[0].getDate()}`;
    const convertedDateTo = `${date[1].getYear() + 1900}-${date[1].getMonth() + 1}-${date[1].getDate()}`;
    const convertedDate = [convertedDateFrom, convertedDateTo];

    this.setState({ date });
    this.props.getDateRange(convertedDate);
  }

  render() {
    return (
      <div>
        <Calendar
          className="calendar"
          onChange={this.onChange.bind(this)}
          value={this.state.date}
          selectRange={true}
        />
      </div>
    );
  }
}

export default DateSetter;
