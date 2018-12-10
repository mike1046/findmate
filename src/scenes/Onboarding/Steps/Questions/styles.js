// @flow

import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../../global';

const uploadButtonDiameter = 100;
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    marginVertical: 20,
    alignSelf: 'center',

  },
  skip: {
    marginVertical: 10,
    color: colors.blue1,
    alignSelf: 'center',
  },
  pickerWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue1,
    borderRadius: 4,
    marginBottom: 20,
  },

  formItem: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray,
  },
  userAnswer: {
    flex: 1,
    fontSize: 10,
    color: colors.gray,
  },
  questionListItem: {
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: colors.lightestGray,
  },
  chosenQuestionListItem: {
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue1,
  },
  chosenItemText: {
    color: colors.blue1,
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
