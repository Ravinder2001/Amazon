import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Phone from 'react-native-vector-icons/Ionicons';
import Email from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {Formik} from 'formik';
import OtpModal from './OtpModal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignIn = () => {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Mobile number should be of 10 digits')
      .max(10, 'to long'),
  });
  async function userData(e) {
    console.log(e.phone);

    fetch(`http://192.168.19.69:4000/userData?phone=${e.phone}`)
      .then(async response => {
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);
          ToastAndroid.show('User founded !', ToastAndroid.SHORT);
          setModal(true);
        } else {
          ToastAndroid.show('User not founded !', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  // useEffect(() => {}, [modal]);
  return (
    <Formik
      initialValues={{phone: ''}}
      validateOnMount={true}
      onSubmit={values => userData(values)}
      validationSchema={schema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={styles.root}>
          <View style={styles.inputBox}>
            <Phone name="call" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder="Phone"
              keyboardType="numeric"
              maxLength={10}
              style={{...styles.input, marginLeft: 10}}
            />
          </View>
          {status ? (
            <View>
              {errors.phone && (
                <Text style={styles.errors}>{errors.phone}</Text>
              )}
            </View>
          ) : null}
          <View>
            <Text
              style={{
                color: '#7ba6e5',
                width: '80%',
                marginHorizontal: '10%',
                marginTop: 10,
                fontSize: 18,
              }}>
              Forgot Password?
            </Text>
          </View>

          <Pressable
            onPress={() => {
              console.log('clcick');
              setStatus(true);
              handleSubmit();
            }}>
            <View style={styles.btn}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 20,
                  padding: 10,
                }}>
                Login
              </Text>
            </View>
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 15,
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: 'https://img.icons8.com/bubbles/344/gmail-new.png'}}
            />
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: 'https://img.icons8.com/bubbles/344/facebook-new.png',
              }}
            />
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: 'https://img.icons8.com/bubbles/344/instagram-new--v2.png',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 37,
            }}>
            <Text>By creating an account, you agree to Amazon's</Text>
            <Text style={{color: '#7ba6e5'}}>Term's of use</Text>
          </View>
          <OtpModal status={modal} data={setModal} />
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  inputBox: {
    width: '80%',
    marginHorizontal: '10%',
    marginTop: 20,
    paddingVertical: 4,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#f3f3f3',
  },
  icon: {
    color: '#dddddd',
    marginTop: 8,
    marginLeft: 15,
  },
  input: {
    fontSize: 20,
    // marginLeft: 5,
    // borderWidth: 1,
    width: '70%',
  },
  btn: {
    width: '50%',
    marginHorizontal: '25%',
    marginVertical: 20,
    backgroundColor: '#ff9900',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 25,
  },
  secure: {
    marginLeft: 10,
    marginTop: 10,
  },
  errors: {
    color: 'red',
    width: '80%',
    marginHorizontal: '10%',
  },
});
export default SignIn;
