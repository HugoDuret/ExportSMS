import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {requestPermission} from './src/utils/Permission';
import {getDataForJSONExport} from './src/utils/ExportJSON';
import SMSStatsModal from './src/components/SMSStatsModal';
import CustomButton from './src/components/CustomButton';
import Footer from './src/components/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [SMSStats, setSMSStats] = useState(null);
  useEffect(() => {
    requestPermission();
  }, []);

  const handleJSONClicked = async () => {
    try {
      setIsLoading(true);
      const stats = await getDataForJSONExport();
      setSMSStats(stats);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleXMLClicked = async () => {
    Alert.alert('Error', 'XML export not yet implemented');
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Export your SMS</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textText}>Choose the format you want</Text>
      </View>
      <View style={styles.exportFormatsView}>
        {isLoading === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <CustomButton title={'JSON'} onPress={handleJSONClicked} />
            <CustomButton title={'XML'} onPress={handleXMLClicked} />
          </>
        )}
      </View>

      <Footer />

      {SMSStats !== null ? (
        <SMSStatsModal
          SMSStats={SMSStats}
          onClose={() => {
            setSMSStats(null);
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#444444',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginTop: '5%',
    fontSize: 18,
    fontWeight: '700',
    color: 'lightblue',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'lightblue',
  },
  exportFormatsView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;
