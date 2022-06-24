import {View, Text, Button, TextInput} from 'react-native';
import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
const Demo = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('email address is require'),
    password: yup
      .string()
      .min(8,({min})=>`'password must be min ${min} Charater'`)
      .required('password is required')
      .matches(
        '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$',
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => console.log(values)}
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
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="email"
          />
          {errors.email && (
            <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
          )}
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="password"
          />
          {errors.password && (
            <Text style={{fontSize: 10, color: 'red'}}>{errors.password}</Text>
          )}
          <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
        </View>
      )}
    </Formik>
  );
};

export default Demo;
