// @flow

import { StyleSheet } from 'react-native';

import { colors } from '../../global';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
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
  genderContainer: {
    // marginVertical: 10,
    flexDirection: 'row',
    height: 44,
    borderColor: colors.blueBorder,
    borderWidth: 1,
    borderRadius: 5,
  },
  genderButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeGenderButton: {
    backgroundColor: colors.blueBorder,
  },
  genderButtonCenter: {
    borderLeftColor: colors.blueBorder,
    borderRightColor: colors.blueBorder,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  genderButtonLeft: {
    borderRightColor: colors.blueBorder,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  genderButtonRight: {
    borderLeftColor: colors.blueBorder,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  genderButtonText: {
    color: colors.blueBorder,
    fontWeight: '400',
    fontSize: 16,
  },
  activeGenderButtonText: {
    color: colors.white,
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
  urlText: {
    color: colors.blueBorder,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 10,
  },
});
