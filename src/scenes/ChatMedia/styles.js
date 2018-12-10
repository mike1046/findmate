// @flow

import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../global';

const { width } = Dimensions.get('window');

const itemMediaWidth = width * 0.333;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyListText: {
    alignSelf: 'center',
    marginTop: '20%',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  emptyListView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyListComponent: {
    width: '33%',
  },
  mediaLibraryItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: itemMediaWidth,
    height: itemMediaWidth,
  },
  imageItem: {
    width: itemMediaWidth * 0.8,
    height: itemMediaWidth * 0.8,
  },
  closeButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.loginButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.white,
  },
});
