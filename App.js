import {View, Text} from 'react-native';
import React from 'react';
import Navigations from './src/components/Navigations';
import Authorization from './src/components/Authorization';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Demo from './src/screens/Demo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = async () => {
  const userValid = await AsyncStorage.getItem('userValid');
  console.log('user', JSON.parse(userValid));
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {/* <Navigations /> */}
        <Authorization />
        {/* <Demo/> */}
      </NavigationContainer>
    </View>
  );
};

export default App;
