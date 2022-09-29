import React from 'react';
import { useSelector } from 'react-redux';

const BookingInfo = ({ data }) => {
  const { selectedSeats, total } = useSelector((state) => state.seat);
  const { tenPhim, hinhAnh, tenCumRap, tenRap, diaChi, ngayChieu, gioChieu } =
    data.thongTinPhim;

  const formatMoney = (x) =>
    x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  return (
    <div className='movie-info '>
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
        <p>Ghế Đang Chọn:</p>
        <p>{selectedSeats.join(', ')}</p>
        <p>Thành Tiền:</p>
        {total > 0 && <h2>{formatMoney(total)}</h2>}
      </div>
      <div
        style={{ borderTop: '2px solid #fff ', marginLeft: 20, marginRight: 20 }}
      ></div>
    </div>
  );
};

export default BookingInfo;
