// @flow

import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../global/colors';

const { width } = Dimensions.get('window');
const inputWidth = width * 0.9;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  headerText: {
    marginLeft: 10,
    color: colors.white,
    fontWeight: '200',
    fontSize: 24,
  },
  closeButton: {
    marginRight: 10,
  },
  text: {

  },
  activeBorder: {
    borderColor: colors.blueBorder,
  },
  inputWrapper: {
    alignItems: 'center',
  },

  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderRadius: 5,
    width: inputWidth,
    paddingBottom: 5,
    height: 100,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: width * 0.05,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: 140,
  },
  shareText: {
    color: colors.white,
    marginLeft: 7,
  },
  reportText: {
    color: colors.resetButton,
  },
  submitReport: {
    backgroundColor: colors.updateButtonBackground,
    borderRadius: 8,
    justifyContent: 'center',
  },

  subHeaderText: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
  },
  tellUsMoreText: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 12,
  },

  plainText: {
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
  textInput: {
    padding: 0,
    flex: 1,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: 'Quicksand-Regular',
  },
});
