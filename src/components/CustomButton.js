import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const CustomButton = props => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 3,
    borderStyle: 'solid',
    backgroundColor: '#eeeeee',
  },
  text: {
    color: '#333333',
  },
});

export default CustomButton;
