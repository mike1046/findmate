// @flow

import { StyleSheet } from 'react-native';

import { colors } from '../../../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 200,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  grayText: {
    marginVertical: 5,
    color: colors.gray,
    fontSize: 10,
  },
  switcherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switcherText: {
    marginLeft: 10,
  },
});
