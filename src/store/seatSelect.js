import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const initialData = {
  selectedSeats: [],
  selectedVipSeats: [],
  total: 0,
};

const seatSlice = createSlice({
  name: 'seat select',
  initialState: initialData,
  reducers: {
    selecting(state, action) {
      const { selectedSeats, selectedVipSeats } = state;
      const { tenGhe, giaVe, loaiGhe } = action.payload;
      const isSelected =
        selectedSeats.includes(tenGhe) || selectedVipSeats.includes(tenGhe);
      if (isSelected) {
        state.selectedSeats = selectedSeats.filter((s) => s !== tenGhe);
        state.selectedVipSeats = selectedVipSeats.filter((s) => s !== tenGhe);
        state.total -= giaVe;
      } else {
        if (loaiGhe === 'Vip') selectedVipSeats.push(tenGhe);
        else {
          selectedSeats.push(tenGhe);
        }
        state.total += giaVe;
      }
    },
    reset(state) {
      state.selectedSeats = [];
      state.selectedVipSeats = [];
      state.total = 0;
    },
  },
});

export const seatActions = seatSlice.actions;

const store = configureStore({
  reducer: { seat: seatSlice.reducer },
});

export default store;
