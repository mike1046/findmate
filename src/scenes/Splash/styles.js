// @flow

import { StyleSheet, Platform } from 'react-native';

import { colors } from '../../global';

const iconDiameter = 140;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  header: {
    marginTop: 10,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  elevationLow: {
    backgroundColor: 'white',
    borderRadius: iconDiameter / 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: iconDiameter,
    height: iconDiameter,
    borderRadius: iconDiameter / 2,
  },
  spinner: {
    marginTop: 40,
  },
});
