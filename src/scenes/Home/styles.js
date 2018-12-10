// @flow

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors, constants } from '../../global';

const { height, width } = Dimensions.get('window');

const imageDiameter = 40;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  hiddenScreen: {
    position: 'absolute',
    top: -height * 2,
    left: -height * 2,
    width: 320,
    height: 1000,
  },
  contentContainer: {
    alignItems: 'center',
  },
  background: {
    backgroundColor: 'white',
  },
  icon: {
    height: imageDiameter,
    width: imageDiameter,
    borderRadius: imageDiameter / 2,
  },
  iconPreview: {
    width: 20,
  },
  emptyListTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  emptyListMessage: {
    margin: 10,
    textAlign: 'center',
  },
  subscribeText: {
    color: colors.gray1,
    marginTop: 30,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  subscribeButton: {
    color: colors.blue1,
    margin: 10,
  },
  onlineIcon: {
    position: 'absolute',
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    right: 2,
    bottom: 2,
  },
  slugContentContainer: {
    marginLeft: 10,
    flex: 1,
  },
  dateContainer: {
    // width: 40,
    // height: 60,
  },
  overViewContentText: {
    color: colors.gray,
    fontWeight: '400',
  },
  overViewUnreadText: {
    color: colors.black,
    fontWeight: '500',
  },
  previewNametext: {
    fontSize: 14,
    color: colors.black,
  },
  mediaPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  previewHeader: {
    alignItems: 'center',
  },
  previewHeaderText: {
    paddingLeft: 10,
  },
  headerLeftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mailButton: {
    height: constants.barHeight,
    width: constants.barHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chosenMailButton: {
    backgroundColor: 'white',
  },
  previewItemMessage: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.modalBorder,
  },
  elevationLow: {

    marginLeft: (constants.barHeight - imageDiameter) / 2,
    backgroundColor: 'white',
    borderRadius: imageDiameter / 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  emptyListText: {
    alignSelf: 'center',
  },
  emptyListView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: height - constants.barHeight * 2 - 34,
    width,
    // backgroundColor: 'yellow',
    // borderColor: 'red',
    // borderWidth: 4,
  },
  emptyListComponent: {
    width: '33%',
  },
});
