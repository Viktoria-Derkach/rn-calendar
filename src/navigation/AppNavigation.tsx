import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CalendarScreen from '../screens/Calendar';
import Profile from '../screens/Profile';
import Clock from '../screens/Clock';
import Reminder from '../screens/Reminder';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'blue', // Color of the active tab label and icon
        tabBarInactiveTintColor: 'gray', // Color of the inactive tab label and icon
        tabBarLabelStyle: {
          fontSize: 16, // Font size for the tab label
          fontWeight: 'bold', // Font weight for the tab label
        },
        tabBarStyle: {
          backgroundColor: 'white', // Background color for the tab bar
        },
        // tabBarIcon: ({ color, size }) => {
        //   let iconName;

        //   if (route.name === 'Screen1') {
        //     iconName = 'ios-home';
        //   } else if (route.name === 'Screen2') {
        //     iconName = 'ios-settings';
        //   }

        //   // You can add more conditions for other tab icons

        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-star" size={25} color={'blue'} />,
        }}
      />
      <Tab.Screen name="Clock" component={Clock} />
      <Tab.Screen name="Reminder" component={Reminder} />
    </Tab.Navigator>
  );
};
export default AppNavigation;
