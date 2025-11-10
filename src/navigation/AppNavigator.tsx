import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; 
import DrawerNavigator from './DrawerNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StartScreen from '../screens/StartScreen';
import DetailScreen from '../screens/Detail/DetailScreen';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator - Komponen navigasi utama aplikasi
 * Mengatur routing antara StartScreen, Main (DrawerNavigator), dan DetailScreen
 */
const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="StartScreen">
        {/* Screen untuk halaman awal/splash */}
        <Stack.Screen options={{headerShown: false}} name="StartScreen" component={StartScreen} />
        {/* Screen untuk halaman utama dengan drawer dan tab navigation */}
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        {/* Screen untuk halaman detail novel dengan header "Novel" */}
        <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreen}
          options={{
            title: 'Novel',
            headerTitle: 'Novel',
          }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;
