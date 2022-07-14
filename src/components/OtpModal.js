import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  TextInput,
  ToastAndroid,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('window').height;
const OtpModal = ({status, data, navigation}) => {
  const [pin, setPin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');

  async function getOtp() {
    const code = await AsyncStorage.getItem('OTP');
    setOtp(code);
  }
  useEffect(() => {
    setModalVisible(status);
    getOtp();
  }, [status]);
  console.log('otp', otp);
  async function check() {
    if (otp == pin) {
      await AsyncStorage.setItem('userValid', JSON.stringify(true)
      
      
      );
      navigation.navigate('Home');
      ToastAndroid.show('OTP verified', ToastAndroid.SHORT);
      data(false);
    } else {
      ToastAndroid.show('Invalid Otp', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                data(false);
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-glyphs/344/delete-sign.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: '90%',
                  // flex: 1,
                }}
              />
            </Pressable>

            <Image
              source={{
                uri: 'https://img.icons8.com/external-parzival-1997-flat-parzival-1997/344/external-otp-online-lifestyle-parzival-1997-flat-parzival-1997.png',
              }}
              style={{width: 100, height: 100}}
            />
            <Text style={styles.modalText}>OTP Verification</Text>
            <Text style={styles.subheading}>
              OTP is successfully sent to your mobile number.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.otpinput}
                onChangeText={e => {
                  setPin(e);
                }}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
            <Pressable onPress={check}>
              <View>
                <Text style={styles.btn}>Submit</Text>
              </View>
            </Pressable>

            {/* <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={{borderWidth: 1}}
            />
            <TextInput
              keyboardType="numeric"
              maxLength={1}
              style={{borderWidth: 1}}
            /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',

    // marginTop: height / 4,
    // backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    height: height / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
  otpinput: {
    borderBottomWidth: 2,
    width: '50%',
    margin: 10,
    // padding: 10,
    fontSize: 25,
    textAlign: 'center',
    letterSpacing: 10,
  },
  subheading: {
    fontSize: 15,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    borderRadius: 15,
    margin: 10,
  },
});

export default OtpModal;
