import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { eventAPI } from '../services/EventService';
import { IEvent } from '../types/utils';
import { typography } from '../styles/typography';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface IEventProps {
  event: IEvent;
}
const Event = ({ event }: IEventProps) => {
  return (
    <View style={[styles.container]}>
      {event.category && (
        <View style={[styles.container_category, styles.marginB]}>
          <View style={[styles.dot, { backgroundColor: event.category?.color }]}></View>
          <Text style={[styles.description]}>{event.category?.type}</Text>
        </View>
      )}

      <Text style={[styles.marginB, typography.text]}>{event.name}</Text>
      <Text style={[styles.marginB, styles.description]}>{event.note}</Text>
    </View>
  );
};

interface IEventsProps {
  events: {
    [key: string]: IEvent;
  };
  isLoading: boolean;
  date: string;
  error?: FetchBaseQueryError | SerializedError;
}

const Events = ({ events, error, isLoading, date }: IEventsProps) => {
  if (isLoading) {
    return <Text style={typography.text}>Loading...</Text>;
  }
  if (error) {
    return <Text style={typography.text}>Error fetching events, {JSON.stringify(error)}</Text>;
  }

  console.log(events, 'eventdcvsdsdfgdfccc');
  return (
    <FlatList
      data={Object.values(events)}
      keyExtractor={item => item.id || `${item.date}-${item.date}`}
      renderItem={({ item }) => {
        if (!date || item.date === date) {
          return <Event event={item} />;
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: 'black',
    // width: 100,
  },
  container_category: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 50,
    marginRight: 7,
    width: 5,
    height: 5,
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
