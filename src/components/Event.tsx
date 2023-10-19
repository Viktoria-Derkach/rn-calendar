import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { eventAPI } from '../services/EventService';
import { IEvent } from '../types/utils';
import { typography } from '../styles/typography';
import SlideUpPopover from '../features/SlideUpPopover';

interface IEventProps {
  event: IEvent;
  shouldDisplayDate?: boolean;
}
const Event = ({ event, shouldDisplayDate }: IEventProps) => {
  const [deleteEvent, {}] = eventAPI.useDeleteEventMutation();

  const onDelete = async () => {
    try {
      await deleteEvent(event);
      Alert.alert('Event deleted', '', [], { cancelable: true });
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const removeHandler = (): void => {
    Alert.alert(
      'Delete a post',
      'Do you want to delete a post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container]}>
      {event.category && (
        <View style={[styles.containerCategory, styles.marginB]}>
          <View style={[typography.dot, { backgroundColor: event.category?.color }]}></View>
          <Text style={[styles.description, typography.smallText]}>{event.category?.type}</Text>
        </View>
      )}

      <Text style={[styles.marginB, typography.text]}>{event.name}</Text>
      {event.note && (
        <Text style={[styles.marginB, styles.description, typography.smallText]}>{event.note}</Text>
      )}
      {shouldDisplayDate && (
        <Text style={[styles.marginB, styles.description, typography.smallText]}>{event.date}</Text>
      )}
      <SlideUpPopover updateValues={event}>
        {({ showPopover }) => <Button title="Update" color={'#735BF2'} onPress={showPopover} />}
      </SlideUpPopover>
      <Button title="Delete" color={'red'} onPress={removeHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  marginB: {
    marginBottom: 8,
  },
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 15,
  },
  containerCategory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    letterSpacing: 0.75,
    color: '#8F9BB3',
  },
});

export default Event;
