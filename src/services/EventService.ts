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
      query: filterCriteria => {
        // const query = filterCriteria.date ? `orderBy="date"&equalTo="${filterCriteria.date}"` : '';

        const query = filterCriteria.shouldRemindMe
          ? `orderBy="shouldRemindMe"&equalTo=${filterCriteria.shouldRemindMe}`
          : '';

        return `/events.json?${query}`;
      },
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
    deleteEvent: build.mutation({
      query: event => ({
        url: `/events/${event.id}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});
