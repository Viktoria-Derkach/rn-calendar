import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/Calendar';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default AppNavigation;
