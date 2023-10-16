import React from 'react';
import { Text, FlatList } from 'react-native';
import { IEvent } from '../types/utils';
import { typography } from '../styles/typography';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Event from './Event';

interface IEventsProps {
  events: {
    [key: string]: IEvent;
  };
  isLoading: boolean;
  date?: string;
  error?: FetchBaseQueryError | SerializedError;
  shouldDisplayDate?: boolean;
}

const Events = ({ events, error, isLoading, date, shouldDisplayDate }: IEventsProps) => {
  if (isLoading) {
    return <Text style={typography.text}>Loading...</Text>;
  }
  if (error) {
    return <Text style={typography.text}>Error fetching events, {JSON.stringify(error)}</Text>;
  }

  return (
    <FlatList
      data={Object.keys(events).map(id => ({
        id,
        ...events[id],
      }))}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        if (!date || item.date === date) {
          return <Event event={item} shouldDisplayDate={shouldDisplayDate} />;
        }
        return null;
      }}
    />
  );
};

export default Events;
