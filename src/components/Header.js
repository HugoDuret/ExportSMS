import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Styles} from '../config';

const Header = () => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>Export your SMS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    elevation: 10,
    height: Styles.HEADER_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Styles.COLORS.THEME_BLACK,
  },
  titleText: {
    marginTop: '5%',
    fontSize: 18,
    fontWeight: '700',
    color: Styles.COLORS.THEME_WHITE_DARKER,
  },
});

export default Header;
