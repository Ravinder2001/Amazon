import React from 'react';

import {Text, View, StyleSheet, StatusBar} from 'react-native';

import Homepage from './src/Screens/Pages/Homepage';
import Account from './src/Screens/Pages/Account';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/Feather';
import Icn from 'react-native-vector-icons/Octicons';
import Cart from './src/Screens/Pages/Cart';
import Settings from './src/Screens/Pages/Settings';
const App = () => {
  const Tab = createBottomTabNavigator();
  const size = 26;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#8fe7ce" />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 3 : 0,
                  padding: 10,
                  borderTopColor: focused ? '#008295' : 'black',
                }}>
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
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 3 : 0,
                  padding: 10,
                  borderTopColor: focused ? '#008295' : 'black',
                }}>
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
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 3 : 0,
                  padding: 10,
                  borderTopColor: focused ? '#008295' : 'black',
                }}>
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
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  borderTopWidth: focused ? 3 : 0,
                  padding: 10,
                  borderTopColor: focused ? '#008295' : 'black',
                }}>
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

const styles = StyleSheet.create({});
export default App;
