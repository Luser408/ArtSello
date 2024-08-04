import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../Screen/LoginScreen';
import AdminPanel from '../Screen/AdminPanel';
import DrawerNavigator from './Drawer';
import RegistrationScreen from '../Screen/RegScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="RegScreen" component={RegistrationScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="AdminPanel" component={AdminPanel} />
      
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
