import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from '../components/Calendar';
import SlideUpPopover from '../features/SlideUpPopover';
import Events from '../components/Events';
import { IEvent } from '../types/utils';
import { eventAPI } from '../services/EventService';
import { useAppSelector } from '../hooks/useAppSelector';
import { typography } from '../styles/typography';

const CalendarScreen = () => {
  const {
    data: events,
    error,
    isLoading,
    refetch,
  } = eventAPI.useFetchAllEventsQuery({
    // date: '2023-10-18', // Replace with your filter criteria
  });

  const selectedDay = useAppSelector(state => state.days.selectedDay);

  return (
    <View style={typography.screenContainer}>
      <Calendar events={events ? Object.values(events) : undefined} />
      <View style={[{ alignItems: 'center' }]}>
        <SlideUpPopover>
          <View style={typography.circle}>
            <Text style={styles.plus}>+</Text>
          </View>
        </SlideUpPopover>
      </View>
      <View>
        <Events isLoading={isLoading} error={error} events={events} date={selectedDay} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  plus: {
    fontSize: 30,
    color: 'white',
  },
});

export default CalendarScreen;
