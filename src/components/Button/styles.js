// @flow
import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../global/colors';
import constants from '../../global/constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: constants.loginButtonHeight,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: colors.loginButton,
    width: width * 0.8 - 20,
  },
  text: {
    color: colors.white,
    fontFamily: 'Quicksand-Regular',
    fontWeight: 'bold',
  },
});
