export const ADD_CURRENT_USER_PROFILE = 'ADD_CURRENT_USER_PROFILE';
export const ADD_CURRENT_USER_PROFILE_META = 'ADD_CURRENT_USER_PROFILE_META';
export const ADD_VIEWED_USER_META = 'ADD_VIEWED_USER_META';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const REQUEST_CHANGE_PROFILE_SETTINGS = 'REQUEST_CHANGE_PROFILE_SETTINGS';
export const REQUEST_INTERESTS = 'REQUEST_INTERESTS';
export const SUBMIT_REPORT = 'SUBMIT_REPORT';
export const REQUEST_PASSWORD_CONFIRM = 'REQUEST_PASSWORD_CONFIRM';
export const REQUEST_DELETE_ACCOUNT = 'REQUEST_DELETE_ACCOUNT';
export const REQUEST_FETCH_BLOB_IMAGES = 'REQUEST_FETCH_BLOB_IMAGES';

export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CLEAR_ANOTHER_PROFILE = 'CLEAR_ANOTHER_PROFILE';

export const SET_PROFILES = 'SET_PROFILES';

export const setProfiles = payload => ({
  type: SET_PROFILES,
  payload,
});

export const addCurrentUserProfile = currentUser => ({ type: ADD_CURRENT_USER_PROFILE,
  currentUser });
export const addCurrentUserProfileMeta = currentUserMeta => ({ type: ADD_CURRENT_USER_PROFILE_META,
  currentUserMeta });
export const addViewedUserMeta = viewedUserMeta => ({ type: ADD_VIEWED_USER_META,
  viewedUserMeta });
export const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });
export const requestInterests = () => ({ type: REQUEST_INTERESTS });

export const requestChangeProfileSettings = (userId, enable, settingsType) => ({
  type: REQUEST_CHANGE_PROFILE_SETTINGS,
  userId,
  enable,
  settingsType,
});

export const requestDeleteAccount = (reasonId, reasonText) => ({
  type: REQUEST_DELETE_ACCOUNT,
  reasonId,
  reasonText,
});

export const submitReport = (userId, reasonId, reportText) => ({
  type: SUBMIT_REPORT,
  userId,
  reasonId,
  reportText,
});

export const requestPasswordConfirm = password => ({ type: REQUEST_PASSWORD_CONFIRM, password });

export const clearProfile = () => ({ type: CLEAR_PROFILE });
export const clearAnotherProfile = () => ({ type: CLEAR_ANOTHER_PROFILE });

export const REQUEST_PROFILE_META = 'REQUEST_PROFILE_META';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';

export const requestProfile = userId => ({
  type: REQUEST_PROFILE,
  userId });

export const requestProfileMeta = (userId, profileType) => ({
  type: REQUEST_PROFILE_META,
  userId,
  profileType });

export const requestFetchBlobImages = images => ({
  type: REQUEST_FETCH_BLOB_IMAGES,
  images,
});
