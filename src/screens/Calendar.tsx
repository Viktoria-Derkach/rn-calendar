import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from '../components/Calendar';
import SlideUpPopover from '../features/SlideUpPopover';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
      <Calendar />
      <SlideUpPopover>
        <View style={styles.circle}>
          <Text style={styles.plus}>+</Text>
        </View>
      </SlideUpPopover>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
