import {View, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Demo = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Facebook Login </Text>
      <Button
        title={'Login with Facebook'}
        onPress={() => {
          
        }}
      />
    </View>
  );
};

export default Demo;