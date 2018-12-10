import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import onboarding from './onboarding';
import profiles from './profiles';
import settings from './settings';
import message from './message';
import filter from './filter';
import login from './login';
import cache from './cache';
import users from './users';
import page from './page';
import sort from './sort';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'sort',
    'filter',
    'login',
    'profiles',
    'onboarding',
  ],
};

const rootReducer = persistCombineReducers(persistConfig, {
  onboarding,
  profiles,
  settings,
  message,
  filter,
  cache,
  login,
  users,
  page,
  sort,
});

export default rootReducer;
