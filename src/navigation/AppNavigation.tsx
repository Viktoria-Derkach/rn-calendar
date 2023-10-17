import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

import CalendarScreen from '../screens/Calendar';
import Profile from '../screens/Profile';
import Clock from '../screens/Clock';
import Reminder from '../screens/Reminder';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarIconStyle: { display: 'none' },
        tabBarActiveTintColor: '#735BF2',
      }}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      {/* <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Clock" component={Clock} /> */}
      <Tab.Screen name="Reminder" component={Reminder} />
    </Tab.Navigator>
  );
};
export default AppNavigation;
