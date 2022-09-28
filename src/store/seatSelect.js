import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const initialData = {
  name: 'Avenger',
  price: 10,
  occupied: [20, 21, 24, 25, 30, 1, 2, 8, 6, 7],
  vip: [26, 27, 28, 29, 34, 35, 37, 36, 45, 44, 43, 42],
  selected: [],
  poster: 'https://upload.wikimedia.org/wikipedia/vi/f/f9/TheAvengers2012Poster.jpg',
};

const seatSlice = createSlice({
  name: 'authentication',
  initialState: initialData,
  reducers: {
    booking(state, action) {
      state.occupied = [...state.occupied, ...action.payload];
      state.selected = [];
    },
    selecting(state, action) {
      let { selected } = state;
      const isSelected = selected.includes(action.payload);
      if (isSelected) {
        selected = selected.filter((s) => s !== action.payload);
      } else {
        selected.push(action.payload);
      }
    },
  },
});

export const seatActions = seatSlice.actions;

const store = configureStore({
  reducer: { seat: seatSlice.reducer },
});

export default store;
