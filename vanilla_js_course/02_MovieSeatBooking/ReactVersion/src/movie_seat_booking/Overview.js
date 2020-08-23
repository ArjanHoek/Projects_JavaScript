import React, { Component } from 'react';
import MoviesData from './MoviesData';
import MovieSelector from './MovieSelector';
import Legend from './Legend';
import SeatSelector from './SeatSelector';
import SelectionStatus from './SelectionStatus';
import BookSeat from './BookSeat';
import './style.css';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      seats: {
        rows: 6,
        columns: 8,
      },
      occupiedSeats: [],
      selectedSeats: [],
      selectedMovie: '',
    };
  }

  selectMovie = event => {
    const movie = MoviesData.find(item => item.id === event.target.value);
    this.setState({
      selectedMovie: movie,
    });
  };

  selectSeat = event => {
    const seat = event.target;
    seat.classList.toggle('selected');
    this.setState(prevState => {
      if (prevState.selectedSeats.find(item => item.id === seat.id)) {
        return {
          selectedSeats: [...prevState.selectedSeats].filter(
            item => item.id !== seat.id
          ),
        };
      } else {
        return {
          selectedSeats: [...prevState.selectedSeats].concat(seat),
        };
      }
    });
  };

  bookSeat = () => {
    if (!this.state.selectedMovie) {
      alert('Select a movie');
    } else if (!this.state.selectedSeats.length) {
      alert('Select at least one seat');
    } else {
      const selectedSeats = this.state.selectedSeats.map(item => item.id).join(' - ');
      const selectedMovie = this.state.selectedMovie.title;
      const message = `Seats are booked. Movie: ${selectedMovie} - Seats: ${selectedSeats}`;
      alert(message);
      this.state.selectedSeats.forEach(item => {
        item.classList.replace('selected', 'occupied');
      });
      this.setState(prevState => {
        return {
          occupiedSeats: [...prevState.occupiedSeats].concat(
            prevState.selectedSeats
          ),
          selectedSeats: [],
        };
      });
    }
  };

  render() {
    return (
      <div className="body">
        <MovieSelector selectMovie={this.selectMovie} movies={MoviesData} />
        <Legend />
        <SeatSelector
          selectSeat={this.selectSeat}
          seats={this.state.seats}
          occupiedSeats={this.state.occupiedSeats}
        />
        <SelectionStatus
          selectedSeats={this.state.selectedSeats}
          selectedMoviePrice={this.state.selectedMovie.price}
        />
        <BookSeat
          bookSeat={this.bookSeat}
          selectedSeats={this.state.selectedSeats}
          valid={this.state.selectedMovie && this.state.selectedSeats.length}
        />
      </div>
    );
  }
}

export default Overview;
