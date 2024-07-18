import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens';

// import { ItemEnterprise, User } from '../hooks';

export type RootStackParamList = {
  HomeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Routes = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: true,
      cardStyle: {
        backgroundColor: '#fff',
      },
      title: 'Home',
    }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
  </Stack.Navigator>
);

export default Routes;
