// @flow

import { StyleSheet, Dimensions } from 'react-native';

import { colors, constants } from '../../../../global';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContent: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 300,
    alignItems: 'center',
  },
  innerContainer: {

    alignItems: 'center',
  },
  question: {
    fontSize: 10,
    marginTop: 20,
  },

  city: {
    fontSize: 30,
    marginTop: 30,
  },
  country: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  noText: {
    color: colors.blue1,
    marginTop: 10,
    fontWeight: '400',
  },
  cityItem: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: colors.lightestGray,
  },
  textInput: {
    padding: 0,
    width: 200,
    marginTop: 5,
    marginLeft: 15,
    fontFamily: 'Quicksand-Regular',
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
  activeBorder: {
    borderColor: colors.blueBorder,
  },
});
