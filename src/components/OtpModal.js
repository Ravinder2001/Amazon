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
} from 'react-native';

const height = Dimensions.get('window').height;
const OtpModal = ({status, data}) => {
  useEffect(() => {
    setModalVisible(status);
  }, [status]);
  const [modalVisible, setModalVisible] = useState(false);
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
            <Button
              title="click me"
              onPress={() => {
                data(false);
              }}
            />
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
