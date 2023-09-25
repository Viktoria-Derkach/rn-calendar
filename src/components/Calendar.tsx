import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DateTime } from 'luxon';
import { typography } from './../styles/typography';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.local());

  const handlePrevMonth = () => {
    setSelectedDate(selectedDate.minus({ months: 1 }));
  };

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.plus({ months: 1 }));
  };

  const renderCalendar = () => {
    const daysInMonth = selectedDate.daysInMonth;
    const firstDayOfMonth = selectedDate.set({ day: 1 });
    const startOfWeek = firstDayOfMonth.startOf('week');

    const calendarDays = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = startOfWeek.plus({ days: i });
      console.log(day, 'day');

      calendarDays.push(
        <View key={i} style={styles.calendarDay}>
          <View key={i} style={typography.circle}>
            <Text style={{ ...typography.text, ...typography.todays }}>{day.day}</Text>
          </View>
        </View>
      );
    }

    return calendarDays;
  };

  return (
    <View style={styles.calendar}>
      <Text>{selectedDate.toFormat('MMMM yyyy')}</Text>
      <Button title="Previous Month" onPress={handlePrevMonth} />
      <Button title="Next Month" onPress={handleNextMonth} />
      <View style={styles.calendarGrid}>{renderCalendar()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    alignItems: 'center',
    marginTop: 20,
  },
  calendarDay: {
    // width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: '14%',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '100%',
  },
});

export default Calendar;
