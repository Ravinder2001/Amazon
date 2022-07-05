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
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
  });
  async function userData(e) {
    console.log(e);

    fetch(`http://192.168.19.51:4000/userData?email=${e.email}`)
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
      initialValues={{email: ''}}
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
            <Email name="email" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              style={{...styles.input, marginLeft: 3}}
            />
          </View>
          {status ? (
            <View>
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
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
