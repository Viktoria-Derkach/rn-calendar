import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import { IEvent } from "../models/IEvent";
import uuid from 'react-native-uuid';

export const eventAPI = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sn-calendar-dcba6-default-rtdb.europe-west1.firebasedatabase.app',
  }),
  tagTypes: ['Event'],
  endpoints: build => ({
    fetchAllEvents: build.query({
      query: () => '/events.json',
      providesTags: result => ['Event'],
    }),
    createEvent: build.mutation({
      query: event => ({
        url: `/events.json`,
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    // updateEvent: build.mutation<IEvent, IEvent>({
    //   query: (event) => ({
    //     url: `/events/${event.id}`,
    //     method: "PUT",
    //     body: event,
    //   }),
    //   invalidatesTags: ["Event"],
    // }),
    // deleteEvent: build.mutation<IEvent, IEvent>({
    //   query: (event) => ({
    //     url: `/events/${event.id}`,
    //     method: "DELETE",
    //     body: event,
    //   }),
    //   invalidatesTags: ["Event"],
    // }),
  }),
});
