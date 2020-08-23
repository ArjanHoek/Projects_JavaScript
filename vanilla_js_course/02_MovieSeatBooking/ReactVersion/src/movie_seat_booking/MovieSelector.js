import React, { Component } from 'react';

class MovieSelector extends Component {
  movieOptions = this.props.movies.map(item =>
    <option key={item.id} value={item.id}>{item.title} (€{item.price})</option>
  );
  render() {
    return (
      <div id="movie-selector">
        <label>Pick a movie:</label>
        <select onChange={this.props.selectMovie} id="movie-select">
          <option value="0">- Select a movie -</option>
          {this.movieOptions}
        </select>
      </div>
    );
  }
}

export default MovieSelector;
