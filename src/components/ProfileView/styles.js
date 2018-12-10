// @flow

import { StyleSheet, Platform, Dimensions } from 'react-native';

import colors from '../../global/colors';

const { width } = Dimensions.get('window');

const imageDiameter = width / 3 - 20;

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.33%',
    height: imageDiameter + 50,
  },
  image: {
    borderRadius: imageDiameter / 2,
    width: imageDiameter,
    height: imageDiameter,
  },
  elevationLow: {
    backgroundColor: 'white',
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
  countryText: {
    fontSize: 10,
    alignSelf: 'center',
    color: 'gray',
    fontFamily: 'Quicksand-Regular',
  },
  lastSeen: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    marginTop: 5,
  },
  cityText: {
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 7,
    marginHorizontal: 20,
    fontFamily: 'Quicksand-Regular',
  },
});
