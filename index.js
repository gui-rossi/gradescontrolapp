import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App'

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native';

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
