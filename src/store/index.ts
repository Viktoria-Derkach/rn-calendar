import { combineReducers, configureStore } from '@reduxjs/toolkit';
import daysReducer from './days/reducer';
import { eventAPI } from '../services/EventService';

const rootReducer = combineReducers({
  [eventAPI.reducerPath]: eventAPI.reducer,
  days: daysReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(eventAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
