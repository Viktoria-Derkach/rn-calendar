import React, { useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
  DateTimePickerAndroid,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import { FormikErrors } from 'formik';
import { Platform, Text, View, Button } from 'react-native';
import { formatDate } from '../utils/formatDate';
import { typography } from '../styles/typography';
import { convertDateStringToDateTime } from '../utils/convertStringToDate';

interface Props {
  initialDate: any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<unknown>>;
}

const DayPicker = ({ setFieldValue, initialDate }: Props) => {
  const [date, setDate] = useState(convertDateStringToDateTime(initialDate));

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setDate(selectedDate);

      setFieldValue('date', formatDate(selectedDate));
    }
  };

  const pickerProps: AndroidNativeProps = {
    value: date,
    mode: 'date',
    is24Hour: true,
    onChange: onChange,
    display: 'calendar',
    testID: 'dateTimePicker',
  };

  const onShowDatePicker = () => {
    DateTimePickerAndroid.open({ ...pickerProps });
  };
  return (
    <>
      {Platform.OS !== 'android' && <DateTimePicker {...pickerProps} />}
      {Platform.OS === 'android' && (
        <View style={[typography.flex, { justifyContent: 'space-between' }]}>
          <Text style={[typography.smallText]}>Selected date: {formatDate(date)}</Text>
          <Button title="Choose date" color="#735BF2" onPress={onShowDatePicker} />
        </View>
      )}
    </>
  );
};

export default DayPicker;
