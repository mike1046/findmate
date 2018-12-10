// @flow

import { Alert } from 'react-native';

import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { put, call, takeLatest, select, fork, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import type { SaveAnswerRequestAction, SkipAnswerRequestAction } from '../types/onboarding';

import { getFBPhotosUrl } from '../../global/apiUrl';

import { REQUEST_LOCATIONS,
  CREATE_USER,
  SEND_BASIC,
  SEND_EMAIL,
  SEND_PASSWORD,
  SEND_SEEKING,
  SET_AS_PRIMARY,
  SEND_LOCATION,
  SEND_PHOTO,
  SEND_PHOTO_FACEBOOK,
  SEND_VIDEO,
  GET_IMAGES,
  DELETE_IMAGE,
  SEND_ABOUT,
  PASTING_DETECTED,
  COMPLETE_WITH_PHOTOS,
  SKIP_VIDEO_STEP,
  GET_QUESTIONS,
  GET_FACEBOOK_PHOTOS,
  SKIP_QUESTIONS_STEP,
  SAVE_ANSWER_REQUEST,
  SKIP_ANSWER_REQUEST,
  REQUEST_USER_STATUS,
  CHECK_IF_UNANSWERED_LEFT,
  skipAnswer,
  saveAnswer,
  toggleQuestionsAnswered,
  deletePhotoFromUpload,
  setOnboarding,
  addImageId,
  returnToSkipped,
} from '../actions/onboarding';
import { addCurrentUserProfile,
  addCurrentUserProfileMeta,
  setIsLoading,
  setProfiles,
} from '../actions/profile';
import { receiveAuthToken, receiveUserIdAndKey, logOut } from '../actions/login';
import { pusherListener } from './pusher';
import { subscribeOnGps } from './gps';
import { screens, navigation } from '../../global';
import { createHeaders, timeOutError } from './utils';

import {
  requestLocations,
  fetchOnboarding,
  getUserStatus,
  getProfileMeta,
  getCurrentUser,
} from './api';

function* createStepsCopy() {
  const steps = yield select(state => state.profiles.steps);
  return { ...steps };
}

function* getLocations({ locationsType, search }) {

  try {
    let formData = null;

    const headers = yield createHeaders();
    if (search) {
      yield delay(500);
      formData = new FormData();
      formData.append('search', search);
    }
    const response = yield call(requestLocations, formData, headers, locationsType);

    if (response) {
      if (response.success) {
        if (locationsType === 'closest') {
          yield put(setOnboarding({ 'closestLocation': response }));
        }
        if (locationsType === 'nearby') {
          yield put(setOnboarding({ 'nearbyLocations': response }));
        }
        if (locationsType === 'search') {
          yield put(setOnboarding({ 'searchLocations': response }));
        }
      } else {
        yield put(setOnboarding({ 'renderLocation': 'search' }));
      }
    }

  } catch (e) {
    reactotron.log('error at get locations saga');
  }
}

// const keys = ['email', 'basic', 'seeking', 'photo', 'location',
//  'password', 'about', 'profile', 'video'];

export function* checkSteps(): Generator<*, void, *> {
  try {
    const steps = yield select(state => state.profiles.steps);
    if (steps) {
      const keys = Object.keys(steps);
      const phoneOrMail = keys.filter(key => steps[key].requireEmailOrPhone);

      // let screen = keys.find(item => !steps[item].complete);
      let screen = keys.find((item) => {
        if (!phoneOrMail.includes(item)) {
          return !steps[item].complete;
        }
        return !phoneOrMail.some(i => steps[i].complete);
      });

      if (screen) {
        if (screen === 'profile') {
          screen = 'questions';
        }
        if (screen === 'phoneNumber') {
          screen = 'phone';
        }
        navigation.navigate(screens[screen]);
        // navigation.navigate(screens.video);
      } else {
        const token = yield select(state => state.login.token);
        yield requestUserInfo({ token });
      }
    }
  } catch (e) {
    // console.log(e);
  }
}

export function* requestUserInfo({ token } : { token: string }): Generator<*, void, *> {
  try {
    yield put(setIsLoading(true));
    const {
      userId,
    } = yield select((state) => {
      const {
        login: {
          userId,
        },
      } = state;
      return {
        userId,
      };
    });
    const formData = new FormData();
    formData.append('userId', userId);
    let headers;
    if (token) {
      headers = new Headers();
      headers.append('X-AUTH-TOKEN', token);
    } else {
      headers = yield createHeaders();
    }

    let errorConnecting = false;
    const { currentUser, timeout } = yield race({
      currentUser: call(getCurrentUser, formData, headers),
      timeout: call(delay, 15000),
    });
    if (currentUser) {
      yield put(addCurrentUserProfile(currentUser));
    } else if (timeout) {
      errorConnecting = true;
    }
    formData.append('enable', 'true');
    const { currentUserMeta, timeoutMeta } = yield race({
      currentUserMeta: call(getProfileMeta, formData, headers),
      timeoutMeta: call(delay, 15000),
    });
    if (currentUserMeta) {
      yield put(addCurrentUserProfileMeta(currentUserMeta));
      navigation.reset(screens.home);
    }
    if (timeoutMeta) {
      errorConnecting = true;
    }
    if (errorConnecting) {
      Alert.alert('There was an error connecting to Findmate');
    }
    yield put(setIsLoading(false));
  } catch (e) {
    // console.log(e);
  }
}

function* sendBasicData({ gender, dateOfBirth }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('gender', gender);
    formData.append('dateOfBirth', dateOfBirth);
    const request = yield call(fetchOnboarding, formData, headers, 'basic');
    if (request.success) {
      const steps = yield createStepsCopy();
      const currentValues = { gender, dateOfBirth };

      const newSteps = {
        ...steps, basic: { ...steps.basic, currentValues, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    }
  } catch (e) {
    // console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendEmailData({ email }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('email', email);
    const request = yield call(fetchOnboarding, formData, headers, 'email');
    if (request.success) {
      // const steps = yield createStepsCopy();
      // const currentValues = { email };

      // const newSteps = {
      //   ...steps, email: { ...steps.email, currentValues, complete: true },
      // };
      // yield put(setProfiles({ 'steps': newSteps }));
      // yield checkSteps();
      yield put(setOnboarding({ 'emailSent': email }));
    } else if (request.message) {
      yield put(setOnboarding({ 'mailMessage': request.message }));
    }
  } catch (e) {
    // console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendPasswordData({ password }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('password', password);
    const request = yield call(fetchOnboarding, formData, headers, 'password');
    if (request.success) {
      const steps = yield createStepsCopy();
      const currentValues = { password };

      const newSteps = {
        ...steps, password: { ...steps.password, currentValues, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    } else if (request.message) {
      yield put(setOnboarding({ 'passwordMessage': request.message }));
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendAboutData({ headline, description, slug }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('headline', headline);
    formData.append('description', description);
    formData.append('slug', slug);
    const request = yield call(fetchOnboarding, formData, headers, 'about');
    if (request.success) {
      const steps = yield createStepsCopy();
      const currentValues = { headline, description, slug };

      const newSteps = {
        ...steps, about: { ...steps.about, currentValues, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendSeekingData({ seeking, ageFrom, ageTo }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('seeking', seeking);
    formData.append('ageFrom', ageFrom);
    formData.append('ageTo', ageTo);
    const request = yield call(fetchOnboarding, formData, headers, 'seeking');
    if (request.success) {
      const steps = yield createStepsCopy();
      const currentValues = { seeking, ageFrom, ageTo };

      const newSteps = {
        ...steps, seeking: { ...steps.seeking, currentValues, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* completeWithPhotos() {
  try {
    // yield put(setOnboarding({ isLoading: true }));
    const steps = yield createStepsCopy();

    const newSteps = {
      ...steps, photo: { ...steps.photo, complete: true },
    };
    yield put(setProfiles({ 'steps': newSteps }));
    yield checkSteps();
  } catch (e) {
    reactotron.log('error at completeing with photos');
  }
}

function* sendLocationData({ locationId, location }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('locationId', locationId);
    const request = yield call(fetchOnboarding, formData, headers, 'location');
    if (request.success) {
      const steps = yield createStepsCopy();
      const currentValues = { location };

      const newSteps = {
        ...steps, location: { ...steps.location, currentValues, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendPastingDetected() {
  try {
    const headers = yield createHeaders();

    yield call(fetchOnboarding, null, headers, 'pasteDetected');
  } catch (e) {
    console.log(e);
  }
}

function* sendPhotoData({ content }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('image', content);

    const request = yield call(fetchOnboarding, formData, headers, 'photo');

    if (request) {
      if (request.success === false) {
        yield put(deletePhotoFromUpload(content));
        if (request.message) {
          Alert.alert(request.message);
        }
      }
      if (request.success) {
        yield put(addImageId(content, request.imageId));
      }
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendPhotoFacebook({ content }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('url', content.uri);

    const request = yield call(fetchOnboarding, formData, headers, 'photoFacebook');

    if (request) {
      if (request.success === false) {
        yield put(deletePhotoFromUpload(content));
        if (request.message) {
          Alert.alert(request.message);
        }
      }
      if (request.success) {
        yield put(addImageId(content, request.imageId));
      }
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* sendVideoData({ content }) {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const formData = new FormData();
    formData.append('video', content);
    const request = yield call(fetchOnboarding, formData, headers, 'video');
    if (request) {
      if (request.success) {
        const steps = yield createStepsCopy();
        const newSteps = {
          ...steps, video: { ...steps.video, complete: true },
        };
        yield put(setProfiles({ 'steps': newSteps }));
        yield checkSteps();
      }
    }
  } catch (e) {
    Alert.alert('Error at sending video');
    reactotron.log('crash at sendVideoData');
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* skipVideoStep() {
  try {
    const steps = yield createStepsCopy();
    const newSteps = {
      ...steps, video: { ...steps.video, complete: true },
    };
    yield put(setProfiles({ 'steps': newSteps }));
    yield checkSteps();
  } catch (e) {
    console.log(e);
  }
}

export function* requestUserStatus({ token }: { token: string }): Generator<*, void, *> {
  // reactotron.log('inside request user status');
  try {
    console.log('inside request user status');
    let headers;
    if (!token) {
      headers = yield createHeaders();
    } else {
      headers = new Headers();
      headers.append('X-AUTH-TOKEN', token);
    }
    const { userStatus, timeout } = yield race({
      userStatus: call(getUserStatus, headers),
      timeout: call(delay, 15000),
    });

    if (userStatus) {
      if (userStatus.success) {
        const { pusherChannelPrivate, userId } = userStatus.currentUser;
        yield put(receiveUserIdAndKey(userId, pusherChannelPrivate));
        // yield (requestUserInfo(token));
        if (userStatus.steps) {
          yield put(setProfiles({ 'steps': userStatus.steps }));
          yield checkSteps();
          yield fork(subscribeOnGps);
        }
        yield fork(pusherListener);
      } else {
        logOut();
        Alert.alert('There was an error connecting to Findmate');
        navigation.reset(screens.login);
      }
    } else if (timeout) {
      Alert.alert('There was an error connecting to Findmate');
      navigation.reset(screens.login);
    }
  } catch (e) {
    Alert.alert('Error at connection');
    navigation.navigate(screens.login);
  }
}

function* getImages(): Generator<*, void, *> {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();

    const { images, timeout } = yield race({
      images: call(fetchOnboarding, null, headers, 'getImages'),
      timeout: call(delay, 15000),
    });
    if (images) {
    // const images = yield call(fetchOnboarding, null, headers, 'getImages');
      if (images.success) {
        if (images.processedImages) {
          const { processedImages } = images;
          const approvedPhotos = processedImages.filter(item => item.isApproved);
          const privatePhotos = processedImages.filter(item => !item.isApproved);
          if (approvedPhotos.length > 0) {
            yield put(setOnboarding({ 'approvedPhotos': approvedPhotos }));
          }
          if (privatePhotos.length > 0) {
            yield put(setOnboarding({ 'privatePhotos': privatePhotos }));
          }
        }
      }
    } else if (timeout) {
      timeOutError({});
    }
  } catch (e) {
    reactotron.log('error inside get images saga');
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* deleteImage({ imageId }) {
  try {
    const headers = yield createHeaders();
    const formData = new FormData();
    formData.append('imageId', imageId);
    yield call(fetchOnboarding, formData, headers, 'deleteImage');

  } catch (e) {
    reactotron.log('error inside delete image saga');
  }
}

function* setAsPrimary({ imageId }) {
  try {
    const headers = yield createHeaders();
    const formData = new FormData();
    formData.append('imageId', imageId);
    yield call(fetchOnboarding, formData, headers, 'setPrimaryImage');

  } catch (e) {
    reactotron.log('error inside requestSetPrimary image saga');
  }
}

function* createUser() {
  try {

    const { response, timeout } = yield race({
      response: call(fetchOnboarding, null, null, 'createUser'),
      timeout: call(delay, 15000),
    });
    // const response = yield call(fetchOnboarding, null, null, 'createUser');
    if (response) {
      if (response.success) {
        yield put(receiveAuthToken(response.authToken));
        yield requestUserStatus({ token: response.authToken });
      }
    } else if (timeout) {
      timeOutError({});
    }

  } catch (e) {
    reactotron.log('error inside createUser saga');
  }
}

function* getQuestions(): Generator<*, void, *> {
  try {
    yield put(setOnboarding({ isLoading: true }));
    const headers = yield createHeaders();
    const questions = yield call(fetchOnboarding, null, headers, 'getQuestions');
    if (questions) {
      if (questions.success) {
        yield put(setOnboarding({ questions }));
        if (questions.basicQuestions) {
          const { basicQuestions } = questions;
          const selectedPickers = {};
          const keys = Object.keys(basicQuestions);
          yield keys.forEach((key) => {
            if (basicQuestions[key].displayFormat === 'dropdown') {
              const questionId = basicQuestions[key].questionId;
              const answerId = basicQuestions[key].answers[0].answerId;
              selectedPickers[questionId] = answerId;
            }
          });
          yield put(setOnboarding({ selectedPickers }));
        }
      }
    }
  } catch (e) {
    reactotron.log('error inside get questions saga');
  }
  yield put(setOnboarding({ isLoading: false }));
}

function* saveAnswerRequest({ questionId, answerId, answer }:
  SaveAnswerRequestAction): Generator<*, void, *> {
  try {
    const headers = yield createHeaders();
    const formData = new FormData();
    formData.append('questionId', questionId);
    formData.append('answerId', answerId);

    yield put(saveAnswer({ questionId, answerId, answer }));
    yield call(fetchOnboarding, formData, headers, 'saveAnswer');

    yield checkIfQuestionsLeft();
  } catch (e) {
    reactotron.log('error inside save answer saga');
  }
}

function* skipAnswerRequest({ questionId }:
  SkipAnswerRequestAction): Generator<*, void, *> {
  try {
    yield put(skipAnswer({ questionId }));
    yield checkIfQuestionsLeft();
  } catch (e) {
    reactotron.log('error inside save answer saga');
  }
}

function* checkIfUnunsweredLeft(): Generator<*, void, *> {
  try {
    const basicQuestions = yield select(state => state.onboarding.questions.basicQuestions);
    const keysQuestions = Object.keys(basicQuestions);
    const next = yield keysQuestions.find(key => !basicQuestions[key].isAnswered);
    if (!next) {
      reactotron.log('all answered');
      yield put(toggleQuestionsAnswered({ userHasUnansweredQuestions: false }));
      const steps = yield createStepsCopy();
      const newSteps = {
        ...steps, profile: { ...steps.profile, complete: true },
      };
      yield put(setProfiles({ 'steps': newSteps }));
      yield checkSteps();
    }
    if (next) {

      reactotron.log('not all answered');
      yield put(returnToSkipped());
      yield put(toggleQuestionsAnswered({ userHasUnansweredQuestions: true }));
    }
  } catch (e) {
    reactotron.log('error inside checkIf ununswered saga');
  }
}

function* skipQuestionsStep(): Generator<*, void, *> {
  try {
    const steps = yield createStepsCopy();
    const newSteps = {
      ...steps, profile: { ...steps.profile, complete: true },
    };
    yield put(setProfiles({ 'steps': newSteps }));
    yield checkSteps();
  } catch (e) {
    reactotron.log('error inside skipQuestionsStep saga');
  }
}

function getFB(accessToken) {
  return new Promise((resolve) => {
    const graphRequest = new GraphRequest('/me', {
      accessToken,
      parameters: {
        fields: {
          string: 'albums',
        },
      },
    }, (error, result) => {
      if (error) {
        throw error;
      } else if (result) {
        if (result.albums) {
          if (result.albums.data) {
            const { data: albums } = result.albums;
            const album = albums.find(album => album.name === 'Profile Pictures');
            resolve(album.id);
            return;
          }
        }
      }
      throw new Error('Could not find FB albums');
    });
    new GraphRequestManager().addRequest(graphRequest).start();
  });
}

function* getFacebookPhotos() {
  try {
    const accessToken = yield select(state => state.login.fbAccessToken);
    if (accessToken) {
      let albumId = null;
      albumId = yield call(getFB, accessToken);
      if (albumId) {
        const { response, timeout } = yield race({
          response: call(fetch, getFBPhotosUrl(albumId, accessToken)),
          timeout: call(delay, 15000),
        });

        if (response) {
          const photos = yield call([response, 'json']);
          if (photos) {
            if (photos.data) {
              yield put(setOnboarding({ fbPhotos: photos.data }));
            }
          }
          navigation.navigate(screens.fbPhotos);
        } else if (timeout) {
          timeOutError({});
        }
      } else {
        reactotron.log('NO ALBUM ID FOUND');
      }
    } else {
      reactotron.log('NO ACCESS TOKEN FACEBOOK');
    }
  } catch (e) {
    reactotron.log('error at get facebookphotos');
  }
}

function* checkIfQuestionsLeft() {
  const basicQuestions = yield select(state => state.onboarding.questions.basicQuestions);
  const keysQuestions = Object.keys(basicQuestions);
  const next = yield keysQuestions.find(key => !basicQuestions[key].isAnswered
  && !basicQuestions[key].skipped);
  if (!next) {
    yield put(toggleQuestionsAnswered({ userHasUnansweredQuestions: false }));
  }
  if (next) {
    yield put(toggleQuestionsAnswered({ userHasUnansweredQuestions: true }));
  }
}

export const onboarding = [
  takeLatest(REQUEST_LOCATIONS, getLocations),
  takeLatest(CREATE_USER, createUser),
  takeLatest(SEND_BASIC, sendBasicData),
  takeLatest(SEND_EMAIL, sendEmailData),
  takeLatest(SEND_SEEKING, sendSeekingData),
  takeLatest(SEND_LOCATION, sendLocationData),
  takeLatest(SEND_PHOTO, sendPhotoData),
  takeLatest(SEND_VIDEO, sendVideoData),
  takeLatest(GET_IMAGES, getImages),
  takeLatest(DELETE_IMAGE, deleteImage),
  takeLatest(SET_AS_PRIMARY, setAsPrimary),
  takeLatest(COMPLETE_WITH_PHOTOS, completeWithPhotos),
  takeLatest(PASTING_DETECTED, sendPastingDetected),
  takeLatest(SEND_ABOUT, sendAboutData),
  takeLatest(SEND_PASSWORD, sendPasswordData),
  takeLatest(SKIP_VIDEO_STEP, skipVideoStep),
  takeLatest(GET_QUESTIONS, getQuestions),
  takeLatest(SAVE_ANSWER_REQUEST, saveAnswerRequest),
  takeLatest(SKIP_ANSWER_REQUEST, skipAnswerRequest),
  takeLatest(SKIP_QUESTIONS_STEP, skipQuestionsStep),
  takeLatest(CHECK_IF_UNANSWERED_LEFT, checkIfUnunsweredLeft),
  takeLatest(REQUEST_USER_STATUS, requestUserStatus),
  takeLatest(GET_FACEBOOK_PHOTOS, getFacebookPhotos),
  takeLatest(SEND_PHOTO_FACEBOOK, sendPhotoFacebook),
];
