// @flow

import { StyleSheet } from 'react-native';

import { colors, constants } from '../../../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    color: colors.red,
    marginBottom: 10,
  },
  datePicker: {
    width: constants.width * 0.9 - 30,
  },
  subHeaderText: {
    marginVertical: 10,
    fontWeight: '500',
    fontSize: 15,
  },
  openDateButton: {
    height: 44,
    justifyContent: 'center',
  },
  cardContent: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 400,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grayText: {
    marginTop: 10,
    color: colors.gray1,
    fontSize: 10,
  },
  dateTimePickerIos: {
    height: 200,
  },
  urlText: {
    color: colors.blueBorder,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 10,
  },
});
