import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  text: string;
}

const daysSlice = createSlice({
  name: 'days',
  initialState: [] as Item[],
  reducers: {
    addDays: (state, action: PayloadAction<Item>) => {
      state.push(action.payload);
    },
  },
});

export const { addDays } = daysSlice.actions;
export default daysSlice.reducer;
