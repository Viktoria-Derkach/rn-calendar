import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from '../components/Calendar';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
      <Calendar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;
