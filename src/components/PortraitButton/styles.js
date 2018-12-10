// @flow

import { StyleSheet, Platform } from 'react-native';

import { colors, constants } from '../../global';

const imageDiameter = 40;

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: imageDiameter,
    height: imageDiameter,
    marginRight: (constants.barHeight - imageDiameter) / 2,
  },
  image: {
    borderRadius: imageDiameter / 2,
    width: imageDiameter,
    height: imageDiameter,
  },
  elevationLow: {
    // backgroundColor: 'white',
    borderRadius: imageDiameter / 2,
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
});
