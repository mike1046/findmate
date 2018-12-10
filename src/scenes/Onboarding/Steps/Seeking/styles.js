// @flow

import { StyleSheet, Platform } from 'react-native';

import { colors } from '../../../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeaderText: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 10,
  },
  cardContent: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 400,
  },
  grayText: {
    marginBottom: 10,
    color: colors.gray1,
    fontSize: 10,
    // borderColor: 'red',
    // borderWidth: 2,

  },
  multiSliderSelected: {
    backgroundColor: colors.minimumTrackTintColor,
  },
  multiSliderWrapper: {
    alignSelf: 'center',
  },
  warning: {
    color: colors.red,
    marginBottom: 10,
  },
  markerStyle: {
    ...Platform.select({
      android: {
        backgroundColor: colors.thumbTintColorAndroid,
      },
    }),
  },
});
