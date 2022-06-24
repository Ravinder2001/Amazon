import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const Homepage = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.search_box}>
          <Icon
            name="search"
            size={28}
            style={{color: 'black', marginTop: 10, marginLeft: 5}}
          />
          <TextInput placeholder="Search Amazon.in" style={styles.input} />
          <Icon
            name="scan"
            size={28}
            style={{color: 'gray', marginTop: 10, marginLeft: 0}}
          />
        </View>
        <View style={styles.mic_box}>
          <Icon style={styles.mic} name="mic" size={32} />
        </View>
      </View>
      <View style={styles.box}>
        <Image
          source={{uri: 'https://wallpaperaccess.com/full/1383586.jpg'}}
          style={styles.img}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#8fe7ce',
    height: 80,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  search_box: {
    width: '82%',
    borderWidth: 1,
    height: '65%',
    marginTop: 15,
    marginLeft: 20,
    borderRadius: 8,
    borderColor: 'gray',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  mic_box: {
    width: '15%',

    height: '65%',
    marginTop: 15,
  },

  input: {
    width: '65%',
    marginLeft: 0,
    fontSize: 20,
  },
  mic: {
    color: 'black',
    marginLeft:15,
    marginTop:10
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  box: {borderWidth: 1, margin: 10},
});
export default Homepage;
