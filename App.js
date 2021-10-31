import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {requestPermission} from './src/utils/Permission';
import {Header, Body, Footer} from './src/components';

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <Body />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#444444',
  },
});

export default App;
