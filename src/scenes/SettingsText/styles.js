// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, constants } from '../../global';

const { height, width } = Dimensions.get('window');

const imageDiameter = 40;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.backgroundGrey,
  },
  icon: {
    height: imageDiameter,
    width: imageDiameter,
    borderRadius: imageDiameter / 2,
  },
  formViewContainer: {
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  modalStyle: {
    flexDirection: 'column',
    width: 150,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    borderRadius: 4,
    position: 'absolute',
    top: constants.barHeight + 20,
    right: 0,
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
  listElement: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.borderTop,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
  },
  lastElement: {
    borderBottomWidth: 0,
  },
  plainText: {
    flex: 1,
    marginLeft: 10,
  },
  scrollViewContainer: {
    paddingTop: 10,
    paddingBottom: 200,
  },
  headerText: {
    marginLeft: 20,
    fontSize: 20,
  },
  header: {
    padding: 10,
    height: constants.barHeight,
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.backgroundGrey,
    borderBottomColor: colors.gray,
  },
  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  url: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urlText: {
    color: colors.blueBorder,
    fontWeight: 'bold',
  },
});
