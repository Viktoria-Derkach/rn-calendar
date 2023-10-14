import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from '../components/Calendar';
import SlideUpPopover from '../features/SlideUpPopover';
import Events from '../components/Events';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar />
      <SlideUpPopover>
        <View style={styles.circle}>
          <Text style={styles.plus}>+</Text>
        </View>
      </SlideUpPopover>
      <Events />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 15,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
