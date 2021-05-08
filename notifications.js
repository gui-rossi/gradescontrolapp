import PushNotification from 'react-native-push-notification';

const showNotification = (channelId, title, message) => {
    PushNotification.localNotification({
        channelId: channelId,
        title: title,
        message: message,
        playSound: true, 
        soundName: 'default',
    });
};

const showScheduledNotificationWithoutSound = (channelId, title, message, seconds) => {
    PushNotification.localNotificationSchedule({
        channelId: channelId,
        title: title,
        message: message,
        date: new Date(Date.now() + seconds * 1000),
    });
};

const showScheduledNotificationWithSound = (channelId, title, message, seconds) => {
    PushNotification.localNotificationSchedule({
        channelId: channelId,
        title: title,
        message: message,
        soundName: 'default',
        date: new Date(Date.now() + seconds * 1000),
        playSound: true
    });
};

const cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
};

export { showScheduledNotificationWithoutSound, showScheduledNotificationWithSound, cancelAllNotifications, showNotification }