// @flow

import { Alert } from 'react-native';

import { put, call, takeLatest, select, spawn, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import moment from 'moment';

import { REQUEST_MESSAGES,
  SEND_MESSAGE,
  SEND_MEDIA,
  REQUEST_DELETE_MESSAGE,
  REQUEST_PREVIEW,
  addMessage,
  deleteMessage,
  setMessages,
  addPreviews,
  addEarlierMessages,
  REQUEST_DELETE_CONVERSATION,
  REQUEST_MEDIA_LIBRARY,
  REQUEST_SEND_FROM_LIBRARY,
  REQUEST_CONVERSATION_MEDIA,
  deleteConversation,
  refreshPreview,
} from '../actions/message';
import { createMessages, createHeaders } from './utils';
import {
  requestMessages, fetchOnlineStatuses,
} from './api';

let currentUpdaterOnlineStatuses;

function* startUpdatingOnlineStatuses(): Generator<*, void, *> {
  // reactotron.log(' inside start updating online statuses');
  yield delay(60000);
  yield spawn(requestOnlineStatuses);
  currentUpdaterOnlineStatuses = yield spawn(startUpdatingOnlineStatuses);
}

function* stopUpdatingOnlineStatuses(): Generator<*, void, *> {
  if (currentUpdaterOnlineStatuses) {
    yield cancel(currentUpdaterOnlineStatuses);
    currentUpdaterOnlineStatuses = null;
  }
}

function* createPreviewCopy() {
  return yield select(state => state.message.preview);
}

function* requestOnlineStatuses(): Generator<*, void, *> {
  try {
    const headers = yield createHeaders();
    const formData = new FormData();
    const preview = yield select(state => state.message.preview);
    if (preview) {
      preview.forEach((item) => {
        formData.append('userIds[]', item.userId);
      });
    }
    const response = yield call(fetchOnlineStatuses, formData, headers);
    // reactotron.log({ response });
    if (response.success) {
      if (response.statuses) {
        const copyPreview = yield createPreviewCopy();
        const { statuses } = response;
        // reactotron.log({ copyPreview });
        const newPreview = copyPreview.map((item) => {
          if (statuses[item.userId]) {
            item.onlineStatus.state = statuses[item.userId].state;
          }
          return item;
        });
        yield put(setMessages({ preview: newPreview }));
      }
    }
  } catch (e) {
    reactotron.log('error at request online statuses');
    reactotron.log(e);
  }
}

function* getMessages({ payload }) {
  try {
    const { userId, name, avatar, lastItemId } = payload;
    const formData = new FormData();
    formData.append('userId', userId);
    const headers = new Headers();
    const {
      login: {
        token,
      },
      profiles: {
        currentUser,
      },
    } = yield select();
    headers.append('X-AUTH-TOKEN', token);

    if (lastItemId) {
      yield put(setMessages({ isLoadingEarlier: true }));
      formData.append('oldestMessageId', lastItemId);
      const response = yield call(requestMessages, formData, headers, 'conversation');
      if (response) {
        if (response.success) {
          yield put(addEarlierMessages(createMessages(response.messages,
            name,
            avatar,
            currentUser), userId));
        }
      }
      yield put(setMessages({ isLoadingEarlier: false }));
    } else {
      yield put(setMessages({ isMessagesLoading: true }));
      const response = yield call(requestMessages, formData, headers, 'conversation');
      if (response) {
        if (response.success) {
          if (response.messages) {
            yield put(setMessages({ [userId]:
              createMessages(response.messages, name, avatar, currentUser) }));
          } else {
            yield put(setMessages({ [userId]: [] }));
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setMessages({ isMessagesLoading: false }));
}

function* requestDeleteMessage({ message, deleteForAll, userId }) {
  try {
    const formData = new FormData();
    formData.append('messageId', message._id);
    formData.append('deleteForAll', deleteForAll);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);
    const response = yield call(requestMessages, formData, headers, 'delete');
    if (response) {
      if (response.success === true) {
        yield put(deleteMessage(message, userId));
      }
    }

  } catch (e) {
    console.log(e);
  }
}

function* requestDeleteConversation({ userId }) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);
    const response = yield call(requestMessages, formData, headers, 'deleteConversation');
    if (response) {
      if (response.success === true) {
        yield put(deleteConversation(userId));
      }
    }

  } catch (e) {
    console.log(e);
  }
}

function* requestMediaLibrary() {
  try {
    yield put(setMessages({ 'isLibraryLoading': true }));
    // const formData = new FormData();
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);
    const response = yield call(requestMessages, null, headers, 'mediaLibrary');
    if (response) {
      if (response.success === true) {
        yield put(setMessages({ 'mediaLibrary': response.messages }));
      }
    }

  } catch (e) {
    console.log(e);
  }
  yield put(setMessages({ 'isLibraryLoading': false }));
}

