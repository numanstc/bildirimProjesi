import PushNotification from 'react-native-push-notification';
import {View, Text} from 'react-native';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  // requestPermissions: true,
  requestPermissions: Platform.OS === 'ios',
});

function notification(title, message) {
  PushNotification.localNotification({
    title,
    message,
  });
}

export default notification;
