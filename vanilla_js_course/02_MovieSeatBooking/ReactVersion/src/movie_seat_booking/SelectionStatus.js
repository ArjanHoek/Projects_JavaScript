import React, { Component } from 'react';

class SelectionStatus extends Component {
  render() {
    const price = this.props.selectedMoviePrice;
    const seats = this.props.selectedSeats.length;
    const total = price ? seats * price : 0;
    return (
      <p id="selection-status">
        You have selected <span className="status">{seats}</span> seats for a
        price of €<span className="status">{total}</span>
      </p>
    );
  }
}

export default SelectionStatus;
