import {View, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
const Demo = () => {
  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber("+919756726341");
    // setConfirm(confirmation);
    console.log(confirmation)
  }

  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // }

  return (
    <View>
      <Text>Demo</Text>
      <Button onPress={signInWithPhoneNumber} title="click me" />
    </View>
  );
};

export default Demo;
