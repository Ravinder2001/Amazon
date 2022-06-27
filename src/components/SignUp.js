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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Email from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {Formik} from 'formik';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const SignUp = () => {
  const [secure, setSecure] = useState(false);
  const [status, setStatus] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    password: yup
      .string()
      .min(8, ({min}) => `'password must be min ${min} Charater'`)
      .required('Password is required'),
  });
  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => alert(JSON.stringify(values))}
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
          <Pressable
            onPress={() => {
              setStatus(true);
            }}>
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

            <View>
              {errors.name && <Text style={styles.errors}>{errors.name}</Text>}
            </View>
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
          {errors.email && <Text style={styles.errors}>{errors.email}</Text>}

          <View style={styles.inputBox}>
            <Icon name="lock" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="password"
              secureTextEntry={!secure}
              style={{...styles.input, marginLeft: 10}}
            />
            {secure ? (
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
            )}
          </View>
          {errors.password && (
            <Text style={styles.errors}>{errors.password}</Text>
          )}
          <Pressable disabled={!isValid} onPress={handleSubmit}>
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
              marginTop: 5,
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
              marginTop: 10,
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
    width: '50%',
    marginHorizontal: '25%',
    marginVertical: 20,
    backgroundColor: '#ff9900',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 20,
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
