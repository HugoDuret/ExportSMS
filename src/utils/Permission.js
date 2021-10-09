import {Alert, Platform} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestPermission = () => {
  // READ SMS
  let permission = PERMISSIONS.ANDROID.READ_SMS;
  check(permission)
    .then(readSMSResult => {
      switch (readSMSResult) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
        case RESULTS.LIMITED:
          requestAccess(permission);
          break;
        case RESULTS.BLOCKED:
          Alert.alert('The permission is denied and not requestable anymore');
          break;

        case RESULTS.GRANTED:
          permission = PERMISSIONS.ANDROID.READ_CONTACTS;
          check(permission)
            .then(readContactsResult => {
              switch (readContactsResult) {
                case RESULTS.UNAVAILABLE:
                  Alert.alert(
                    'This feature is not available (on this device / in this context)',
                  );
                  break;
                case RESULTS.DENIED:
                case RESULTS.LIMITED:
                  requestAccess(permission);
                  break;
                case RESULTS.BLOCKED:
                  Alert.alert(
                    'The permission is denied and not requestable anymore',
                  );
                  break;
              }
            })
            .catch(error => {
              Alert.alert('An error occurred', error);
            });
          break;
      }
    })
    .catch(error => {
      Alert.alert('An error occurred', error);
    });
};

const requestAccess = permission => {
  if (Platform.OS === 'android') {
    Alert.alert(
      'Notice',
      'You need to allow the app to read your SMS and read your contacts',
    );
    request(permission);
  } else {
    Alert.alert(
      'Impossible',
      'Only available for Android (feel free to help us to support more OS)',
    );
  }
};
