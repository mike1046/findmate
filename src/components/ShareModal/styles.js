import { StyleSheet } from 'react-native';

import colors from '../../global/colors';
import constants from '../../global/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalStyle: {
    flexDirection: 'column',
    width: 200,
    height: 308,
    justifyContent: 'space-between',
    borderColor: colors.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.white,
    borderRadius: 4,
    position: 'absolute',
    bottom: constants.barHeight,
    right: 0,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor,
    height: 44,
    justifyContent: 'center',
  },
  lastItem: {
    height: 44,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 10,
    fontFamily: 'Quicksand-Regular',
  },
  headerText: {
    fontWeight: 'bold',
  },
});
