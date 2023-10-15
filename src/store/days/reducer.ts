import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/formatDate';

interface IState {
  selectedDay: string;
}

const daysSlice = createSlice({
  name: 'days',
  initialState: { selectedDay: formatDate(new Date()) } as IState,
  reducers: {
    selectDay: (state, action: PayloadAction<IState['selectedDay']>) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { selectDay } = daysSlice.actions;
export default daysSlice.reducer;
