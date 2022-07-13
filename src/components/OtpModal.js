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
const OtpModal = ({status, data}) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  async function getOtp() {
    const code = await AsyncStorage.getItem('OTP');
    setOtp(code);
  }
  useEffect(() => {
    setModalVisible(status);
    getOtp();
  }, [status]);
  console.log(otp);
  function check() {
    var res = '';
    res += pin1 + pin2 + pin3 + pin4;
    console.log(res);
    if (otp == res) {
      ToastAndroid.show('OTP verified', ToastAndroid.SHORT);
      data(false);
    } else {
      ToastAndroid.show('Invalid Otp', ToastAndroid.SHORT);
    }
  }
  // console.log('pins', pin1);
  // if (pin1 != '') {
  //   ref2.current.focus();
  // }
  // if (pin2 != '') {
  //   ref3.current.focus();
  // }
  // if (pin3 != '') {
  //   ref4.current.focus();
  // }

  const handleKeyDown2 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref1.current.focus();
    }
  };
  const handleKeyDown3 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref2.current.focus();
    }
  };
  const handleKeyDown4 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref3.current.focus();
    }
  };

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
                ref={ref1}
                style={styles.otpinput}
                onChangeText={e => {
                  setPin1(e);
                  console.log('sss', pin1);
                }}
                keyboardType="numeric"
                maxLength={1}
              />
              <TextInput
                ref={ref2}
                style={styles.otpinput}
                onChangeText={e => setPin2(e)}
                onKeyPress={handleKeyDown2}
                // returnKeyType="next"
                keyboardType="numeric"
                // onSubmitEditing={() => {
                //   ref1.focus();
                // }}
                maxLength={1}
              />
              <TextInput
                ref={ref3}
                style={styles.otpinput}
                onChangeText={e => setPin3(e)}
                onKeyPress={handleKeyDown3}
                keyboardType="numeric"
                maxLength={1}
              />
              <TextInput
                ref={ref4}
                style={styles.otpinput}
                onChangeText={e => {
                  setPin4(e);
                  console.log('here', pin4);
                }}
                keyboardType="numeric"
                onKeyPress={handleKeyDown4}
                maxLength={1}
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
    // width: '30%',
    margin: 10,
    padding: 10,
    fontSize: 25,
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
