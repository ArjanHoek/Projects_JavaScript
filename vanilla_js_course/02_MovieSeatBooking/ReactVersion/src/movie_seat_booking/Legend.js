import React, { Component } from 'react';

class Legend extends Component {
  render() {
    return (
      <ul id="legend">
        <li>
          <div className="seat"></div>
          <p className="legend-description">N/A</p>
        </li>
        <li>
          <div className="seat selected"></div>
          <p className="legend-description">Selected</p>
        </li>
        <li>
          <div className="seat occupied"></div>
          <p className="legend-description">Occupied</p>
        </li>
      </ul>
    );
  }
}

export default Legend;
