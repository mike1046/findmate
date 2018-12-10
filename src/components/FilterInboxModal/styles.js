// @flow

import { StyleSheet } from 'react-native';

import colors from '../../global/colors';

export default StyleSheet.create({
  modalStyle: {
    top: 140,
    width: 200,
    height: 200,
    borderColor: colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    borderRadius: 4,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  online: {
    backgroundColor: colors.online,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  item: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastItem: {
    height: 44,
  },
  text: {
    marginLeft: 10,
    fontFamily: 'Quicksand-Regular',
  },
  headerText: {
    fontWeight: 'bold',
  },
});
