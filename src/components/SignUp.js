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
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Phone from 'react-native-vector-icons/Ionicons';
import Email from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import OtpModal from './OtpModal';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const otpGenerator = require('otp-generator');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [secure, setSecure] = useState(true);
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    // password: yup
    //   .string()
    //   .required('Password is required')
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    //   ),
    mobile: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'This is not valid Mobile Number'),
  });
  async function send(e) {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);

    console.log(`otp sended to ${e}`);
    await AsyncStorage.setItem('OTP', JSON.stringify(val));
    // setModal(true);
    // https://www.fast2sms.com/dev/wallet?authorization=1LlpkzCdRT0czdc5VPS2VVkn8f93kagTF9iw1l8OSDDU4IegwDAQiRnIwe97 -----> for checking your wallet address
    await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=1LlpkzCdRT0czdc5VPS2VVkn8f93kagTF9iw1l8OSDDU4IegwDAQiRnIwe97&message=Your OTP for Amazon app is ${val}&language=english&route=q&numbers=${e}`,
    ).then(function () {
      setModal(true);
    });
  }
  async function store(e) {
    try {
      console.log('i am here', e.name);
      await fetch('http://192.168.19.51:4000/users', {
        method: 'POST',
        body: JSON.stringify({
          name: e.name,
          email: e.email,
          password: e.password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }).then(e => {
        if (e.status == 200) {
          // navigation.navigate('SignIn');
          ToastAndroid.show('User Stored successfully !', ToastAndroid.SHORT);
        } else if (e.status == 300) {
          ToastAndroid.show('Email already exists', ToastAndroid.SHORT);
        } else if (e.status == 400) {
          ToastAndroid.show('Phone number already exists', ToastAndroid.SHORT);
        }
      });
    } catch (err) {
      console.log('CATCH=>', err.message);
    }
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '504834481456-i1fmlm7lju873fj0kvsahata18pld8tj.apps.googleusercontent.com',
    });
  }, [data]);
  function facebook() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          alert(
            'Login success with  permisssions: ' +
              result.grantedPermissions.toString(),
          );
          const data = await AccessToken.getCurrentAccessToken();

          if (!data) {
            throw 'Something went wrong obtaining access token';
          }

          // Create a Firebase credential with the AccessToken
          const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken,
          );

          // Sign-in the user with the credential
          console.log(auth().signInWithCredential(facebookCredential));
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      },
    );
  }
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    // user_sign_in
    //   .then(user => {
    //     console.log(user.user.displayName);
    //     setData({
    //       name: user.user.displayName,
    //       email: user.user.email,
    //       image: user.user.photoURL,
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
    console.log(userInfo.user);
  }
  function logout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        // setData([]);
      });
  }
  return (
    <Formik
      initialValues={{name: '', email: '', mobile: ''}}
      validateOnMount={true}
      onSubmit={values => {
        setUser(values);
        send(values.mobile);
      }}
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

          {/* <View style={styles.inputBox}>
            <Phone name="lock-closed" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry={secure}
              style={{...styles.input, marginLeft: 10}}
            />
            {secure ? (
              <Pressable
                onPress={() => {
                  setSecure(false);
                }}>
                <Email name="eye-with-line" size={28} style={styles.secure} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setSecure(true);
                }}>
                <Email name="eye" size={28} style={styles.secure} />
              </Pressable>
            )}
          </View>
          {status ? (
            <View>
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
            </View>
          ) : null} */}
          <View style={styles.inputBox}>
            <Email name="mobile" size={28} style={styles.icon} />
            <TextInput
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              placeholder="Mobile"
              keyboardType="numeric"
              maxLength={10}
              minLength={10}
              style={{...styles.input, marginLeft: 3}}
            />
          </View>
          {status ? (
            <View>
              {errors.mobile && (
                <Text style={styles.errors}>{errors.mobile}</Text>
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
              // send()
              handleSubmit();
              console.log('clicked');
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
            <Pressable
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: 'https://img.icons8.com/color/344/gmail-new.png',
                }}
              />
            </Pressable>
            <Pressable onPress={facebook}>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: 'https://img.icons8.com/fluency/344/facebook-new.png',
                }}
              />
            </Pressable>
          </View>
          {/* <Button
            title="logout"
            onPress={() => {
              logout();
            }}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // marginTop: 10,
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
