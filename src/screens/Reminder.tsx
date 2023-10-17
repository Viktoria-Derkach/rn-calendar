import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { eventAPI } from '../services/EventService';
import Events from '../components/Events';
import { typography } from '../styles/typography';

const Reminder = () => {
  const {
    data: events,
    error,
    isLoading,
    refetch,
  } = eventAPI.useFetchAllEventsQuery({
    shouldRemindMe: true,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <ScrollView
      contentContainerStyle={[typography.screenContainer]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Events isLoading={isLoading} error={error} events={events} shouldDisplayDate />
    </ScrollView>
  );
};

export default Reminder;
