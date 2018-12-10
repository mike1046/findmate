import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

import reducers from '../reducers';

let sagaMiddleware;
let configuredStore;

if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default;
  const sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  configuredStore = Reactotron.createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
} else {
  sagaMiddleware = createSagaMiddleware();
  configuredStore = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
}

export const store = configuredStore;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
