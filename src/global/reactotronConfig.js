// @flow

if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default;
  const { trackGlobalErrors, openInEditor } = require('reactotron-react-native');
  const { reactotronRedux } = require('reactotron-redux');
  const sagaPlugin = require('reactotron-redux-saga');
  Reactotron
    .configure({
      name: 'MyApp',
      host: '192.168.88.32',
    })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(openInEditor())
    .connect();
  global.reactotron = Reactotron;
} else {
  global.reactotron = {
    log: () => {},
    error: () => {},
  };
}
