import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, ActivityIndicator} from 'react-native';
import {getDataForJSONExport} from '../utils/ExportJSON';
import SMSStatsModal from './SMSStatsModal';
import CustomButton from './CustomButton';
import {Styles} from '../config';

const Body = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [SMSStats, setSMSStats] = useState(null);

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
    <View style={styles.body}>
      <View style={styles.textView}>
        <Text style={styles.textText}>Choose the format you want</Text>
      </View>

      <View style={styles.exportFormatsView}>
        {isLoading === true ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.exportFormatsButtons}>
            <CustomButton title={'JSON'} onPress={handleJSONClicked} />
            <CustomButton title={'XML'} onPress={handleXMLClicked} />
          </View>
        )}
      </View>

      {SMSStats !== null ? (
        <SMSStatsModal
          SMSStats={SMSStats}
          onClose={() => {
            setSMSStats(null);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '5%',
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
    color: Styles.COLORS.THEME_LIGHT_BLUE,
  },
  exportFormatsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportFormatsButtons: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default Body;
