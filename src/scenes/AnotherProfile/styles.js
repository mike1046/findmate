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
  textProgressCircle: {
    alignSelf: 'center',
    fontSize: 12 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: width * 0.05,
  },
  buttonText: {
    color: colors.black,
    fontSize: 75,
    fontFamily: 'Quicksand-Regular',
  },
  header: {
    flexDirection: 'row',
    height: constants.barHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  isLoading: {
    fontSize: 20,
  },
  image: {
    height: width,
    width,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 90,
  },
  shareText: {
    color: colors.white,
    marginLeft: 7,
  },
  reportText: {
    color: colors.resetButton,
  },
  shareButton: {

    backgroundColor: colors.updateButtonBackground,
    borderRadius: 8,
  },
  sectionListHeader: {
    marginTop: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
});
