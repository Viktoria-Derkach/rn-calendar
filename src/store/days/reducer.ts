import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  text: string;
  category: string; //change
  time: string;
  shouldRemind: boolean;
}

const eventsSlice = createSlice({
  name: 'events',
  initialState: [] as Item[],
  reducers: {
    addEvent: (state, action: PayloadAction<Item>) => {
      state.push(action.payload);
    },
  },
});

export const { addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
