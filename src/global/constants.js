// @flow

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const constants = {
  barHeight: 60,
  loginButtonHeight: 30,
  width,
  height,
};

export default constants;
