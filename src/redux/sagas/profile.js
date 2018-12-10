// @flow

import { Alert } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit';
import RNFetchBlob, { base64DataString } from 'rn-fetch-blob';
import { put, call, takeLatest, takeEvery, select, all, race } from 'redux-saga/effects';
import { delay, eventChannel, END } from 'redux-saga';
import { REQUEST_USERS, setRefreshing, addUsers, setUsers, addUsersIds } from '../actions/users';
import { addCurrentUserProfileMeta,
  addViewedUserMeta,
  REQUEST_PROFILE_META,
  REQUEST_CHANGE_PROFILE_SETTINGS,
  REQUEST_FETCH_BLOB_IMAGES,
  REQUEST_INTERESTS,
  REQUEST_PROFILE,
  REQUEST_PASSWORD_CONFIRM,
  REQUEST_DELETE_ACCOUNT,
  SUBMIT_REPORT,
  setIsLoading,
  setProfiles,
  clearProfile,
} from '../actions/profile';
import { REQUEST_SETTINGS, REQUEST_NOTIFICATIONS_CHANGE, REQUEST_SMS_PRIVACY_CHANGE,
  setSettings, changeNotifications } from '../actions/settings';

import { REQUEST_TOKEN_EMAIL, LOGIN_FACEBOOK, LOGIN_KIT, REQUEST_TOKEN_TOKEN,
  receiveAuthToken, setLogin } from '../actions/login';
import { navigation } from '../../global';
import screens from '../../global/screens';
import { requestUserStatus } from './onboarding';
import { fetchUsers,
  fetchTokenEmail,
  fetchTokenKit,
  fetchTokenFacebook,
  getCurrentUser,
  getProfileMeta,
  interactWithProfile,
  loadInterests,
  submitReport,
  getSettings,
  requestSettingsChange,
  requestPasswordConfirmApi,
  requestDeleteAccountApi,
} from './api';
import { incrementPage, setMaxPage } from '../actions/page';
import { createFormData, createHeaders, timeOutError } from './utils';

RNAccountKit.configure({
  responseType: 'code',
});

function* requestChangeProfileSettings({ userId, enable, settingsType }) {
  const headers = yield createHeaders();
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('enable', enable);

  const responseProfileSettingsChange = yield call(interactWithProfile,
    formData,
    headers,
    settingsType);
  if (responseProfileSettingsChange) {
    //
  } else Alert.alert('Something went wrong');
}

function* requestInterests() {
  yield put(setIsLoading(true));
  const headers = yield createHeaders();

  const interestsTypes = ['interest', 'imInterested', 'match', 'visit', 'favorite', 'blocked'];

  const requests = yield all(interestsTypes.map(interestType => call(loadInterests,
    headers,
    interestType)));
  yield put(setProfiles({ 'interests': requests }));
  yield put(setIsLoading(false));
}

function* getUsers() {
  try {
    yield put(setRefreshing(true));
    const filter = yield select(state => state.filter);
    const page = yield select(state => state.page.nextPage);
    const view = yield select(state => state.sort.activeTab);
    const {
      locations, age, height, weight, lastActive, distance, trust, responsiveness,
    } = filter;
    const shouldUpdate = yield select(state => state.filter.shouldAddToFormData);
    const formData = createFormData(locations,
      page,
      age,
      height,
      weight,
      lastActive,
      distance,
      trust,
      responsiveness,
      view,
      shouldUpdate);
    const headers = yield createHeaders();

    const { data, timeout } = yield race({
      data: call(fetchUsers, formData, headers),
      timeout: call(delay, 15000),
    });

    if (data && data.users !== null && data.numberOfPages > page) {

      const users = {};

      data.users.forEach((user) => {
        const userId = user.meta.userId;
        users[userId] = user;
      });

      const userIds = data.users.map(user => user.meta.userId);

      yield put(addUsers(users));
      yield put(addUsersIds(userIds));
      yield put(incrementPage());
      yield put(setMaxPage(data.numberOfPages));
    }
    if (data && !data.success) {
      if (view === 'video' || view === 'nearby') {
        if (data.code) {
          yield put(setUsers({ noUsersMessage: data }));
        }
      }
    }
    if (timeout) {
      timeOutError({});
    }
    yield put(setRefreshing(false));
  } catch (e) {
    console.log(e);
  }
}

