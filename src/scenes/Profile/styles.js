// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native';
import { constants, colors } from '../../global';

const { width } = Dimensions.get('window');

const cirleD = 16;
const animatedViewRadius = 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  closeButton: {
    width: constants.barHeight,
    height: constants.barHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontSize: 75,
    fontFamily: 'Quicksand-Regular',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    height: constants.barHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.backgroundGrey,
    borderBottomColor: colors.gray,
  },
  bottomTab: {
    flexDirection: 'row',
    height: constants.barHeight,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  activeTabText: {
    color: colors.profileActiveBlue,
  },
  tabText: {
    fontWeight: '500',
  },
  marginLeft: {
    marginLeft: -60,
  },
  bottomText: {
    fontSize: 12,
    margin: 4,
  },
  progressContainer: {
    flexDirection: 'row',
  },
  roundIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  scrollViewContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  image: {
    height: width,
    width,
  },
  swiper: {
    height: width,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineStatusContainer: {
    alignItems: 'center',
    width: 80,
  },
  onlineCircle: {
    backgroundColor: 'red',
    height: cirleD,
    width: cirleD,
    borderRadius: cirleD / 2,
    marginBottom: 4,
  },
  online: {
    backgroundColor: colors.online,
  },
  offline: {
    backgroundColor: colors.offline,
  },
  notification: {
    position: 'absolute',
    width: animatedViewRadius * 2,
    height: animatedViewRadius * 2,
    borderRadius: animatedViewRadius,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    left: width / 2 - animatedViewRadius,
    top: width / 2,
  },
  notificationText: {
    marginTop: 10,
  },
  nickNameText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  elevationLow: {
    borderTopWidth: 0,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  sectionListHeader: {
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  signOutText: {
    color: colors.profileActiveBlue,
  },
  plainText: {
    flex: 1,
    marginLeft: 10,
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
  notificationLine: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  notificationName: {
    width: '40%',
  },
  notificationItemWrapper: {
    width: 51,
    marginLeft: 35,
    alignItems: 'center',
  },
  separator: {
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colors.borderTop,
  },
  privacyUpperMessage: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  textRightToSwitcher: {
    flex: 1,
    marginLeft: 30,
  },
  textCircle: {
    alignSelf: 'center',
    fontSize: 12,
  },

  boldText: {
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 10,
  },

  deleteAccountText: {
    color: colors.gray1,
    marginLeft: 10,
    marginTop: 10,
  },

});
