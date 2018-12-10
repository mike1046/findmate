import { StyleSheet, Dimensions, Platform } from 'react-native';

import colors from '../../global/colors';
import constants from '../../global/constants';

const { width } = Dimensions.get('window');
const inputWidth = width * 0.9;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    // padding: 100,
  },
  modal: {
    alignItems: 'center',
    padding: 100,
  },
  headerText: {
    marginLeft: 10,
    color: colors.white,
    fontFamily: 'Quicksand-Regular',
    fontWeight: '200',
    fontSize: 24,
  },
  closeButton: {
    marginRight: 10,
  },
  headerStyle: {
    height: constants.barHeight,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.searchHeaderBackground,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  modalStyle: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    width,
  },
  buttonsPanel: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderTop,
    paddingHorizontal: 30,
    height: constants.barHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetButtonText: {
    color: colors.resetButton,
    fontFamily: 'Quicksand-Regular',
  },
  updateButtonText: {
    color: colors.white,
    fontFamily: 'Quicksand-Regular',
  },
  updateButton: {
    width: 80,
    height: 22,
    borderRadius: 5,
    backgroundColor: colors.updateButtonBackground,
    alignItems: 'center',
  },
  containerLocations: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginVertical: 10,
    color: colors.black,
    fontFamily: 'Quicksand-Regular',
  },
  headerStyleLocations: {
    color: colors.black,
    fontSize: 15,
    marginVertical: 10,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular',
  },
  chosenLocationContainer: {
    justifyContent: 'center',
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    marginTop: 5,
    borderRadius: 3,
    marginLeft: 5,
    flexDirection: 'row',
  },
  textInput: {
    padding: 0,
    width: 130,
    marginTop: 5,
    marginLeft: 15,
    fontFamily: 'Quicksand-Regular',
  },
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderRadius: 5,
    width: inputWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  activeBorder: {
    borderColor: colors.blueBorder,
  },
  slidersContainer: {
    width: inputWidth,
  },
  mapView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textItemAtList: {
    fontFamily: 'Quicksand-Regular',
  },
  chosenLocationText: {
    margin: 4,
    fontFamily: 'Quicksand-Regular',
    alignSelf: 'center',
  },
  deleteLocationButton: {
    marginRight: 4,
    alignSelf: 'center',
  },
  sectionListContainer: {
    position: 'absolute',
    maxHeight: 200,
    left: 0,
    top: 0,
  },
  itemAtSectionList: {
    justifyContent: 'center',
    height: 30,
    backgroundColor: colors.white,
    width: inputWidth,
    marginLeft: 10,
  },
  sectionListHeader: {
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Regular',
  },
  sectionList: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: colors.blueBorder,
  },
});
