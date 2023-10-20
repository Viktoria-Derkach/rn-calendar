import React, { useCallback } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
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
  refetch?: () => void;
}

const Events = ({ events, error, isLoading, date, shouldDisplayDate, refetch }: IEventsProps) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) {
    return <Text style={typography.text}>Loading...</Text>;
  }
  if (error) {
    return <Text style={typography.text}>Error fetching events, {JSON.stringify(error)}</Text>;
  }

  const eventsArray = Object.keys(events).reduce((acc, id) => {
    const event = events[id];

    if (!date || event.date === date) {
      acc.push({
        id,
        ...event,
      });
    }

    return acc;
  }, [] as IEvent[]);

  const refetchProps = refetch
    ? {
        onRefresh,
        refreshing,
      }
    : {};

  if (!eventsArray.length && date) {
    return <Text style={typography.text}>No events for this day</Text>;
  }
  if (!eventsArray.length && !date) {
    return <Text style={typography.text}>No events to remind you</Text>;
  }

  return (
    <FlatList
      style={styles.container}
      data={eventsArray}
      keyExtractor={item => item.id || item.date}
      renderItem={({ item }) => <Event event={item} shouldDisplayDate={shouldDisplayDate} />}
      {...refetchProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Events;
