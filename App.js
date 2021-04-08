import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Button
} from 'react-native';

import Login from './components/Login';
import Register from './components/Register';
import Forum from './components/forum';
import NeedPostForum from './components/NeedPostForum';
import SitterPostForum from './components/SitterPostForum';



const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: '#1976D2',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};


export default class App extends React.Component {
  render() {
    return  <NavigationContainer theme = {MyTheme}>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Hotel For Dogs', headerTintColor: "white"}}
      />

      <Stack.Screen 
      name="Register" 
      component={Register} 
      options={{ title: 'Hotel For Dogs', headerTintColor: "white"}}
      />

      <Stack.Screen 
      name="Forum" 
      component={Forum} 
      options={{ title: 'Hotel For Dogs', headerTintColor: "white"}}
      />

      <Stack.Screen 
      name="NeedPostForum" 
      component={NeedPostForum} 
      options={{ title: 'Hotel For Dogs', headerTintColor: "white"}}
      />

      <Stack.Screen 
      name="SitterPostForum" 
      component={SitterPostForum} 
      options={{ title: 'Hotel For Dogs', headerTintColor: "white"}}
      />

    </Stack.Navigator>
  </NavigationContainer>;
  }
}