function* requestConversationMedia({ userId }) {
  try {
    yield put(setMessages({ 'isLibraryLoading': true }));
    const formData = new FormData();
    formData.append('userId', userId);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);
    const response = yield call(requestMessages, formData, headers, 'conversationMedia');
    if (response) {
      if (response.success === true) {
        yield put(setMessages({ 'conversationMedia': response.messages }));
      }
    }

  } catch (e) {
    console.log(e);
  }
  yield put(setMessages({ 'isLibraryLoading': false }));
}

function* requestSendFromLibrary({ userId, messageId, mediaType, content }) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('messageId', messageId);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);
    const response = yield call(requestMessages, formData, headers, 'sendFromLibrary');
    if (response) {
      if (response.success === true) {
        yield createPreviewItem(mediaType, content);
      } else Alert.alert('error');
    }

  } catch (e) {
    console.log(e);
  }
  yield put(setMessages({ 'isLibraryLoading': false }));
}

function* getPreview({ filter, page }) {
  try {
    if (!currentUpdaterOnlineStatuses) {
      currentUpdaterOnlineStatuses = yield spawn(startUpdatingOnlineStatuses);
    }
    yield put(setMessages({ isMessagesLoading: true }));
    const formData = new FormData();
    formData.append('page', page);
    formData.append('sort', filter);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);

    const response = yield call(requestMessages, formData, headers, 'preview');
    if (response) {
      if (!response.noMessages) {
        yield put(setMessages({ 'probablyHasMoreResults': !response.noMessages }));
        yield put(addPreviews(response.messages));
        if (!response.noMessages) {
          yield put(setMessages({ 'nextPagePreview': page + 1 }));
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  yield put(setMessages({ isMessagesLoading: false }));
}

function* createPreviewItem(type: string, content: string): Generator<*, void, *> {
  const {
    profiles: {
      viewedUserMeta: {
        onlineState,
      },
      viewedUser: {
        bio: {
          slug,
        },
        meta: {
          userId,
        },
        images,
      },
    },
  } = yield select();
  const previewItem = {
    userId,
    fromMe: true,
    type,
    created: moment().format(),
    slug,
    isUnread: true,
    previewPrimaryImageUrl: images[0].medium,
    onlineStatus: onlineState,
    blur: false,
    content,
  };
  yield put(refreshPreview(previewItem));
}

function* sendMessage({ message, userId }) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('messageText', message.text);
    formData.append('instanceId', message.instanceId);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);

    const response = yield call(requestMessages, formData, headers, 'send');
    if (response) {
      if (response.success) {
        message._id = response.messageId;
        message.received = true;
        yield put(addMessage(message, userId));
        yield createPreviewItem('text', message.text);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

export function* checkMessageAsSeen(messageId: String) : Generator<*, void, *> {
  try {
    const formData = new FormData();
    // $FlowFixMe
    formData.append('messageId', messageId);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);

    yield call(requestMessages, formData, headers, 'seen');

  } catch (e) {
    console.log(e);
  }
}

function* sendMedia({ message, userId, contentType }) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('instanceId', message.instanceId);

    const media = {
      uri: message.path,
      type: message.format,
      name: message.filename,
    };
    const mediaType = contentType === 'sendVideo' ? 'video' : 'image';
    // $FlowFixMe
    formData.append(mediaType, media);
    const headers = new Headers();
    const token = yield select(state => state.login.token);
    headers.append('X-AUTH-TOKEN', token);

    const response = yield call(requestMessages, formData, headers, contentType);
    if (response) {
      if (response.success) {
        message.received = true;
        yield put(addMessage(message, userId));
        if (contentType === 'sendPhoto') {
          yield createPreviewItem('photo', message.image);
        }
        if (contentType === 'sendVideo') {
          yield createPreviewItem('video', message.video);
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

export const messaging = [
  takeLatest(REQUEST_DELETE_MESSAGE, requestDeleteMessage),
  takeLatest(REQUEST_MESSAGES, getMessages),
  takeLatest(SEND_MESSAGE, sendMessage),
  takeLatest(SEND_MEDIA, sendMedia),
  takeLatest(REQUEST_PREVIEW, getPreview),
  takeLatest(REQUEST_DELETE_CONVERSATION, requestDeleteConversation),
  takeLatest(REQUEST_MEDIA_LIBRARY, requestMediaLibrary),
  takeLatest(REQUEST_SEND_FROM_LIBRARY, requestSendFromLibrary),
  takeLatest(REQUEST_CONVERSATION_MEDIA, requestConversationMedia),
];
