import React from 'react';

import {Text, View, StyleSheet, StatusBar} from 'react-native';

import Homepage from '../screens/Homepage';
import Account from '../screens/Account';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/Feather';
import Icn from 'react-native-vector-icons/Octicons';
import Cart from '../screens/Cart';
import Settings from '../screens/Settings';
const Navigations = () => {
  const Tab = createBottomTabNavigator();
  const size = 27;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#8fe7ce" />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focused : styles.unfocused}>
                <Icon
                  name="home"
                  size={size}
                  style={{color: focused ? '#008295' : 'black'}}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focused : styles.unfocused}>
                <Icon
                  name="user"
                  size={size}
                  style={{color: focused ? '#008295' : 'black'}}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focused : styles.unfocused}>
                <Icons
                  name="shopping-cart"
                  size={size}
                  style={{color: focused ? '#008295' : 'black'}}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={focused ? styles.focused : styles.unfocused}>
                <Icn
                  name="three-bars"
                  size={size}
                  style={{color: focused ? '#008295' : 'black'}}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  focused: {
    borderTopWidth: 3,
    padding: 9,
    borderTopColor: '#008295',
  },
  unfocused: {
    borderTopWidth: 0,
    padding: 9,
    borderTopColor: 'black',
  },
});
export default Navigations;
