import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DayPicker = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={'date'}
      is24Hour={true}
      onChange={onChange}
    />
  );
};

export default DayPicker;
