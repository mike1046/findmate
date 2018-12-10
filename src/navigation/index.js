// @flow

import { createStackNavigator } from 'react-navigation';

import { Home, Login, Profile, Splash, AnotherProfile,
  Report, Delete, SettingsText, Chat, SendPhotoVideo,
  ChatMedia, Onboarding, Basic, Seeking, Location, Photo, About, Password, Phone, Video, Questions, Email, FBPhotos, Filter } from '../scenes';
import screens from '../global/screens';

export const AppNavigator = createStackNavigator({
  [screens.splash]: {
    screen: Splash,
  },
  [screens.login]: {
    screen: Login,
  },
  [screens.home]: {
    screen: Home,
  },
  [screens.profile]: {
    screen: Profile,
  },
  [screens.anotherProfile]: {
    screen: AnotherProfile,
  },
  [screens.report]: {
    screen: Report,
  },
  [screens.delete]: {
    screen: Delete,
  },
  [screens.settingsText]: {
    screen: SettingsText,
  },
  [screens.chat]: {
    screen: Chat,
  },
  [screens.sendPhotoVideo]: {
    screen: SendPhotoVideo,
  },
  [screens.chatMedia]: {
    screen: ChatMedia,
    path: screens.chatMedia,
  },
  [screens.onboarding]: {
    screen: Onboarding,
  },
  [screens.basic]: {
    screen: Basic,
  },
  [screens.seeking]: {
    screen: Seeking,
  },
  [screens.location]: {
    screen: Location,
  },
  [screens.photo]: {
    screen: Photo,
  },
  [screens.email]: {
    screen: Email,
  },
  [screens.about]: {
    screen: About,
  },
  [screens.password]: {
    screen: Password,
  },
  [screens.phone]: {
    screen: Phone,
  },
  [screens.video]: {
    screen: Video,
  },
  [screens.questions]: {
    screen: Questions,
  },
  [screens.fbPhotos]: {
    screen: FBPhotos,
  },
  [screens.filter]: {
    screen: Filter,
  },
}, {
  headerMode: 'none',
  cardStyle: {
    shadowOpacity: 0,
    elevation: 0,
  },
  navigationOptions: {
    header: null,
  },
});
