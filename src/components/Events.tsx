import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { eventAPI } from '../services/EventService';
import { IEvent } from '../types/utils';
import { typography } from '../styles/typography';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface IEventProps {
  event: IEvent;
  shouldDisplayDate?: boolean;
}
const Event = ({ event, shouldDisplayDate }: IEventProps) => {
  return (
    <View style={[styles.container]}>
      {event.category && (
        <View style={[styles.containerCategory, styles.marginB]}>
          <View style={[typography.dot, { backgroundColor: event.category?.color }]}></View>
          <Text style={[styles.description]}>{event.category?.type}</Text>
        </View>
      )}

      <Text style={[styles.marginB, typography.text]}>{event.name}</Text>
      <Text style={[styles.marginB, styles.description]}>{event.note}</Text>
      {shouldDisplayDate && <Text style={[styles.marginB, styles.description]}>{event.date}</Text>}
    </View>
  );
};

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
      data={Object.values(events)}
      keyExtractor={item => item.id || `${item.date}-${item.date}`}
      renderItem={({ item }) => {
        if (!date || item.date === date) {
          return <Event event={item} shouldDisplayDate={shouldDisplayDate} />;
        }
        return null;
      }}
    />
  );
};

const styles = StyleSheet.create({
  marginB: {
    marginBottom: 8,
  },
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 15,
  },
  containerCategory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.75,
    color: '#8F9BB3',
  },
});

export default Events;
