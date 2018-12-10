export const SET_SETTINGS = 'SET_SETTINGS';
export const REQUEST_SETTINGS = 'REQUEST_SETTINGS';
export const CHANGE_NOTIFICATIONS = 'CHANGE_NOTIFICATIONS';
export const REQUEST_NOTIFICATIONS_CHANGE = 'REQUEST_NOTIFICATIONS_CHANGE';
export const REQUEST_SMS_PRIVACY_CHANGE = 'REQUEST_SMS_PRIVACY_CHANGE';

export const setSettings = payload => ({
  type: SET_SETTINGS,
  payload,
});

export const requestSettings = () => ({
  type: REQUEST_SETTINGS,
});

export const changeNotifications = (notificationId, notificationType, notificationValue) => ({
  type: CHANGE_NOTIFICATIONS,
  notificationId,
  notificationType,
  notificationValue,
}
);

export const requestNotificationsChange = (notificationId,
  notificationType, notificationValue) => ({
  type: REQUEST_NOTIFICATIONS_CHANGE,
  notificationId,
  notificationType,
  notificationValue,
}
);

export const requestSmsPrivacyChange = (value, changeType) => ({
  type: REQUEST_SMS_PRIVACY_CHANGE,
  value,
  changeType,
}
);
