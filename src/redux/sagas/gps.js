// @flow

import { Alert } from 'react-native';
import { eventChannel } from 'redux-saga';
import { call, select, take } from 'redux-saga/effects';

import { sendGpsCoordsToServer } from './api';

let gpsChannel;

function getSocketChannel() {
  return eventChannel((emitter) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        emitter(position);
      },
      error => reactotron.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 24 * 60 * 60 * 1000 },
    );
    // The subscriber must return an unsubscribe function
    return () => {};
  });
}

function unsubscribeFromGps() {
  if (gpsChannel) {
    gpsChannel.close();
  }
  gpsChannel = null;
}

export function* subscribeOnGps(): Generator<*, void, *> {
  unsubscribeFromGps();
  gpsChannel = yield call(getSocketChannel);
  try {
    while (true) {
      const token = yield select(state => state.login.token);
      const headers = new Headers();
      headers.append('X-AUTH-TOKEN', token);
      const onGpsData = yield take(gpsChannel);
      const formData = new FormData();
      formData.append('latitude', onGpsData.coords.latitude);
      formData.append('longitude', onGpsData.coords.longitude);
      const response = yield call(sendGpsCoordsToServer, formData, headers);
      if (response) {
        if (!response.success) {
          Alert.alert('Something went wrong. Please try again later');
        }
      }
    }
  } catch (exception) {
    // reactotron.log('Error in sockets gpsChannel', exception.message);
  }
}
