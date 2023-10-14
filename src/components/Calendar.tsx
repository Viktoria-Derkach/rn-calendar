import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { DateTime } from 'luxon';
import { typography } from './../styles/typography';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(DateTime.local());

  const renderWeeks = () => {
    const weeksArray = [];
    const firstDayOfMonth = currentDate.startOf('month');
    const totalDaysInMonth = firstDayOfMonth.daysInMonth;
    const startOfWeek = firstDayOfMonth.startOf('week');

    let currentWeek = [];

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const day = startOfWeek.set({ day: i, month: currentDate.month });
      const weekDay = day.weekday;
      const isCurrentMonth = day.hasSame(firstDayOfMonth, 'month');

      if (weekDay === 1 || currentWeek.length === 0) {
        // Start a new week on Sunday or when the currentWeek is empty
        currentWeek = [];
        weeksArray.push(currentWeek);
      }

      currentWeek.push(
        <TouchableOpacity
          key={day.toISODate()}
          onPress={() => handleDayPress(day)}
          style={[
            styles.dayContainer,
            !isCurrentMonth && styles.nonCurrentMonthDay,
            weekDay >= 6 && styles.weekendDay,
          ]}
        >
          <Text style={[styles.dayText, !isCurrentMonth && styles.nonCurrentMonthText]}>
            {day.day}
          </Text>
          <View style={[styles.dot_container]}>
            <View style={[styles.dot, { backgroundColor: 'blue' }]}></View>
            {/* <View style={[styles.dot, { backgroundColor: 'blue' }]}></View>
            <View style={[styles.dot, { backgroundColor: 'blue' }]}></View> */}
          </View>
        </TouchableOpacity>
      );
    }

    return weeksArray.map((week, index) => (
      <View
        key={index}
        style={[styles.weekContainer, { alignSelf: index === 0 ? 'flex-end' : 'flex-start' }]}
      >
        {week}
      </View>
    ));
  };

  const handleDayPress = day => {
    console.log('Selected day:', day.toISODate());
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.monthButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.setLocale('en-US').toFormat('MMMM yyyy')}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.monthButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>{renderWeeks()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  monthButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align days of the week horizontally
  },
  dayContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 2,
  },
  dayText: {
    fontSize: 18,
  },
  nonCurrentMonthDay: {
    opacity: 0.4,
  },
  nonCurrentMonthText: {
    color: 'gray',
  },
  weekendDay: {
    backgroundColor: 'lightgray',
  },
  dot: {
    borderRadius: 50,
    marginRight: 7,
    width: '10%',
    height: 5,
  },
  dot_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'black',
    width: '100%',
  },
});

export default Calendar;
