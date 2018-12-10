// @flow

import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../global/colors';

const { width } = Dimensions.get('window');
const itemMediaWidth = width * 0.333;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  uploadContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: colors.lightestGray,
    borderRadius: 4,
    width: width / 4,
    height: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sentNotification: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.rgbaWhite,
  },
  sentIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentText: {
    color: colors.white,
  },
  headerText: {
    marginLeft: 10,
    color: colors.white,
    fontWeight: '200',
    fontSize: 24,
  },
  tabsContainer: {
    height: 50,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderTop,
  },
  tabName: {
    color: colors.blueBorder,
  },
  activeTabName: {
    color: colors.black,
  },
  activeTab: {
    backgroundColor: colors.cardHeader,
    borderBottomWidth: 2,
    borderBottomColor: colors.blueBorder,
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
