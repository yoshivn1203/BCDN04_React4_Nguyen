import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const initialData = {
  selectedSeats: [],
  total: 0,
};

const seatSlice = createSlice({
  name: 'seat select',
  initialState: initialData,
  reducers: {
    selecting(state, action) {
      const { selectedSeats } = state;
      const { tenGhe, giaVe } = action.payload;
      const isSelected = selectedSeats.includes(tenGhe);
      if (isSelected) {
        state.selectedSeats = selectedSeats.filter((s) => s !== tenGhe);
        state.total -= giaVe;
      } else {
        selectedSeats.push(tenGhe);
        state.total += giaVe;
      }
    },
    reset(state) {
      state.selectedSeats = [];
      state.total = 0;
    },
  },
});

export const seatActions = seatSlice.actions;

const store = configureStore({
  reducer: { seat: seatSlice.reducer },
});

export default store;
