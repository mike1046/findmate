// @flow

import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../../global';

const { height, width } = Dimensions.get('window');
const imageSize = width * 0.8 / 3;
const uploadButtonDiameter = 70;

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
  },
  modalContainer: {},
  modalStyle: {
    flexDirection: 'column',
    width: 200,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    borderRadius: 4,
    position: 'absolute',
    top: height / 2.5,
  },
  imageMenuItem: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 10,
  },
  uploading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.rgbaWhite,
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    width: imageSize - 5,
    height: imageSize - 5,
    borderRadius: 4,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayText: {
    marginVertical: 10,
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
