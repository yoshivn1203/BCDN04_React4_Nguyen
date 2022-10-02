import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const BookingInfo = ({ data }) => {
  const { selectedSeats, selectedVipSeats, total } = useSelector((state) => state.seat);
  const { tenPhim, hinhAnh, tenCumRap, tenRap, diaChi, ngayChieu, gioChieu } =
    data.thongTinPhim;

  const formatMoney = (x) =>
    x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  return (
    <Wrapper className='movie-info '>
      <img src={hinhAnh} alt={tenPhim} />
      <div className='title'>
        <h2>{tenPhim}</h2>
      </div>
      <div className='info'>
        <p>Rạp:</p>
        <p>{tenCumRap}</p>
        <p>Địa chỉ:</p>
        <p>{diaChi}</p>
        <p>Phòng Chiếu:</p>
        <p>{tenRap}</p>
        <p>Thời gian:</p>
        <p>{`${gioChieu} ngày ${ngayChieu}`}</p>
        <p>Ghế Phổ Thông:</p>
        <p>{selectedSeats.join(', ')}</p>
        <p>Ghế Vip:</p>
        <p>{selectedVipSeats.join(', ')}</p>
        <p>Thành Tiền:</p>
        {total > 0 && <h2>{formatMoney(total)}</h2>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  justify-items: center;
  width: 450px;
  height: 700px;
  background-color: var(--primary-transparent);
  border-radius: var(--primary-borderRadius);
  box-shadow: var(--primary-boxShadow);
  margin-top: 56px;
  padding: 2rem 1rem;
  overflow: auto;
  img {
    background-size: cover;
    width: 250px;
  }
  .title {
    color: var(--primary-yellow);
  }
  .info {
    justify-self: stretch;
    display: grid;
    grid-template-columns: auto auto;
    justify-items: flex-start;
    align-items: flex-start;
    column-gap: 2rem;
    row-gap: 1rem;
    p:nth-of-type(even) {
      justify-self: flex-end;
    }
    p:nth-child(10),
    p:nth-child(12) {
      color: var(--primary-yellow);
    }
    p:nth-child(13) {
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
      color: var(--primary-yellow);
    }
    h2 {
      margin-top: 5px;
      justify-self: flex-end;
      color: var(--primary-red);
    }
  }
  @media screen and (max-width: 1439px) {
    width: 350px;
    height: 650px;

    img {
      width: 200px;
    }
  }
`;

export default BookingInfo;
