const container = document.querySelector('.container');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Save selected movie index and price
const setItem = (...args) => {
  args.forEach(item => {
    localStorage.setItem(item[0], item[1]);
  });
};

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const ticketPrice = parseInt(movieSelect.value);
  const seatsIndex = [...selectedSeats].map(item =>
    [...allSeats].indexOf(item)
  );
  console.log(seatsIndex);
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setItem(['selectedSeats', JSON.stringify(seatsIndex)]);
};

// Get data from local storage and populate user interface
const populateUI = () => {
  JSON.parse(localStorage.getItem('selectedSeats')) &&
    allSeats.forEach(
      (seat, index) =>
        JSON.parse(localStorage.getItem('selectedSeats')).indexOf(index) > -1 &&
        seat.classList.add('selected')
    );
  localStorage.getItem('selectedMovieIndex') &&
    (movieSelect.selectedIndex = localStorage.getItem('selectedMovieIndex'));
  updateSelectedCount();
};

// Movie select event
movieSelect.addEventListener('change', event => {
  setItem(
    ['selectedMovieIndex', event.target.selectedIndex],
    ['selectedMoviePrice', event.target.value]
  );
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', event => {
  const classes = event.target.classList;
  if (classes.contains('seat') && !classes.contains('occupied')) {
    classes.toggle('selected');
    updateSelectedCount();
  }
});

populateUI();
