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
    // getOtp();
  }, [status]);
  // console.log(otp);
  function check() {
    // console.log(otp, text);
    // if (otp == text) {
    //   ToastAndroid.show('OTP verified', ToastAndroid.SHORT);
    //   data(false);
    // } else {
    //   ToastAndroid.show('Invalid Otp', ToastAndroid.SHORT);
    // }
  }
  // console.log('pins', pin1);
  if (pin1 != '') {
    ref2.current.focus();
  }
  if (pin2 != '') {
    ref3.current.focus();
  }
  if (pin3 != '') {
    ref4.current.focus();
  }

  const handleKeyDown2 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref1.current.focus()
    }
  };
  const handleKeyDown3 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref2.current.focus()
    }
  };
  const handleKeyDown4 = e => {
    if (e.nativeEvent.key === 'Backspace') {
      ref3.current.focus()
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
            <Text style={styles.modalText}>OTP successfully sent!</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                ref={ref1}
                style={{
                  borderWidth: 1,
                  // width: '30%',
                  margin: 10,
                  padding: 10,
                  fontSize: 25,
                }}
                onChangeText={e => {
                  setPin1(e);
                }}
                keyboardType="numeric"
                maxLength={1}
              />
              <TextInput
                ref={ref2}
                style={{
                  borderWidth: 1,
                  // width: '30%',
                  margin: 10,
                  padding: 10,
                  fontSize: 25,
                }}
                onChangeText={e => setPin2(e)}
                onKeyPress={handleKeyDown2}
                returnKeyType="next"
                keyboardType="numeric"
                // onSubmitEditing={() => {
                //   ref1.focus();
                // }}
                maxLength={1}
              />
              <TextInput
                ref={ref3}
                style={{
                  borderWidth: 1,
                  // width: '30%',
                  margin: 10,
                  padding: 10,
                  fontSize: 25,
                }}
                onChangeText={e => setPin3(e)}
                onKeyPress={handleKeyDown3}
                keyboardType="numeric"
                maxLength={1}
              />
              <TextInput
                ref={ref4}
                style={{
                  borderWidth: 1,
                  // width: '30%',
                  margin: 10,
                  padding: 10,
                  fontSize: 25,
                }}
                onChangeText={e => {
                  setPin4(e);
                  console.log('here', pin4);
                }}
                keyboardType="numeric"
                onKeyPress={handleKeyDown4}
                maxLength={1}
              />
            </View>
            <Button title="Submit" onPress={check} />
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
    padding: 35,
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
    fontSize: 18,
    color: 'green',
    textAlign: 'left',
  },
});

export default OtpModal;
