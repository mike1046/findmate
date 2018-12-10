// @flow

import { put, call, takeLatest, select, fork, all } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import { navigation } from '../../global';
import screens from '../../global/screens';
import { ON_MOUNT } from '../actions/core';
import { addCities, addGender } from '../actions/cache';
import { messaging } from './messaging';
import { profile } from './profile';
import { onboarding, requestUserStatus } from './onboarding';
import { fetchCache } from './api';

let isRehydrated = false;
let isMounted = false;

function* onReady(): Generator<*, void, *> {
  try {
    const {
      token,
    } = yield select((state) => {
      const {
        login: {
          token,
        },
      } = state;
      return {
        token,
      };
    });
    if (token) {
      yield requestUserStatus({ token });
    } else {
      // yield delay(2000);
      navigation.reset(screens.onboarding);
    }
  } catch (e) {
    console.log(e);
    console.log('error at on ready');
  }
}

function* onMount(): Generator<*, void, *> {
  if (isRehydrated) {
    yield onReady();
  }
  isMounted = true;
}

function* onRehydrate(): Generator<*, void, *> {
  if (isMounted) {
    yield onReady();
  }
  isRehydrated = true;
}

// to find Locations (cities) and Gender
function* getCache() {
  try {
    const data = yield call(fetchCache);
    if (data && data.search.location.metrosById !== null) {
      const citiesObj = data.search.location.metrosById;
      const citiesArr = [];

      Object.keys(citiesObj).forEach((key) => {
        citiesArr.push({
          type: 'metro',
          id: key,
          name: citiesObj[key],
        });
      });
      yield put(addCities(citiesArr));
    }
    if (data && data.label.genderInput) {
      yield put(addGender(data.label.genderInput));
    }

  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga(): Generator<*, void, *> {

  yield takeLatest(REHYDRATE, onRehydrate);
  yield takeLatest(ON_MOUNT, onMount);
  yield fork(getCache);
  yield all(messaging);
  yield all(profile);
  yield all(onboarding);
}
