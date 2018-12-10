// @flow
import { Alert } from 'react-native';
import { select } from 'redux-saga/effects';

export const createMessages = (array: [],
  name: string,
  avatar: string,
  currentUser: Object): any[] => array.map((item) => {

  const result: {
    _id: number,
    createdAt: string,
    user?: {},
    text?: string,
    image?: string,
    video?: string,
  } = {
    _id: item.messageId,
    createdAt: item.created,
  };

  if (typeof item.content === 'string') {
    result.text = item.content;
  }
  if (typeof item.content === 'object') {
    if (item.content.url) {
      result.video = item.content.url;
    } else {
      result.image = item.content.photoLarge;
    }
  }
  if (!item.self) {
    result.user = {
      _id: 2,
      name,
      avatar,
    };
  } else {
    result.user = {
      _id: 1,
      name: currentUser.bio.slug,
      avatar: currentUser.images[0].medium,
    };
  }
  return result;
});

export const createFormData = (
  locations: [],
  nextPage: string,
  age: string,
  height: [string, string],
  weight: [string, string],
  lastActive: string,
  distance: string,
  trust: string,
  responsiveness: string,
  view: string,
  shouldUpdate: any,
) => {

  const data = new FormData();
  locations.forEach((item, index) => {
    data.append(`locations[${index}][type]`, item.type);
    data.append(`locations[${index}][id]`, item.id);
    data.append(`locations[${index}][name]`, item.name);
  });

  data.append('page', nextPage);
  data.append('view', view);
  if (shouldUpdate.distance) {
    data.append('distance', distance);
  }
  if (shouldUpdate.age) {
    data.append('ageFrom', age[0]);
    data.append('ageTo', age[1]);
  }
  if (shouldUpdate.height) {
    data.append('heightFrom', height[0]);
    data.append('heightTo', height[1]);
  }
  if (shouldUpdate.weight) {
    data.append('weightFrom', weight[0]);
    data.append('weightTo', weight[1]);
  }
  if (shouldUpdate.lastActive) {
    data.append('lastActive', lastActive);
  }
  if (shouldUpdate.trust) {
    data.append('trust', trust);
  }
  if (shouldUpdate.responsiveness) {
    data.append('responsiveness', responsiveness);
  }
  return data;
};

export function* createHeaders(): Generator<*, void, *> {
  const token = yield select(state => state.login.token);
  const headers = new Headers();
  headers.append('X-AUTH-TOKEN', token);
  return headers;
}

export function timeOutError({ message }: { message?: string }) {
  if (message) {
    Alert.alert(message);
  } else Alert.alert('There was an error connecting to Findmate');
}
