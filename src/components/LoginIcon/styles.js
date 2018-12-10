// @flow

import { StyleSheet, Platform } from 'react-native';

import colors from '../../global/colors';

const buttonDiameter = 50;

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.33%',
  },
  image: {
    borderRadius: buttonDiameter / 2,
    width: buttonDiameter,
    height: buttonDiameter,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // StyleSheet.hairlineWidth,
    borderColor: colors.lightGrey,
  },
  elevationLow: {
    backgroundColor: 'white',
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  nameText: {
    marginTop: 5,
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular',
  },
  cityText: {
    fontSize: 13,
    alignSelf: 'center',
    marginHorizontal: 20,
    fontFamily: 'Quicksand-Regular',
  },
});
