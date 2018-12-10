// @flow

import { StyleSheet, Platform } from 'react-native';

import colors from '../../global/colors';

const headerHeight = 40;

export default StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  margin: {
    marginHorizontal: 15,
    // marginVertical: 20,
  },
  elevationLow: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 1,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: headerHeight,
    backgroundColor: colors.cardHeader,
  },
  textButton: {
    fontFamily: 'Quicksand-Regular',
    color: colors.blue1,
    marginRight: 10,
    fontSize: 11,
  },
  headerText: {
    margin: 10,
  },
});
