import { ADD_USERS, ADD_USER_IDS, CLEAR_USERS, SET_REFRESHING, SET_USERS } from '../actions/users';
import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  users: {},
  userIds: [],
  refreshing: false,
  noUsersMessage: null,
  portraits: {},
};

export default makeReducer(initialState, SET_USERS, (state = initialState,
  { type, users, refreshing, userIds }) => {
  switch (type) {
    case ADD_USERS:
      return {
        ...state,
        users: { ...state.users, ...users },
      };
    case ADD_USER_IDS: {
      const uniqueIds = [...new Set([...state.userIds, ...userIds])];
      return {
        ...state,
        userIds: uniqueIds,
      };
    }
    case CLEAR_USERS:
      return initialState;
    case SET_REFRESHING:
      return {
        ...state,
        refreshing,
      };
    default:
      return state;
  }
});
