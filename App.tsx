import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { calendarObject } from './src/utils/date';
import { store } from './src/store';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={onLayoutRootView}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
