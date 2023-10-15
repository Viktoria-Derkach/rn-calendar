import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from '../components/Calendar';
import SlideUpPopover from '../features/SlideUpPopover';
import Events from '../components/Events';
import { IEvent } from '../types/utils';
import { eventAPI } from '../services/EventService';
import { useAppSelector } from '../hooks/useAppSelector';

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
    <View style={styles.container}>
      <Calendar events={events ? Object.values(events) : undefined} />
      <SlideUpPopover>
        <View style={styles.circle}>
          <Text style={styles.plus}>+</Text>
        </View>
      </SlideUpPopover>
      <Events isLoading={isLoading} error={error} events={events} date={selectedDay} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#735BF2',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 30,
    color: 'white',
  },
});

export default CalendarScreen;
