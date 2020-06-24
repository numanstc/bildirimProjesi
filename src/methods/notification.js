import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: false,
  requestPermissions: Platform.OS === 'ios',
});

function notification(title, message) {
  PushNotification.localNotification({
    title,
    message,
  });
}

export default notification;
