// @flow

import { StyleSheet } from 'react-native';

import { colors } from '../../global';

export default StyleSheet.create({
  headerText: {
    color: colors.white,
    fontSize: 35,
    fontWeight: '500',
  },
  subHeaderText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
  signUpButton: {
    width: 220,
    height: 44,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    color: colors.white,
    fontSize: 14,
  },
  gradientWrapper: {
    borderRadius: 4,
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: colors.signUpFacebook,
  },
  emailPhoneButton: {
    backgroundColor: colors.signUpPhoneEmail,
  },
});
