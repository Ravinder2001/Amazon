import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  Image,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Email from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {Formik} from 'formik';
import {openDatabase} from 'react-native-sqlite-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const db = openDatabase({
  name: 'userList',
});
const SignIn = () => {
  const [secure, setSecure] = useState(false);
  const [status, setStatus] = useState(false);
  const [users, setUsers] = useState([]);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    password: yup.string().required('Password is required'),
  });
  const getList = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM List',
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({id: item.id, name: item.name,email:item.email,password:item.password});
            }

            setUsers(results);
            console.log('List get Succesfully');
          }
        },
        err => {
          console.log(err.message);
        },
      );
    });
  };
  // useEffect(() => {
  //   getList();
  // });
  console.log(users);
  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validateOnMount={true}
      onSubmit={getList}
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
          {status ? (
            <View>
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
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
              // setStatus(true);
              // handleSubmit();
              getList();
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
