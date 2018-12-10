import { RECEIVE_AUTH_TOKEN, RECEIVE_USER_ID_AND_KEY, LOGOUT, SET_LOGIN } from '../actions/login';

import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  token: null,
  userId: null,
  pusherKey: null,
  fbAccessToken: null,
};

export default makeReducer(initialState, SET_LOGIN, (state = initialState, { type,
  token, userId, pusherKey }) => {
  switch (type) {
    case RECEIVE_AUTH_TOKEN:
      return {
        ...state,
        token,
      };
    case RECEIVE_USER_ID_AND_KEY:
      return {
        ...state,
        userId,
        pusherKey,
      };
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
});
