import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { seatActions } from '../store/seatSelect';

import { MdChair } from 'react-icons/md';

const Seats = ({ data }) => {
  const { selectedSeats, selectedVipSeats } = useSelector((state) => state.seat);
  const dispatch = useDispatch();
  return (
    <>
      <div className='Cinema'>
        <div className='screen' />
        <div className='seats'>
          {data.danhSachGhe.map((seat) => {
            const isSelected =
              selectedSeats.includes(seat.tenGhe) ||
              selectedVipSeats.includes(seat.tenGhe);
            const isOccupied = seat.daDat;
            const isVip = seat.loaiGhe === 'Vip';
            return (
              <MdChair
                key={seat.tenGhe}
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
      </div>
      <ul className='ShowCase'>
        <li>
          <MdChair className='seat' /> <small>Ghế Trống</small>
        </li>
        <li>
          <MdChair className='seat vip' /> <small>Ghế Vip</small>
        </li>
        <li>
          <MdChair className='seat selected' /> <small>Ghế Đang Chọn</small>
        </li>
        <li>
          <MdChair className='seat occupied' /> <small>Ghế Đã Được Đặt Trước</small>
        </li>
      </ul>
    </>
  );
};

export default Seats;
