import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FormikErrors } from 'formik';
import { formatDate } from '../utils/formatDate';

interface Props {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>;
}

const DayPicker = ({ setFieldValue }: Props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setDate(selectedDate);

      setFieldValue('date', formatDate(selectedDate));
    }
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
