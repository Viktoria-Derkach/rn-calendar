import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarScreen from '../screens/Calendar';
import Profile from '../screens/Profile';
import Clock from '../screens/Clock';
import Reminder from '../screens/Reminder';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { borderColor: 'blue' },
      }}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Clock" component={Clock} />
      <Tab.Screen name="Reminder" component={Reminder} />
    </Tab.Navigator>
  );
};
export default AppNavigation;
