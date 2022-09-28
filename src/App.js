import React, { useState } from 'react';
import { MdChair } from 'react-icons/md';

const DUMMY_DATA = [
  {
    name: 'Avenger',
    price: 10,
    vip: [26, 27, 28, 29, 34, 35, 37, 36, 45, 44, 43, 42],
    occupied: [20, 21, 24, 25, 30, 1, 2, 8, 6, 7],
    poster: 'https://upload.wikimedia.org/wikipedia/vi/f/f9/TheAvengers2012Poster.jpg',
  },
];

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function App() {
  const [movies, setMovies] = useState(DUMMY_DATA);
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div className='section-center cinema-container'>
      <div className='text-center'>
        <ShowCase />
        <Cinema
          movie={movies[0]}
          selectedSeats={selectedSeats}
          onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)}
        />
      </div>
      <div className='movie-info text-center'>
        <img src={movies[0].poster} alt={movies[0].name} />
        <h2>{movies[0].name}</h2>
        <p className='info'>
          You have selected <span className='count'>{selectedSeats.length}</span> seats
          <span>{selectedSeats.length > 0 && ` (${selectedSeats})`}</span> for the price
          of
          <span className='total'> {selectedSeats.length * movies[0].price}$</span>
        </p>
      </div>
    </div>
  );
}

function ShowCase() {
  return (
    <ul className='ShowCase'>
      <li>
        <MdChair className='seat' /> <small>Available</small>
      </li>
      <li>
        <MdChair className='seat vip' /> <small>Vip</small>
      </li>
      <li>
        <MdChair className='seat selected' /> <small>Selected</small>
      </li>
      <li>
        <MdChair className='seat occupied' /> <small>Occupied</small>
      </li>
    </ul>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }
  const handleBooking = () => {
    movie.occupied = [...movie.occupied, ...selectedSeats];
    onSelectedSeatsChange([]);
  };

  return (
    <div className='Cinema'>
      <div className='screen' />
      <div className='seats'>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);
          const isVip = movie.vip.includes(seat);
          return (
            <MdChair
              key={seat}
              className={`seat ${
                isOccupied
                  ? 'occupied'
                  : isVip && !isSelected
                  ? 'vip'
                  : isSelected
                  ? 'selected'
                  : ''
              }`}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            />
          );
        })}
      </div>
      <button type='button' className='btn' onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
