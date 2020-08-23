import React from 'react';

const BookSeat = props => {
  const button = <button id="book-seat" onClick={props.bookSeat}>Book now</button>
  const instructions = <div className="instructions">Select a movie and at least one seat</div>
  return props.valid ? button : instructions;
}

export default BookSeat;
