// @flow

import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../../../global/colors';

const { width } = Dimensions.get('window');
const itemMediaWidth = width * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
    color: colors.white,
    fontWeight: '200',
    fontSize: 24,
  },
  mediaLibraryItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: itemMediaWidth,
    height: itemMediaWidth,
  },
  closeButton: {
    marginRight: 10,
  },
  emptyListText: {
    alignSelf: 'center',
    marginTop: '20%',
  },
  emptyListView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyListComponent: {
    width: '33%',
  },
  imageItem: {
    width: itemMediaWidth * 0.8,
    height: itemMediaWidth * 0.8,
  },
});
