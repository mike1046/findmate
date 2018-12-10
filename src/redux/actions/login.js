export const REQUEST_TOKEN_EMAIL = 'REQUEST_TOKEN_EMAIL';
export const REQUEST_TOKEN_TOKEN = 'REQUEST_TOKEN_TOKEN';
export const RECEIVE_AUTH_TOKEN = 'RECEIVE_AUTH_TOKEN';
export const RECEIVE_USER_ID_AND_KEY = 'RECEIVE_USER_ID_AND_KEY';
export const LOGOUT = 'LOGOUT';
export const SET_LOGIN = 'SET_LOGIN';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGIN_KIT = 'LOGIN_KIT';

export const requestTokenEmail = (email, password) => ({
  type: REQUEST_TOKEN_EMAIL,
  email,
  password });

export const requestTokenWithToken = (accessToken, typeToken) => ({
  type: REQUEST_TOKEN_TOKEN,
  accessToken,
  typeToken,
});

export const receiveAuthToken = token => ({ type: RECEIVE_AUTH_TOKEN, token });
export const receiveUserIdAndKey = (userId, pusherKey) => ({
  type: RECEIVE_USER_ID_AND_KEY,
  userId,
  pusherKey });
export const logOut = () => ({ type: LOGOUT });

export const setLogin = payload => ({
  type: SET_LOGIN,
  payload,
});

export const loginFacebook = () => ({
  type: LOGIN_FACEBOOK,
});

export const loginKit = () => ({
  type: LOGIN_KIT,
});
