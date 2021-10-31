import SmsAndroid from 'react-native-get-sms-android';
import {Alert} from 'react-native';
import Contacts from 'react-native-contacts';

/**
 * SEE THE END OF THE FILE FOR THE FORMATS OF THE DATA RETURNED BY THE LIBRARIES
 */

/**
 * Get all the SMS on the phone, including the name of the corresponding contact
 * 1. Fetch all the SMS
 * 2. Fetch all the contacts
 * 3. For each SMS, find the corresponding contact, based on the the phone number
 */
export const getDataForJSONExport = () =>
  new Promise((resolve, reject) => {
    // 1. Fetch all the SMS
    const filter = {
      box: 'inbox',
      maxDate: Date.now(),
    };
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        Alert.alert('Failed with this error: ' + fail);
        reject(fail);
      },
      async (count, smsList) => {
        // Implementation of the lodash groupBy method
        const groupBy = (xs, key) => {
          return xs.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };

        const allSMS = JSON.parse(smsList);

        // 2. Fetch all the contacts
        const allContacts = await Contacts.getAllWithoutPhotos();

        // 3. For each SMS, find the corresponding contact, based on the the phone number
        // Each contact can have multiple phone numbers, so we check them all
        const allSMSWithCorrespondingContactName = [];
        allSMS.forEach(sms => {
          const contactOfSMS = allContacts.find(
            contact =>
              contact &&
              contact.phoneNumbers &&
              contact.phoneNumbers
                .map(phoneNumber => phoneNumber.number.slice(-9)) // ugly trick for now to handle the same numbers but with or without the international code
                .includes(sms.address.slice(-9)),
          );

          allSMSWithCorrespondingContactName.push({
            ...sms,
            contact:
              contactOfSMS !== undefined
                ? `${contactOfSMS.givenName} ${contactOfSMS.familyName}`
                : sms.address,
            date: new Date(sms.date).toJSON(), // format the date as a JSON string
          });
        });

        const conversations = groupBy(
          allSMSWithCorrespondingContactName,
          'contact',
        );

        resolve({
          SMSCount: count,
          conversationsCount: Object.keys(conversations).length,
          conversations,
        });
      },
    );
  });

/*
Each sms is represented by a JSON object represented below

{
  "_id": 1234,
  "thread_id": 3,
  "address": "2900",
  "person": -1,
  "date": 1365053816196,
  "date_sent": 0,
  "protocol": 0,
  "read": 1,
  "status": -1,
  "type": 1,
  "body": "Hello There, I am an SMS",
  "service_center": "+60162999922",
  "locked": 0,
  "error_code": -1,
  "sub_id": -1,
  "seen": 1,
  "deletable": 0,
  "sim_slot": 0,
  "hidden": 0,
  "app_id": 0,
  "msg_id": 0,
  "reserved": 0,
  "pri": 0,
  "teleservice_id": 0,
  "svc_cmd": 0,
  "roam_pending": 0,
  "spam_report": 0,
  "secret_mode": 0,
  "safe_message": 0,
  "favorite": 0
}

*/
/*
Example Contact Record

{
  recordID: '6b2237ee0df85980',
  backTitle: '',
  company: '',
  emailAddresses: [{
    label: 'work',
    email: 'carl-jung@example.com',
  }],
  familyName: 'Jung',
  givenName: 'Carl',
  middleName: '',
  jobTitle: '',
  phoneNumbers: [{
    label: 'mobile',
    number: '(555) 555-5555',
  }],
  hasThumbnail: true,
  thumbnailPath: 'content://com.android.contacts/display_photo/3',
  postalAddresses: [{
    label: 'home',
    formattedAddress: '',
    street: '123 Fake Street',
    pobox: '',
    neighborhood: '',
    city: 'Sample City',
    region: 'CA',
    state: 'CA',
    postCode: '90210',
    country: 'USA',
  }],
  prefix: 'MR',
  suffix: '',
  department: '',
  birthday: {'year': 1988, 'month': 0, 'day': 1 },
  imAddresses: [
    { username: '0123456789', service: 'ICQ'},
    { username: 'johndoe123', service: 'Facebook'}
  ]
}
*/
