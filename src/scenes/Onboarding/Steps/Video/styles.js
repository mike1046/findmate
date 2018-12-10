// @flow

import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../../global';

const uploadButtonDiameter = 100;
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeVideoButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  recordText: {
    fontSize: 14,
    // borderColor: 'green',
    // borderWidth: 2,
  },

  capture: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: 200,
    height: 40,
    top: height * 0.8,
    left: width / 2 - 100,
  },
  recordingCapture: {
    backgroundColor: colors.white,
  },
  modalContainer: {},
  subHeaderText: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 10,
  },
  buttonsContainer: {
    // borderWidth: 2,
    // borderColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    height: height * 0.7,
  },
  grayText: {
    marginBottom: 10,
    color: colors.gray1,
    fontSize: 10,
    alignSelf: 'center',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  uploadButton: {
    // marginTop: 20,
    marginBottom: 10,
    margin: 10,
    width: uploadButtonDiameter,
    height: uploadButtonDiameter,
    borderRadius: uploadButtonDiameter / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sectionListHeader: {
    fontWeight: 'bold',
  },
});
