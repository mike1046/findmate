export const REQUEST_USERS = 'REQUEST_USERS';
export const ADD_USERS = 'ADD_USERS';
export const ADD_USER_IDS = 'ADD_USER_IDS';
export const CLEAR_USERS = 'CLEAR_USERS';

export const requestUsers = () => ({ type: REQUEST_USERS });
export const addUsers = users => ({ type: ADD_USERS, users });
export const addUsersIds = userIds => ({ type: ADD_USER_IDS, userIds });
export const clearUsers = () => ({ type: CLEAR_USERS });

export const SET_REFRESHING = 'SET_REFRESHING';

export const setRefreshing = refreshing => ({ type: SET_REFRESHING, refreshing });

export const SET_USERS = 'SET_USERS';

export const setUsers = payload => ({
  type: SET_USERS,
  payload,
});
