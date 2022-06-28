import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Phone from 'react-native-vector-icons/Ionicons';
import Email from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {Formik} from 'formik';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = () => {
  const [secure, setSecure] = useState(false);
  const [status, setStatus] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Mobile number should be of 10 digits')
      .max(10, 'to long'),
  });
  async function store(e) {
    try {
      console.log('i am here', e.name);
      await fetch('http://192.168.19.69:4000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: e.name,
          email: e.email,
          phone: e.phone,
        }),
      }).then(() => {
        console.log('Succesfully Stored');
      });
    } catch (err) {
      console.log('CATCH=>', err.message);
    }
  }
  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => store(values)}
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
          <Pressable>
            <View style={styles.inputBox}>
              <Icon name="user" size={28} style={styles.icon} />
              <TextInput
                placeholder="Name"
                style={{...styles.input, marginLeft: 10}}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>

            {status ? (
              <View>
                {errors.name && (
                  <Text style={styles.errors}>{errors.name}</Text>
                )}
              </View>
            ) : null}
          </Pressable>

          <View style={styles.inputBox}>
            <Email name="email" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
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

          <View style={styles.inputBox}>
            <Phone name="call" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder="phone"
              keyboardType="numeric"
              maxLength={10}
              style={{...styles.input, marginLeft: 10}}
            />
            {/* {secure ? (
              <Pressable
                onPress={() => {
                  setSecure(false);
                }}>
                <Email name="eye" size={28} style={styles.secure} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setSecure(true);
                }}>
                <Email name="eye-with-line" size={28} style={styles.secure} />
              </Pressable>
            )} */}
          </View>
          {status ? (
            <View>
              {errors.phone && (
                <Text style={styles.errors}>{errors.phone}</Text>
              )}
            </View>
          ) : null}
          <Pressable
            style={{
              // borderWidth: 1,
              width: '50%',
              marginHorizontal: '25%',
              marginTop: 10,
            }}
            // disabled={!isValid}
            onPress={() => {
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
                Create Account
              </Text>
            </View>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // marginTop: 5,
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
              // marginTop: 10,
            }}>
            <Text>By creating an account, you agree to Amazon's</Text>
            <Text style={{color: '#7ba6e5'}}>Term's of use</Text>
          </View>
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
    // width: '50%',
    // marginHorizontal: '25%',
    // marginVertical: 20,
    backgroundColor: '#ff9900',
    borderRadius: 15,
    paddingHorizontal: 10,
    // marginTop: 20,
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
export default SignUp;
