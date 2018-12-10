// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';

import { PersistGate } from 'redux-persist/es/integration/react';

import { store, persistor } from './redux/store';

import { App } from './App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader requires', 'Setting a timer']);

export const WrappedApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
