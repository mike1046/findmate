// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, constants } from '../../global';

const { height, width } = Dimensions.get('window');

const imageDiameter = 40;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalContainer: {
    flex: 1,
  },

  messageMenuContainer: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: colors.rgbaBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: 200,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  attachmentButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    marginLeft: 10,
    marginBottom: 10,
    height: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  icon: {
    height: imageDiameter,
    width: imageDiameter,
    borderRadius: imageDiameter / 2,
  },
  buttonHeader: {
    width: constants.barHeight,
    height: constants.barHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMessage: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  leftContainerVideo: {
    backgroundColor: '#f0f0f0',
  },
  rightContainerVideo: {
    backgroundColor: '#0084ff',
  },
  videoContainer: {
    minHeight: 100,
    width: 200,
    borderRadius: 15,
    paddingTop: 10,
  },
  videoWrapper: {
    minHeight: 170,
    borderRadius: 15,
  },
  imageWrapper: {
    minHeight: 163,
    minWidth: 200,
    resizeMode: 'contain',
    marginTop: 15,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  timeText: {
    fontSize: 10,
    color: colors.white,
    marginRight: 10,
    marginBottom: 7,
  },
  leftTimeText: {
    color: '#D1D1D1',
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
    width: 200,
    height: 44 * 4,
    borderColor: colors.modalBorder,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    borderRadius: 4,
    position: 'absolute',
    top: constants.barHeight + 20,
    right: constants.barHeight,
  },
  modalMenuItem: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIcon: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstModalMenuItem: {
    borderBottomColor: colors.modalBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  userInfo: {
    width: width - constants.barHeight * 3,
    height: constants.barHeight,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  ageCityText: {
    fontWeight: '400',
    fontSize: 11,
    color: colors.gray1,
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
    height: constants.barHeight,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.backgroundGrey,
    borderBottomColor: colors.gray,
  },
  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },
});
