import type { SaveAnswer, SkipAnswer, SaveAnswerRequest, SkipAnswerRequest,
  ToggleQuestionsAnswered, ChangeAnswer } from '../types/onboarding';

export const SET_ONBOARDING = 'SET_ONBOARDING';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';

export const CREATE_USER = 'CREATE_USER';

export const SEND_BASIC = 'SEND_BASIC';

export const SEND_SEEKING = 'SEND_SEEKING';

export const SEND_LOCATION = 'SEND_LOCATION';

export const SEND_PHOTO = 'SEND_PHOTO';

export const SEND_VIDEO = 'SEND_VIDEO';

export const ADD_UPLOADING_PHOTO = 'ADD_UPLOADING_PHOTO';

export const DELETE_PHOTO_FROM_UPLOAD = 'DELETE_PHOTO_FROM_UPLOAD';

export const ADD_IMAGE_ID = 'ADD_IMAGE_ID';

export const GET_IMAGES = 'GET_IMAGES';

export const ADD_IMAGE_TO_PRIVATE = 'ADD_IMAGE_TO_PRIVATE';

export const ADD_IMAGE_TO_APPROVED = 'ADD_IMAGE_TO_APPROVED';

export const DELETE_IMAGE = 'DELETE_IMAGE';

export const SET_AS_PRIMARY = 'SET_AS_PRIMARY';

export const COMPLETE_WITH_PHOTOS = 'COMPLETE_WITH_PHOTOS';

export const SEND_EMAIL = 'SEND_EMAIL';

export const PASTING_DETECTED = 'PASTING_DETECTED';

export const SEND_ABOUT = 'SEND_ABOUT';

export const SEND_PASSWORD = 'SEND_PASSWORD';

export const SKIP_VIDEO_STEP = 'SKIP_VIDEO_STEP';

export const GET_QUESTIONS = 'GET_QUESTIONS';

export const SAVE_ANSWER = 'SAVE_ANSWER';

export const SAVE_ANSWER_REQUEST = 'SAVE_ANSWER_REQUEST';

export const SKIP_ANSWER = 'SKIP_ANSWER';

export const SKIP_ANSWER_REQUEST = 'SKIP_ANSWER_REQUEST';

export const CHANGE_ANSWER = 'CHANGE_ANSWER';

export const TOGGLE_QUESTIONS_ANSWERED = 'TOGGLE_QUESTIONS_ANSWERED';

export const RETURN_TO_SKIPPED = 'RETURN_TO_SKIPPED';

export const SKIP_QUESTIONS_STEP = 'SKIP_QUESTIONS_STEP';

export const CHECK_IF_UNANSWERED_LEFT = 'CHECK_IF_UNANSWERED_LEFT';

export const REQUEST_USER_STATUS = 'REQUEST_USER_STATUS';

export const GET_FACEBOOK_PHOTOS = 'GET_FACEBOOK_PHOTOS';

export const SEND_PHOTO_FACEBOOK = 'SEND_PHOTO_FACEBOOK';

export const setOnboarding = payload => ({
  type: SET_ONBOARDING,
  payload,
});

export const requestLocations = (locationsType, search) => (
  {
    type: REQUEST_LOCATIONS,
    locationsType,
    search,
  }
);

export const createUser = () => (
  {
    type: CREATE_USER,
  }
);

export const sendBasic = (gender, dateOfBirth) => ({
  type: SEND_BASIC,
  gender,
  dateOfBirth,
});

export const sendSeeking = (seeking, ageFrom, ageTo) => ({
  type: SEND_SEEKING,
  seeking,
  ageFrom,
  ageTo,
});

export const sendLocation = (locationId, location) => ({
  type: SEND_LOCATION,
  locationId,
  location,
});

export const sendPhoto = content => ({
  type: SEND_PHOTO,
  content,
});

export const sendPhotoFacebook = content => ({
  type: SEND_PHOTO_FACEBOOK,
  content,
});

export const sendVideo = content => ({
  type: SEND_VIDEO,
  content,
});

export const addUploadingPhoto = content => ({
  type: ADD_UPLOADING_PHOTO,
  content,
});

export const deletePhotoFromUpload = content => ({
  type: DELETE_PHOTO_FROM_UPLOAD,
  content,
});

export const addImageId = (content, imageId) => ({
  type: ADD_IMAGE_ID,
  content,
  imageId,
});

export const getImages = () => ({
  type: GET_IMAGES,
});

export const addImageToPrivate = content => ({
  type: ADD_IMAGE_TO_PRIVATE,
  content,
});

export const addImageToApproved = content => ({
  type: ADD_IMAGE_TO_APPROVED,
  content,
});

export const deleteImage = imageId => ({
  type: DELETE_IMAGE,
  imageId,
});

export const setAsPrimary = imageId => ({
  type: SET_AS_PRIMARY,
  imageId,
});

export const completeWithPhotos = () => ({
  type: COMPLETE_WITH_PHOTOS,
});

export const sendEmail = email => ({
  type: SEND_EMAIL,
  email,
});

export const sendPassword = password => ({
  type: SEND_PASSWORD,
  password,
});

export const pastingDetected = () => ({
  type: PASTING_DETECTED,
});

export const sendAbout = (headline, description, slug) => ({
  type: SEND_ABOUT,
  headline,
  description,
  slug,
});

export const skipVideoStep = () => ({
  type: SKIP_VIDEO_STEP,
});

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const saveAnswer: SaveAnswer = payload => ({
  type: SAVE_ANSWER,
  ...payload,
});

export const saveAnswerRequest: SaveAnswerRequest = payload => ({
  type: SAVE_ANSWER_REQUEST,
  ...payload,
});

export const skipAnswer: SkipAnswer = payload => ({
  type: SKIP_ANSWER,
  ...payload,
});

export const skipAnswerRequest: SkipAnswerRequest = payload => ({
  type: SKIP_ANSWER_REQUEST,
  ...payload,
});

export const changeAnswer: ChangeAnswer = payload => ({
  type: CHANGE_ANSWER,
  ...payload,
});

export const toggleQuestionsAnswered: ToggleQuestionsAnswered = payload => ({
  type: TOGGLE_QUESTIONS_ANSWERED,
  ...payload,
});

export const returnToSkipped = () => ({
  type: RETURN_TO_SKIPPED,
});

export const skipQuestionsStep = () => ({
  type: SKIP_QUESTIONS_STEP,
});

export const checkIfUnunsweredLeft = () => ({
  type: CHECK_IF_UNANSWERED_LEFT,
});

export const requestUserStatus = () => ({
  type: REQUEST_USER_STATUS,
});

export const getFacebookPhotos = () => ({
  type: GET_FACEBOOK_PHOTOS,
});
