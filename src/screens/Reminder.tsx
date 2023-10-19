import React, { useCallback } from 'react';
import { RefreshControl, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
    shouldRemindMe: true,
  });

  return (
    <SafeAreaView style={[typography.screenContainer]}>
      <Events
          refetch={refetch}
        // onRefresh={onRefresh}
        // refreshing={refreshing}
        isLoading={isLoading}
        error={error}
        events={events}
        shouldDisplayDate
      />
    </SafeAreaView>
  );
};

export default Reminder;
