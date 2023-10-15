import React from 'react';
import { View, Text } from 'react-native';
import { eventAPI } from '../services/EventService';
import Events from '../components/Events';
import { typography } from '../styles/typography';

const Reminder = () => {
  const {
    data: events,
    error,
    isLoading,
    refetch,
  } = eventAPI.useFetchAllEventsQuery({
    shouldRemindMe: true, // Replace with your filter criteria
  });
  return (
    <View style={typography.screenContainer}>
      <Events isLoading={isLoading} error={error} events={events} shouldDisplayDate />
    </View>
  );
};

export default Reminder;
