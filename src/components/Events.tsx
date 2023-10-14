import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { eventAPI } from '../services/EventService';
import { IEvent } from '../types/utils';

interface IEventProps {
  event: IEvent;
}
const Event = ({ event }: IEventProps) => {
  console.log('eventfsfd', event);

  return (
    <View>
      <Text>{event.name}</Text>
    </View>
  );
};

const Events = () => {
  const { data: events, error, isLoading, refetch } = eventAPI.useFetchAllEventsQuery({});
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error fetching events</Text>;
  }

  console.log(events, 'eventdcvsdsdfgdfccc');
  return (
    <FlatList
      data={Object.values(events)}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Event event={item} />}
    />
  );
};

const styles = StyleSheet.create({
  marginB: {
    marginBottom: 15,
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: 'black',
    // width: 100,
  },
});

export default Events;