// function* downloadPortraits(users) {
//   try {
//     const arrayPortrets = yield all(users.map(user => call(downloadPortrait, user)));
//     const portraits = {};
//     yield arrayPortrets.forEach((element) => {
//       const { userId, path } = element;
//       portraits[userId] = path;
//     });
//   } catch (e) {
//     reactotron.log(e);
//   }
// }

// function* downloadPortrait(user) {
//   try {
//     const portrait = user.images[0].medium;
//     const userId = user.meta.userId;
//     const response = yield call([RNFetchBlob, 'fetch'], 'GET', portrait, {
//       'Content-Type': 'octet-stream',
//     }, base64DataString);
//     if (response) {
//       const base64Str = response.data;
//       const imageBase64 = `${'data:image/png;base64,'}${base64Str}`;
//       return { path: imageBase64, userId };
//     }
//   } catch (e) {
//     reactotron.log(e);
//   }
// }

function* requestProfileInfo({ userId }) {
  try {
    yield put(setIsLoading(true));
    const formData = new FormData();
    formData.append('userId', userId);
    const headers = yield createHeaders();

    const { profile, timeout } = yield race({
      profile: call(getCurrentUser, formData, headers),
      timeout: call(delay, 15000),
    });
    // const profile = yield call(getCurrentUser, formData, headers);
    if (!profile.bio.gender || profile.bio.age === 0 || !profile.images) {
      Alert.alert('Could not get user info');
      return;
    }
    if (profile) {
      yield put(setProfiles(
        {
          'viewedUser': profile,
          chatChannelKey: profile.meta.pusherChannelPublic,
        },
      ));
      const { images } = profile;
      yield fetchBlobImages({ images });
    } else if (timeout) {
      timeOutError({});
    }
    yield put(setIsLoading(false));
  } catch (e) {
    console.log(e);
  }
}

function* fetchBlobImages({ images }) {
  try {
    yield all(images.map((image, index) => call(fetchOneImage, image, index)));
    yield true;
  } catch (e) {
    reactotron.log(e);
  }
}

function createFetchingImageChannel(url: string, index) {
  return eventChannel((emit) => {
    RNFetchBlob.fetch('GET', url, {
      'Content-Type': 'octet-stream',
    }, base64DataString)
      .progress((received, total) => {
        emit({ received, total, index });
      })
      .then((response) => {
        emit({ response, index });
        emit(END);
      })
      .catch((error) => {
        emit({ error, index });
        emit(END);
      });
    return () => {};
  });
}

function* handlePayload({ error, response, received, total, index }) {
  if (error) {
    reactotron.log(error);
    reactotron.log('error at handle payload');

  }
  if (response) {
    const base64Str = response.data;
    const imageBase64 = `${'data:image/png;base64,'}${base64Str}`;
    const images = yield createImagesCopy();
    const newImages = { ...images, [index]: { large: imageBase64 } };
    yield put(setProfiles({ 'viewedUserBlobImages': newImages }));
  }
  if (received && total) {
    const images = yield createImagesCopy();
    const num = received / total;
    const loading = Math.round(num * 10000) / 100;
    const newImages = { ...images, [index]: { ...images[index], loading } };
    yield put(setProfiles({ 'viewedUserBlobImages': newImages }));
  }

}

function* fetchOneImage(image, index) {
  try {
    yield call(fetchSmallImage, image, index);
    const fetchingImageChannel = yield call(createFetchingImageChannel, image.large, index);
    yield takeEvery(fetchingImageChannel, payload => handlePayload(payload));
  } catch (e) {
    reactotron.log(e);
  }
}

function* fetchSmallImage(image, index) {
  try {
    const response = yield call([RNFetchBlob, 'fetch'], 'GET', image.small, {
      'Content-Type': 'octet-stream',
    }, base64DataString);
    if (response) {
      const imagesCopy = yield select(state => state.profiles.viewedUserSmallBlobImages);
      const images = { ...imagesCopy };
      const base64Str = response.data;
      const imageBase64 = `${'data:image/png;base64,'}${base64Str}`;
      const newImages = { ...images, [index]: { ...images[index], small: imageBase64 } };
      yield put(setProfiles({ 'viewedUserSmallBlobImages': newImages }));
    }
  } catch (e) {
    reactotron.log(e);
  }
}

