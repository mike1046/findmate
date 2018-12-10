// @flow

import {
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_EARLIER_MESSAGES,
  CHANGE_TYPING, ADD_PREVIEWS,
  DELETE_MESSAGE,
  DELETE_CONVERSATION,
  REFRESH_PREVIEW,
  MARK_LIBRARY_ITEM_SENT,
  MARK_PREVIEW_ITEM_SEEN,
  CONTROL_PLAYING_VIDEO,
} from '../actions/message';

import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  isMessagesLoading: false,
  isLoadingEarlier: false,
  typing: {},
  preview: [],
  chosenType: 'empty',
  nextPagePreview: 0,
  probablyHasMoreResults: false,
  mediaLibrary: [],
  conversationMedia: [],
  isLibraryLoading: false,
  openedChatId: null,
};

export default makeReducer(initialState, SET_MESSAGES, (state = initialState, {
  type,
  message,
  messages,
  userId,
  isTyping,
  previews,
  previewItem,
  messageId,
  playing,
}) => {
  switch (type) {
    case ADD_MESSAGE:
      if (state[userId]) {
        return {
          ...state,
          [userId]: [message, ...state[userId]],
        };
      } return state;
    case ADD_EARLIER_MESSAGES:
      if (state[userId]) {
        return {
          ...state,
          [userId]: [...state[userId], ...messages],
        };
      } return state;
    case DELETE_MESSAGE:
      return {
        ...state,
        [userId]: state[userId].filter(item => item._id !== message._id),
      };
    case DELETE_CONVERSATION:
      return {
        ...state,
        [userId]: [],
      };
    case ADD_PREVIEWS:
      return {
        ...state,
        preview: [...state.preview, ...previews],
      };
    case CHANGE_TYPING:
      return {
        ...state,
        typing: {
          ...state.typing,
          [userId]: isTyping,
        },
      };
    case REFRESH_PREVIEW: {
      const a = [...state.preview];
      const filteredPreview = a.filter(item => item.userId !== previewItem.userId);
      return {
        ...state,
        preview: [previewItem, ...filteredPreview],
      };
    }
    case MARK_LIBRARY_ITEM_SENT:
      return {
        ...state,
        mediaLibrary: state.mediaLibrary.map(item => (item.messageId === messageId)
          ? { ...item, isSent: true } : item),

      };
    case MARK_PREVIEW_ITEM_SEEN:
      return {
        ...state,
        preview: state.preview.map(item => (item.userId === userId)
          ? { ...item, isUnread: false } : item),
      };
    case CONTROL_PLAYING_VIDEO: {
      return {
        ...state,
        [userId]: state[userId].map(item => (item._id === messageId)
          ? { ...item, playing } : item),
      };
    }
    default:
      return state;
  }
});
