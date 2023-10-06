import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Switch } from 'react-native';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import DayPicker from './DayPicker';
import { typography } from './../styles/typography';
import Categories from './Categories';
import { ICategory } from '../types/utils';

const initialValues = {
  name: '',
  note: '',
  date: '', //
  shouldRemindMe: false,
  category: [],
};

const categories: ICategory[] = [
  {
    color: '#00B383',
    type: 'Birthday',
  },
  {
    color: '#0095FF',
    type: 'Workout',
  },
  {
    color: '#735BF2',
    type: 'Brainstorm',
  },
];

const SlideUpPopover = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const translateY = useSharedValue(500);
  const translateYOffset = useSharedValue(500);

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

  const onSubmit = (submit: () => void) => {
    submit();
    hidePopover();
  };

  return (
    <View style={styles.container}>
      <Text>Shosdfsdfw Popover</Text>
      <TouchableOpacity onPress={showPopover}>
        <Text>Show Popover</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={hidePopover} style={styles.modal}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.draggableHandle} />
          <Text style={{ ...styles.title, ...styles.marginB }}>Add New Event</Text>
          <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <TextInput
                  style={{ ...styles.input, ...styles.marginB }}
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
                  style={{ ...styles.input, ...styles.marginB, minHeight: 90 }}
                  enterKeyHint="next"
                  inputMode="text"
                  placeholderTextColor="#8F9BB3"
                  placeholder="Type the note here..."
                />
                <DayPicker />
                <View
                  style={{
                    ...styles.container_switch,
                    ...styles.marginB,
                    width: '100%',
                  }}
                >
                  <Text style={{ ...typography.text, width: '50%' }}>Reminds me</Text>
                  <View style={{ ...styles.switch, width: '50%' }}>
                    <Switch
                      trackColor={{ false: '#CED3DE', true: '#735BF2' }}
                      thumbColor={values.shouldRemindMe ? '#FFFFFF' : '#FFFFFF'}
                      ios_backgroundColor="#CED3DEF"
                      onValueChange={(value): any => setFieldValue('shouldRemindMe', value)}
                      value={values.shouldRemindMe}
                    />
                  </View>
                </View>

                <View
                  style={{
                    ...styles.marginB,
                  }}
                >
                  <Categories categories={categories} />
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
  },
  switch: {},
});

export default SlideUpPopover;