function* createImagesCopy() {
  const images = yield select(state => state.profiles.viewedUserBlobImages);
  return { ...images };
}

function* submitReportProfile({ userId, reasonId, reportText }) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('reasonId', reasonId);
    formData.append('reportText', reportText);
    const headers = yield createHeaders();

    const submit = yield call(submitReport, formData, headers);
    if (submit) {
      Alert.alert(submit.message);
    }
  } catch (e) {
    console.log(e);
  }
}

function* requestProfileMeta({ userId, profileType }) {
  try {
    yield put(setIsLoading(true));
    yield put(setProfiles({ 'isMetaLoading': true }));
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('enable', 'true');
    const headers = yield createHeaders();

    const { profileMeta, timeout } = yield race({
      profileMeta: call(getProfileMeta, formData, headers),
      timeout: call(delay, 15000),
    });
    // const profileMeta = yield call(getProfileMeta, formData, headers);
    if (profileMeta) {
      if (profileType === 'myProfile') {
        yield put(addCurrentUserProfileMeta(profileMeta));
      } else {
        const { favorite, youAreInterested, theyAreBlocked } = profileMeta.settings;
        yield put(addViewedUserMeta(profileMeta));
        yield put(setProfiles(
          {
            'isFavorite': favorite,
            'isInterested': youAreInterested,
            'isBlocked': theyAreBlocked,
          },
        ));
      }
    } else if (timeout) {
      timeOutError({});
    }
    yield put(setIsLoading(false));

    yield put(setProfiles({ 'isMetaLoading': false }));
  } catch (e) {
    console.log(e);
  }
}

function* requestSettings() {
  try {
    yield put(setSettings({ 'isLoading': true }));
    const headers = yield createHeaders();
    const settings = yield call(getSettings, headers);
    if (settings.success) {
      yield put(setSettings({
        'notifications': settings.notifications,
        'smsNotifications': settings.smsNotifications,
        'privacy': settings.privacy,
        'profileStatusItems': settings.profileStatusItems,
      }));
    }
    yield put(setSettings({ 'isLoading': false }));
  } catch (e) {
    console.log(e);
  }
}

function* requestPasswordConfirm({ password }) {
  try {
    yield put(setProfiles({ 'isLoading': true }));
    const headers = yield createHeaders();
    const formData = new FormData();
    formData.append('password', password);

    const confirm = yield call(requestPasswordConfirmApi, formData, headers);
    if (confirm) {
      if (confirm.success) {
        yield put(setProfiles({
          'passwordConfirmed': true,
        }));
      } else Alert.alert(confirm.message);
    }
    yield put(setProfiles({ 'isLoading': false }));
  } catch (e) {
    console.log(e);
  }
}

function* requestDeleteAccount({ reasonId, reasonText }) {
  try {
    yield put(setProfiles({ 'isLoading': true }));
    const headers = yield createHeaders();
    const formData = new FormData();
    formData.append('reasonId', reasonId);
    formData.append('reasonText', reasonText);

    const deleted = yield call(requestDeleteAccountApi, formData, headers);
    if (deleted) {
      Alert.alert(deleted.message);
      if (deleted.success) {
        navigation.reset(screens.login);
        yield put(clearProfile());
      } else navigation.reset(screens.home);
    }
    yield put(setProfiles({ 'isLoading': false }));
  } catch (e) {
    console.log(e);
  }
}

function* requestNotificationsChange({ notificationId, notificationType,
  notificationValue }) {
  try {
    yield put(changeNotifications(notificationId, notificationType,
      notificationValue));
    const formData = new FormData();
    formData.append('notificationId', notificationId);
    formData.append('type', notificationType);
    const enable = notificationValue ? '1' : '0';
    formData.append('enable', enable);
    const headers = yield createHeaders();

    const settingsChange = yield call(requestSettingsChange, formData, headers, 'updateNotification');
    if (!settingsChange.success) {
      yield put(changeNotifications(notificationId, notificationType,
        !notificationValue));
    }

  } catch (e) {
    console.log(e);
  }
}

