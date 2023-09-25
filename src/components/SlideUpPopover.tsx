import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import Modal from 'react-native-modal';
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
          <Text>Popover Content</Text>
          <TouchableOpacity onPress={hidePopover}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SlideUpPopover;
