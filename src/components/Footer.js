import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerView}>
      <Text style={styles.footerText}>v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 12,
    color: 'lightgrey',
  },
});

export default Footer;