const smsPrivacyChanges = {
  'setSmsNotifications': 'smsNotifications',
  'setPrivate': 'privacy',
};

function* requestSmsPrivacyChange({ value, changeType }) {
  try {
    const field = smsPrivacyChanges[changeType];
    yield put(setSettings({ [field]: value }));
    const formData = new FormData();
    const enable = value ? '1' : '0';

    const formDataKey = (changeType === 'setSmsNotifications') ? 'enabled' : 'private';
    formData.append(formDataKey, enable);
    const headers = yield createHeaders();

    const change = yield call(requestSettingsChange, formData, headers, changeType);
    if (!change.success) {
      yield put(setSettings({ [field]: !value }));
    }
  } catch (e) {
    console.log(e);
  }
}

function* requestTokenEmail({ email, password }) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const data = yield call(fetchTokenEmail, formData);
    if (data && data.success === false) {
      Alert.alert(data.message);
    }
    if (data && data.success === true) {
      yield put(receiveAuthToken(data.authToken));
      yield requestUserStatus({ token: data.authToken });
    }
  } catch (e) {
    console.log(e);
  }
}

function* loginFacebook() {
  try {
    const lmPermissions = yield call(LoginManager.logInWithReadPermissions, ['public_profile', 'user_friends', 'email']);
    if (lmPermissions.isCancelled) {
      Alert.alert('Login cancelled');
    } else {
      const data = yield call(AccessToken.getCurrentAccessToken);
      if (data) {
        if (data.accessToken) {
          yield put(setLogin({ fbAccessToken: data.accessToken }));
        }
        yield call(requestTokenWithToken, { accessToken: data.accessToken, typeToken: 'facebook' });
      }
    }
  } catch (e) {
    reactotron.log(e);
  }
}

function* loginKit() {
  try {
    const data = yield call(RNAccountKit.loginWithPhone);
    if (data) {
      yield call(requestTokenWithToken, { accessToken: data.code, typeToken: 'kit' });
    }
  } catch (e) {
    reactotron.log('error at login kit saga');
    reactotron.log(e);
  }
}

export function* requestTokenWithToken({ accessToken, typeToken }:
  { accessToken: string, typeToken: string }): Generator<*, void, *> {
  try {
    // reactotron.log('inside request token with token');
    const formData = new FormData();
    formData.append('accessToken', accessToken);
    // reactotron.log(accessToken);
    const api = (typeToken === 'facebook') ? fetchTokenFacebook : fetchTokenKit;
    const data = yield call(api, formData);
    if (data && data.success === false) {
      Alert.alert(data.message);
    }
    if (data && data.success === true) {
      yield put(receiveAuthToken(data.authToken));
      yield requestUserStatus({ token: data.authToken });
    }
  } catch (e) {
    console.log(e);
  }
}

export const profile = [
  takeLatest(REQUEST_USERS, getUsers),
  takeLatest(REQUEST_TOKEN_EMAIL, requestTokenEmail),
  takeLatest(REQUEST_TOKEN_TOKEN, requestTokenWithToken),
  takeLatest(REQUEST_PROFILE_META, requestProfileMeta),
  takeLatest(REQUEST_PROFILE, requestProfileInfo),
  takeLatest(REQUEST_CHANGE_PROFILE_SETTINGS, requestChangeProfileSettings),
  takeLatest(REQUEST_INTERESTS, requestInterests),
  takeLatest(SUBMIT_REPORT, submitReportProfile),
  takeLatest(REQUEST_SETTINGS, requestSettings),
  takeLatest(REQUEST_NOTIFICATIONS_CHANGE, requestNotificationsChange),
  takeLatest(REQUEST_SMS_PRIVACY_CHANGE, requestSmsPrivacyChange),
  takeLatest(REQUEST_PASSWORD_CONFIRM, requestPasswordConfirm),
  takeLatest(REQUEST_DELETE_ACCOUNT, requestDeleteAccount),
  takeLatest(LOGIN_FACEBOOK, loginFacebook),
  takeLatest(LOGIN_KIT, loginKit),
  takeLatest(REQUEST_FETCH_BLOB_IMAGES, fetchBlobImages),
];
