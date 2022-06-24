import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SignUp from './SignUp';
import SignIn from './SignIn';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Authorization = () => {
  const animation = new Animated.Value(0);
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver:false
    }).start();
  }, []);
  const widthAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '100%'],
  });
  const heightAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '80%'],
  });
  const animatedStyles = {
    width: widthAnimation,
    height: heightAnimation,
  };
  return (
    <View style={styles.root}>
      <Image source={require('../../asset/logo.png')} style={styles.logo} />
      <Animated.View style={animatedStyles}>
        <Tab.Navigator
          initialRouteName="SignUp"
          style={[styles.box]}
          screenOptions={{
            tabBarIndicatorContainerStyle: {
              width: '50%',
              marginLeft: 55,
            },
            tabBarActiveTintColor: '#ff9900',
            tabBarLabelStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'none',
            },
            tabBarInactiveTintColor: '#898989',
            tabBarIndicatorStyle: {
              backgroundColor: '#ff9900',
            },
          }}>
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{
              tabBarLabel: 'Register',
            }}
          />
          <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{
              tabBarLabel: 'Login',
            }}
          />
        </Tab.Navigator>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '30%',
    height: 100,
    marginHorizontal: '35%',
    marginTop: 40,
  },
  box: {
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  focused: {
    color: '#ff9900',
    fontSize: 20,
    width: 100,
    height: 50,
    fontWeight: 'bold',
  },
  unfocused: {
    color: '#919191',
    fontSize: 20,
    width: 100,
    height: 50,
    fontWeight: 'bold',
  },
});
export default Authorization;
