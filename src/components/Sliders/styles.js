// @flow

import { StyleSheet, Platform } from 'react-native';

import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerStyle: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular',
  },
  slider: {
    width: 310,
  },
  multiSliderSelected: {
    backgroundColor: colors.minimumTrackTintColor,
  },
  markerStyle: {
    ...Platform.select({
      android: {
        backgroundColor: colors.thumbTintColorAndroid,
      },
    }),
  },
});
