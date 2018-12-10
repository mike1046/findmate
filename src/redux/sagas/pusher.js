// @flow

import { Alert } from 'react-native';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
import Pusher from 'pusher-js/react-native';
import moment from 'moment';

import { checkMessageAsSeen } from './messaging';
import { addMessage, changeTyping, refreshPreview } from '../actions/message';
import { addImageToPrivate, addImageToApproved } from '../actions/onboarding';
import { showModal } from '../../components/ModalQueue';

export const socket = new Pusher('8a9sd8ga8sASHDjasdh8', {
  wsHost: 'slanger.findmate.app',
  encrypted: true,
  enabledTransports: ['ws', 'flash'],
  authEndpoint: 'https://findmate.app/api/general/pusherAuth',
});

export function* pusherListener(): Generator<*, void, *> {
  // reactotron.log('inside pusher listener');
  const {
    login: {
      pusherKey,
    },
    profiles,
  } = yield select();
  const pusherChannel = yield call(createSocketChannel, pusherKey);
  yield takeLatest(pusherChannel, payload => handlePayload(payload));

  if (profiles) {
    if (profiles.currentUser) {
      if (profiles.currentUser.meta) {
        const { pusherChannelPublic: myChannel } = profiles.currentUser.meta;
        const socketChannel = yield call(createSocketChannel, myChannel);
        yield takeLatest(socketChannel, payload => handlePayload(payload));
      }
    }
  }
}

// export function* pusherListenerOnboarding(): Generator<*, void, *> {
//   const {
//     login: {
//       pusherKey,
//     },
//   } = yield select();

//   const pusherChannel = yield call(createSocketChannel, pusherKey);
//   yield takeLatest(pusherChannel, payload => handlePayload(payload));
// }

function* createPreviewItemFromIncomingMessage(type: string,
  content: string, params: Object): Generator<*, void, *> {
  const { userId, slug, avatar } = params;
  const previewItem = {
    userId,
    fromMe: false,
    type,
    created: moment().format(),
    slug,
    isUnread: true,
    previewPrimaryImageUrl: avatar,
    onlineStatus: {
      stateId: '1',
      state: 'online',
      message: 'Online Now',
    },
    blur: false,
    content,
  };
  yield put(refreshPreview(previewItem));
}

function createSocketChannel(channelName: string) {
  return eventChannel((emit) => {
    const pusher = socket.subscribe(channelName);
    pusher.bind_global((eventName, data) => {
      emit({
        eventName, data,
      });
    });
    return () => {
      pusher.unbind();
    };
  });
}

function* handleImageResponse(data: Object): Generator<*, void, *> {
  try {
    const { meta: content, type } = data;
    if (type === 'image-rejected') {
      yield put(addImageToPrivate(content));
      Alert.alert('Please add image that clearly shows your face');
    }
    if (type === 'image-approved') {
      yield put(addImageToApproved(content));
    }
  } catch (e) {
    reactotron.log('error at handleImageResponse');
  }
}

function* handlePayload(payload) {
  const {
    message: {
      openedChatId,
    },
  } = yield select();
  const { data, eventName } = payload;
  // reactotron.log({ payload });
  if (eventName === 'notify') {
    if (data.type === 'image-rejected' || data.type === 'image-approved') {
      yield handleImageResponse(data);
    }
    if (data.type === 'message') {
      if (!openedChatId) {
        reactotron.log('before show modal');
        showModal({
          type: 'custom',
          title: `${data.slug} has sent you message`,
          avatar: data.meta.miniProfile.thumbUrl,
          duration: 2000,
          message: data.content,
        });
        // reactotron.log('after show modal');

      }
      if (data.messageType === 'text'
       || data.messageType === 'photo'
        || data.messageType === 'video') {
        const params = {
          userId: data.fromUserId,
          slug: data.slug,
          avatar: data.meta.miniProfile.thumbUrl,
        };
        const message = {
        };
        message.user = {
          _id: 2,
          name: data.slug,
          avatar: data.meta.miniProfile.thumbUrl,
        };
        const date = moment(parseInt(data.timestamp, 10)).format();
        message.createdAt = date;
        message._id = data.messageId;

        if (data.messageType === 'text') {
          message.text = data.content;
          yield createPreviewItemFromIncomingMessage('text', data.content, params);
        }
        if (data.messageType === 'photo') {
          message.image = data.content.photoLarge;
          yield createPreviewItemFromIncomingMessage('photo', data.content.photoLarge, params);
        }
        if (data.messageType === 'video') {
          message.video = data.content.url;
          yield createPreviewItemFromIncomingMessage('video', data.content.url, params);
        }
        yield put(addMessage(message, data.fromUserId));
      }
      if (data.fromUserId === openedChatId) {
        yield checkMessageAsSeen(data.messageId);
      }
    } if (data.type === 'message-self') {
      // reactotron.log(payload);
    } if (data.type === 'view') {
      // reactotron.log('before VIEWING YOUR PROFILE show modal');
      showModal({
        type: 'custom',
        title: `${data.slug} is viewing your profile`,
        avatar: data.meta.miniProfile.thumbUrl,
      });
    }
  }
  if (eventName === 'client-typing') {
    if (data) {
      yield put(changeTyping(data.userId, true));
      yield delay(3000);
      yield put(changeTyping(data.userId, false));
    }
  }
}
