// @flow

import { StyleSheet, Platform, Dimensions } from 'react-native';

import colors from '../../global/colors';

const headerHeight = 40;
const { width } = Dimensions.get('window');

const marginLeft = 15;
const mapWidth = width * 0.9 - marginLeft * 2;

export default StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  elevationLow: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 1,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: headerHeight,
    backgroundColor: colors.cardHeader,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  headerText: {
    marginLeft,
  },
  pencilButton: {
    height: headerHeight,
    width: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft,
  },
  iconWrapper: {
    marginLeft,
    // borderWidth: 2,
    // borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainText: {
    marginBottom: 5,
    maxWidth: '80%',
    marginLeft,
  },
  actualDistance: {
    marginLeft,
    color: colors.actualDistance,
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 2,
  },
  redText: {
    color: colors.warning,
  },
  flag: {
    width: 16,
    height: 11,
    marginBottom: 5,
    marginLeft: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  cityMap: {
    width: mapWidth,
    height: mapWidth / 2,
    marginVertical: marginLeft,
    marginLeft,
  },
});
