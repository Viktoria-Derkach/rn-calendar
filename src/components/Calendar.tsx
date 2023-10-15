import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { DateTime } from 'luxon';
import { typography } from './../styles/typography';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { selectDay } from '../store/days/reducer';
import { useAppSelector } from '../hooks/useAppSelector';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(DateTime.local());
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(state => state.days.selectedDay);

  const getEvents = day => {
    const res = [];
    events.forEach(el => {
      if (el.date === day && res.length <= 2) {
        res.push(el);
      }
    });
    return res;
  };

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
            selectedDay === day.toISODate() && styles.selectedDay,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              !isCurrentMonth && styles.nonCurrentMonthText,
              selectedDay === day.toISODate() && styles.selectedDayText,
            ]}
          >
            {day.day}
          </Text>
          {!!events?.length && (
            <View style={[styles.dotContainer]}>
              {getEvents(day.toISODate()).map(el => (
                <View style={[{ width: '30%' }]}>
                  <View
                    style={[
                      typography.dot,
                      { backgroundColor: el.category ? el.category.color : 'red' },
                    ]}
                  ></View>
                </View>
              ))}
            </View>
          )}
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
    dispatch(selectDay(day.toISODate()));
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
      <View style={[typography.flex, styles.header]}>
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
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  selectedDay: {
    backgroundColor: '#8A75FF',
  },
  selectedDayText: {
    color: 'white',
  },
});

export default Calendar;
