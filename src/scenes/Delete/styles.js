// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native';

import colors from '../../global/colors';
import constants from '../../global/constants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    justifyContent: 'center',
  },
  activeBorder: {
    borderColor: colors.blueBorder,
  },
  formViewContainer: {
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  textInput: {
    padding: 0,
    fontFamily: 'Quicksand-Regular',
    margin: 5,
  },
  textInputWrapper: {
    marginTop: 20,
    marginBottom: 8,

    alignSelf: 'center',
    height: constants.loginButtonHeight,
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    width: '100%',
  },
  smallText: {
    fontSize: 12,
    color: colors.grayText,
  },
  listElement: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.borderTop,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
  },
  lastElement: {
    borderBottomWidth: 0,
  },
  plainText: {
    flex: 1,
    marginLeft: 10,
  },
  reasonsContainer: {
    borderColor: colors.borderTop,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,

    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: colors.lightestGray,
  },
  continueButton: {
    backgroundColor: colors.updateButtonBackground,
  },

  button: {
    justifyContent: 'center',
    width: 100,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteAccountButton: {
    width: 200,
  },
  continueText: {
    color: colors.white,
  },
  confirmationMessage: {
    marginVertical: 20,
  },

});
