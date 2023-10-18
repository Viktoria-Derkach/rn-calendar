import React, { useCallback, useState, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTime } from 'luxon';

import { typography } from './../styles/typography';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { selectDay } from '../store/days/reducer';
import { useAppSelector } from '../hooks/useAppSelector';
import { IEvent } from '../types/utils';
import DayOfWeek from './DayOfWeek';

const getEvents = (events: IEvent[], day: string): IEvent[] => {
  const res: IEvent[] = [];
  events.forEach(el => {
    if (el.date === day && res.length <= 2) {
      res.push(el);
    }
  });
  return res;
};

interface ICalendarProps {
  events?: IEvent[];
}

const Calendar = ({ events }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState(DateTime.local());
  const dispatch = useAppDispatch();
  const selectedDay = useAppSelector(state => state.days.selectedDay);

  const handleDayPress = (day: string): void => {
    dispatch(selectDay(day));
  };

  const renderWeeks = useCallback((): JSX.Element[] => {
    const weeksArray = [];
    const firstDayOfMonth = currentDate.startOf('month');
    const totalDaysInMonth = firstDayOfMonth.daysInMonth;
    const startOfWeek = firstDayOfMonth.startOf('week');

    let currentWeek: ReactNode[] = [];

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const day = startOfWeek.set({ day: i, month: currentDate.month });
      const weekDay = day.weekday;
      const isCurrentMonth = day.hasSame(firstDayOfMonth, 'month');
      const displayDay = day.toISODate();

      if (weekDay === 1 || currentWeek.length === 0) {
        currentWeek = [];

        weeksArray.push(currentWeek);
      }

      currentWeek.push(
        <TouchableOpacity
          key={displayDay}
          onPress={() => handleDayPress(displayDay)}
          style={[
            styles.dayContainer,
            !isCurrentMonth && styles.nonCurrentMonthDay,
            weekDay >= 6 && styles.weekendDay,
            selectedDay === displayDay && styles.selectedDay,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              !isCurrentMonth && styles.nonCurrentMonthText,
              selectedDay === displayDay && styles.selectedDayText,
            ]}
          >
            {day.day}
          </Text>
          {!!events?.length && (
            <View style={[typography.flex, styles.dotContainer]}>
              {getEvents(events, displayDay).map(el => (
                <View style={[{ width: '30%' }]}>
                  <View
                    style={[
                      typography.dot,
                      { backgroundColor: el.category ? el.category.color : 'yellow' },
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
  }, [currentDate, events, handleDayPress, selectedDay]);

  const goToPreviousMonth = (): void => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  const goToNextMonth = (): void => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  return (
    <View style={[styles.container]}>
      <View style={[typography.flex, styles.header, typography.marginB]}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={typography.bigText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[typography.bigText]}>
          {currentDate.setLocale('en-US').toFormat('MMMM yyyy')}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={typography.bigText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <DayOfWeek />
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
  },
  calendarContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'center',
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
