import React, {useEffect, useState} from 'react';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [text, setText] = useState('');
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
    console.log(otp, text);
    if (otp == text) {
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
            <Text style={styles.modalText}>OTP successfully sended!</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                // width: '30%',
                margin: 10,
                padding: 10,
                fontSize: 25,
              }}
              onChangeText={e => setText(e)}
              maxLength={4}
            />
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
