// @flow

import { StyleSheet } from 'react-native';

import { colors, constants } from '../../../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 220,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  warning: {
    color: colors.red,
  },
  email: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  warningContainer: {
    minHeight: 15,
    justifyContent: 'center',
  },
  textInputWrapper: {
    alignSelf: 'center',
    height: constants.loginButtonHeight,
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    width: '100%',
  },
  activeBorder: {
    borderColor: colors.blueBorder,
  },

  loginWithPhoneButton: {
    color: colors.blue1,
    marginBottom: 10,
  },
  subHeader: {
    marginBottom: 10,
  },

  textInput: {
    padding: 0,
    marginTop: 5,
    marginLeft: 15,
    fontFamily: 'Quicksand-Regular',
  },

  grayText: {
    marginVertical: 5,
    color: colors.gray,
    fontSize: 10,
  },
});
