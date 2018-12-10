// @flow

import { StyleSheet, Platform } from 'react-native';

import { constants, colors } from '../../global';

const PROGRESS_BAR_WIDTH = constants.width - 20;
const horizontalOffset = 8;
const innerOffset = 12;
const buttonsOffset = 8;
const headerHeight = 50;

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25);',
  },
  contentContainer: {
    position: 'absolute',
    left: horizontalOffset,
    right: horizontalOffset,
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  closeButton: {
    width: headerHeight,
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 1,
    backgroundColor: colors.gray1,
  },
  customContentContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: colors.white,
    borderRadius: 13,
    paddingTop: innerOffset,
    paddingLeft: innerOffset,
    paddingRight: innerOffset,
    paddingBottom: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: headerHeight,
    // borderColor: 'green',
    // borderWidth: 3,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
    color: colors.black,
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.24,
    color: colors.black,
  },
  message: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.24,
    color: colors.black,
  },
  avatar: {
    marginLeft: innerOffset,
  },
  button: {
    flex: 1,
    marginHorizontal: buttonsOffset,
    backgroundColor: colors.blue1,
    borderRadius: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontSize: 13,
  },
});
