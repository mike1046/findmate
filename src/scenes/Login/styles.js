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
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formViewContainer: {
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.8,
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
  loginButtonsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    width: '100%',

    marginVertical: 40,
  },
  headerText: {
    fontFamily: 'Quicksand-Regular',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 60,
  },
  textInput: {
    padding: 0,
    fontFamily: 'Quicksand-Regular',
    margin: 5,
  },
  textInputWrapper: {
    marginBottom: 8,
    height: constants.loginButtonHeight,
    borderColor: colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    width: width * 0.7,
  },
  createNewAccountContainer: {
    height: constants.barHeight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
  },

});
