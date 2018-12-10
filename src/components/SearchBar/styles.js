// @flow

import { StyleSheet, Platform } from 'react-native';
import { colors, constants } from '../../global';

export default StyleSheet.create({
  container: {
    height: constants.barHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  elevationLow: {
    borderTopWidth: 0,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  barsButton: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    width: constants.barHeight,
    height: constants.barHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: colors.bottomMenuInactive,
  },
  buttonActiveText: {
    color: colors.blue1,
  },
});
