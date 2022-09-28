import React from 'react';
import { useSelector } from 'react-redux';

const BookingSumary = () => {
  const { name, poster, price, selected } = useSelector((state) => state.seat);

  return (
    <div className='movie-info text-center'>
      <img src={poster} alt={name} />
      <h2>{name}</h2>
      <p className='info'>
        You have selected <span className='count'>{selected.length}</span> seats
        <span>{selected.length > 0 && ` (${selected})`}</span> for the price of
        <span className='total'> {selected.length * price}$</span>
      </p>
    </div>
  );
};

export default BookingSumary;
