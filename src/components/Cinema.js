import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdChair } from 'react-icons/md';
import { seatActions } from '../store/seatSelect';

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

const Cinema = () => {
  const { occupied, vip, selected } = useSelector((state) => state.seat);
  const dispatch = useDispatch();

  return (
    <section>
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
      <div className='Cinema'>
        <div className='screen' />
        <div className='seats'>
          {seats.map((seat) => {
            const isSelected = selected.includes(seat);
            const isOccupied = occupied.includes(seat);
            const isVip = vip.includes(seat);
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
                onClick={isOccupied ? null : () => dispatch(seatActions.selecting(seat))}
              />
            );
          })}
        </div>
        <button
          type='button'
          className='btn'
          onClick={() => dispatch(seatActions.booking(selected))}
        >
          Confirm Booking
        </button>
      </div>
    </section>
  );
};

export default Cinema;
