import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { seatActions } from '../store/seatSelect';
import { MdChair } from 'react-icons/md';
import Timer from './Timer';

const Seats = ({ data }) => {
  const { selectedSeats, selectedVipSeats } = useSelector((state) => state.seat);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className='Cinema'>
        <Timer />
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--primary-transparent);
  border-radius: var(--primary-borderRadius);
  box-shadow: var(--primary-boxShadow);

  .Cinema {
    perspective: 400px;
    width: 100%;
    display: grid;
    justify-items: center;
    padding-top: 1rem;
    margin-top: 1rem;
    grid-gap: 24px;
    .screen {
      height: 40px;
      max-width: 620px;
      background: var(--primary-white);
      width: 100%;
      transform: rotateX(-60deg) scale(1.1);
      box-shadow: 0 3px 15px 5px;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
    }
    .seats {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: repeat(16, min-content);
      align-items: center;
      .seat:nth-of-type(8n + 4) {
        margin-right: 2rem;
      }
      .seat:not(.occupied):hover,
      .seat:not(.occupied):focus {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }

  .ShowCase {
    margin-top: 3rem;
    margin-bottom: 2rem;
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 12px;
    li {
      margin: 0 12px;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }
  .seat {
    display: inline-block;
    width: 32px;
    height: 28px;
    transition: transform 0.3s ease-in-out;
    position: relative;
    top: 1px;
  }

  .seat.selected {
    color: var(--primary-green) !important;
  }

  .seat.occupied {
    color: var(--primary-gray);
  }
  .seat.vip {
    color: var(--primary-yellow);
  }

  @media screen and (max-width: 1399px) {
    width: 750px;
    .Cinema {
      grid-gap: 16px;
      .screen {
        max-width: 500px;
      }
      .seat {
        width: 24px;
        height: 20px;
      }
    }
  }
`;

export default Seats;
