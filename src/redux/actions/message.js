export const SET_MESSAGES = 'SET_MESSAGES';
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MEDIA = 'SEND_MEDIA';
export const CHANGE_TYPING = 'CHANGE_TYPING';
export const REQUEST_PREVIEW = 'REQUEST_PREVIEW';
export const ADD_PREVIEWS = 'ADD_PREVIEWS';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const REQUEST_DELETE_MESSAGE = 'REQUEST_DELETE_MESSAGE';
export const ADD_EARLIER_MESSAGES = 'ADD_EARLIER_MESSAGES';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
export const REQUEST_DELETE_CONVERSATION = 'REQUEST_DELETE_CONVERSATION';
export const REQUEST_MEDIA_LIBRARY = 'REQUEST_MEDIA_LIBRARY';
export const REQUEST_CONVERSATION_MEDIA = 'REQUEST_CONVERSATION_MEDIA';
export const REQUEST_SEND_FROM_LIBRARY = 'REQUEST_SEND_FROM_LIBRARY';
export const REFRESH_PREVIEW = 'REFRESH_PREVIEW';
export const MARK_LIBRARY_ITEM_SENT = 'MARK_LIBRARY_ITEM_SENT';
export const MARK_PREVIEW_ITEM_SEEN = 'MARK_PREVIEW_ITEM_SEEN';
export const CONTROL_PLAYING_VIDEO = 'CONTROL_PLAYING_VIDEO';

export const setMessages = payload => ({
  type: SET_MESSAGES,
  payload,
});

export const requestMessages = payload => ({
  type: REQUEST_MESSAGES,
  payload,
});

export const addMessage = (message, userId) => ({
  type: ADD_MESSAGE,
  message,
  userId,
});

export const sendMessage = (message, userId) => ({
  type: SEND_MESSAGE,
  message,
  userId,
});

export const sendMedia = (message, userId, contentType) => ({
  type: SEND_MEDIA,
  message,
  userId,
  contentType,
});

export const changeTyping = (userId, isTyping) => ({
  type: CHANGE_TYPING,
  userId,
  isTyping,
});

export const requestPreview = (filter, page) => ({
  type: REQUEST_PREVIEW,
  filter,
  page,
});

export const addPreviews = previews => (
  {
    type: ADD_PREVIEWS,
    previews,
  }
);

export const requestDeleteMessage = (message, deleteForAll, userId) => ({
  type: REQUEST_DELETE_MESSAGE,
  message,
  deleteForAll,
  userId,
});

export const deleteMessage = (message, userId) => ({
  type: DELETE_MESSAGE,
  message,
  userId,
});

export const addEarlierMessages = (messages, userId) => ({
  type: ADD_EARLIER_MESSAGES,
  messages,
  userId,
});

export const deleteConversation = userId => ({
  type: DELETE_CONVERSATION,
  userId,
});

export const requestDeleteConversation = userId => ({
  type: REQUEST_DELETE_CONVERSATION,
  userId,
});

export const requestConversationMedia = userId => ({
  type: REQUEST_CONVERSATION_MEDIA,
  userId,
});

export const requestMediaLibrary = () => ({
  type: REQUEST_MEDIA_LIBRARY,
});

export const requestSendFromLibrary = (userId, messageId, mediaType, content) => ({
  type: REQUEST_SEND_FROM_LIBRARY,
  userId,
  messageId,
  mediaType,
  content,
});

export const refreshPreview = previewItem => ({
  type: REFRESH_PREVIEW,
  previewItem,
});

export const markLibraryItemSent = messageId => ({
  type: MARK_LIBRARY_ITEM_SENT,
  messageId,
});

export const markPreviewItemSeen = userId => ({
  type: MARK_PREVIEW_ITEM_SEEN,
  userId,
});

export const controlPlayingVideo = (userId, messageId, playing) => ({
  type: CONTROL_PLAYING_VIDEO,
  userId,
  messageId,
  playing,
});
