// @flow

import { StyleSheet } from 'react-native';

import { colors } from '../../../../global';

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
    height: 450,
    paddingVertical: 10,
  },
  warning: {
    color: colors.red,
  },
  textInputWrapper: {
    // alignSelf: 'center',
    // height: constants.loginButtonHeight,
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
  },

  textInput: {
    padding: 0,
    marginLeft: 15,
    color: colors.gray,
    fontFamily: 'Quicksand-Regular',
  },
  textAlignVertical: {
    textAlignVertical: 'top',
  },
  subHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  smallSubHeader: {
    color: colors.gray,
    fontSize: 10,
  },
  grayText: {
    marginVertical: 5,
    color: colors.gray,
    fontSize: 10,
  },
  heightContainer: {
    height: 200,
  },
  remainingCharacters: {
    color: colors.gray,
    fontSize: 10,
    marginVertical: 5,
  },
});
