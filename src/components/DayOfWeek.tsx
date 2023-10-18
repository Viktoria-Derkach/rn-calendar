import React from 'react';
import { typography } from '../styles/typography';
import { View, Text } from 'react-native';

const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DayOfWeek = () => {
  return (
    <View style={[typography.flex, typography.marginB]}>
      {dayOfWeek.map(el => (
        <Text style={[typography.smallText, { color: '#8F9BB3' }]}>{el}</Text>
      ))}
    </View>
  );
};

export default DayOfWeek;
