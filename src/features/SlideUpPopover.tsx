import React, { useState, PropsWithChildren } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import DayPicker from '../components/DayPicker';
import { typography } from '../styles/typography';
import Categories from '../components/Categories';
import { eventAPI } from '../services/EventService';
import { CategoryType, IEvent } from '../types/utils';
import { formatDate } from '../utils/formatDate';

const initialValues: IEvent = {
  name: '',
  note: '',
  date: formatDate(new Date()),
  shouldRemindMe: false,
  category: null,
};

const SlideUpPopover = ({ children }: PropsWithChildren<{}>) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const translateY = useSharedValue(500);
  const translateYOffset = useSharedValue(500);
  const [createEvent, {}] = eventAPI.useCreateEventMutation();

  const showPopover = () => {
    setModalVisible(true);
    translateY.value = withTiming(2);
  };

  const hidePopover = () => {
    translateY.value = withTiming(2);
    translateYOffset.value = 500;
    setModalVisible(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const createEventOnSubmit = async (values: IEvent) => {
    try {
      await createEvent(values);
      Alert.alert('Event created', '', [], { cancelable: true });
      console.log(values);
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  const onSubmit = (submit: () => void) => {
    submit();
    hidePopover();
  };

  return (
    <View style={[styles.container, styles.marginB]}>
      <TouchableOpacity onPress={showPopover}>{children}</TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={hidePopover} style={styles.modal}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.draggableHandle} />
          <Text style={[styles.title, styles.marginB]}>Add New Event</Text>
          <Formik initialValues={initialValues} onSubmit={createEventOnSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <TextInput
                  style={[styles.input, styles.marginB]}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder="Event name"
                  autoFocus
                  enterKeyHint="next"
                  inputMode="text"
                  placeholderTextColor="#8F9BB3"
                />
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  onChangeText={handleChange('note')}
                  onBlur={handleBlur('note')}
                  value={values.note}
                  style={[styles.input, styles.marginB, { minHeight: 90 }]}
                  enterKeyHint="next"
                  inputMode="text"
                  placeholderTextColor="#8F9BB3"
                  placeholder="Type the note here..."
                />
                <View style={[styles.marginB]}>
                  <DayPicker setFieldValue={setFieldValue} />
                </View>

                <View style={[styles.container_switch, styles.marginB, { width: '100%' }]}>
                  <View style={[{ width: '50%' }]}>
                    <Text style={[typography.text, { width: '70%' }]}>Reminds me</Text>
                  </View>
                  <View style={[styles.switch, { width: '20%' }]}>
                    <Switch
                      trackColor={{ false: '#CED3DE', true: '#735BF2' }}
                      thumbColor={values.shouldRemindMe ? '#FFFFFF' : '#FFFFFF'}
                      ios_backgroundColor="#CED3DEF"
                      onValueChange={(value): any => setFieldValue('shouldRemindMe', value)}
                      value={values.shouldRemindMe}
                    />
                  </View>
                </View>

                <View style={[styles.marginB]}>
                  <Text style={[typography.text, styles.marginB, { fontSize: 17 }]}>
                    Select Catgeory
                  </Text>
                  <Categories initialValue={values.category} setFieldValue={setFieldValue} />
                </View>

                <View style={styles.marginB}>
                  <Button color="#735BF2" onPress={() => onSubmit(handleSubmit)} title="Submit" />
                </View>
              </>
            )}
          </Formik>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  marginB: {
    marginBottom: 15,
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: 'black',
    // width: 100,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  draggableHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    color: '#8F9BB3',
    borderColor: '#8F9BB3',
  },
  container_switch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  switch: {},
});

export default SlideUpPopover;
