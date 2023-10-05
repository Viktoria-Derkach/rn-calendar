import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  TextInput,
  Button,
  Switch,
} from 'react-native';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  useAnimatedGestureHandler,
  withRepeat,
} from 'react-native-reanimated';
import DayPicker from './DayPicker';

const initialValues = {
  name: '',
  note: '',
  date: '', //
  shouldRemindMe: false,
  category: [],
};

const SlideUpPopover = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const translateY = useSharedValue(500);
  const translateYOffset = useSharedValue(500);
  const [text, onChangeText] = React.useState('');
  const [note, onChangeNote] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const showPopover = () => {
    setModalVisible(true);
    translateY.value = withTiming(2);
  };

  const hidePopover = () => {
    translateY.value = withTiming(2);
    translateYOffset.value = 500;
    setModalVisible(false);
  };

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (_, context) => {
      if (context.startY - translateY.value > 100) {
        hidePopover();
      } else {
        showPopover();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  console.log('fffsfsdfdsdf');

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
          {/* Your popover content goes here */}
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
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value): any => setFieldValue('shouldRemindMe', value)}
                  value={values.shouldRemindMe}
                />
                <Button onPress={() => onSubmit(handleSubmit)} title="Submit" />
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
});

export default SlideUpPopover;
