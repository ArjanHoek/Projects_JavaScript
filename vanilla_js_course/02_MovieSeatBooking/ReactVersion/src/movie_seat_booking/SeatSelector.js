import React, { Component } from 'react';

class SeatSelector extends Component {
  seats = rowNumber => {
    const rowIndex = 'abcdefghijklmnopqrstuvwxyz'.split('')[rowNumber].toUpperCase();
    const seats = [];
    for (let i = 0; i < this.props.seats.columns; i++) {
      seats.push(
        <div
          key={`${rowIndex}${i}`}
          onClick={
            !this.props.occupiedSeats.find(
              item => item.id === `${rowIndex}${i}`
            )
              ? this.props.selectSeat
              : null
          }
          className="seat"
          id={`${rowIndex}${i}`}
        ></div>
      );
    }
    return seats;
  };

  rows = () => {
    const rows = [];
    for (let i = 0; i < this.props.seats.rows; i++) {
      rows.push(
        <div key={i} className="row">
          {this.seats(i)}
        </div>
      );
    }
    return rows;
  };

  render() {
    return (
      <div id="seat-selector">
        <div className="screen"></div>
        {this.rows()}
      </div>
    );
  }
}

export default SeatSelector;
