import React from 'react';
import {
  Alert,
  StyleSheet,
  Modal,
  View,
  Text,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CustomButton from './CustomButton';

const fileName = `/SMS_backup_timestamp_${Date.now()}.json`;

const SMSStatsModal = props => {
  const {onClose, SMSStats} = props;

  const handleSaveToDevice = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const fs = RNFetchBlob.fs;
        const dirs = RNFetchBlob.fs.dirs;
        const NEW_FILE_PATH = dirs.DownloadDir + fileName;

        fs.createFile(
          NEW_FILE_PATH,
          JSON.stringify(SMSStats.conversations),
          'utf8',
        )
          .then(() => {
            Alert.alert('File written', 'Path:\n' + NEW_FILE_PATH);
          })
          .catch(e => {
            Alert.alert('Error', 'File could not ne written' + e);
          });
      } else {
        Alert.alert(
          'Permission denied',
          'You need to give the app access to the storage.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalCenteredView}>
          <View style={styles.view}>
            <Text style={styles.statsText}>
              Total number of SMS: {SMSStats.SMSCount}
            </Text>
            <Text style={styles.statsText}>
              Total number of conversations: {SMSStats.conversationsCount}
            </Text>
          </View>
          <View style={styles.view}>
            <CustomButton
              title={'Write file to device'}
              onPress={handleSaveToDevice}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.statsText}>Path to file:</Text>
            <Text style={styles.statsText}>{fileName}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalCenteredView: {
    flex: 1,
    padding: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222222',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'lightblue',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  statsText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'lightblue',
  },
});

export default SMSStatsModal;
