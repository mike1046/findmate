import { ADD_CURRENT_USER_PROFILE,
  ADD_CURRENT_USER_PROFILE_META,
  ADD_VIEWED_USER_META,
  CLEAR_PROFILE,
  CLEAR_ANOTHER_PROFILE,
  SET_IS_LOADING,
  SET_PROFILES,
} from '../actions/profile';
import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  currentUser: {},
  currentUserMeta: {},
  chatChannelKey: null,
  viewedUser: {},
  viewedUserBlobImages: {},
  viewedUserSmallBlobImages: {},
  viewedUserMeta: {},
  isLoading: false,
  isMetaLoading: false,
  isFavorite: false,
  isBlocked: false,
  isInterested: false,
  interests: [],
  passwordConfirmed: false,
  steps: {},
};

export default makeReducer(initialState, SET_PROFILES, (state = initialState, {
  type,
  currentUser,
  currentUserMeta,
  viewedUserMeta,
  isLoading,
}) => {
  switch (type) {
    case ADD_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUser,
      };
    case ADD_VIEWED_USER_META:
      return {
        ...state,
        viewedUserMeta,
      };
    case ADD_CURRENT_USER_PROFILE_META:
      return {
        ...state,
        currentUserMeta,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading,
      };
    case CLEAR_ANOTHER_PROFILE:
      return {
        ...state,
        viewedUser: {},
        viewedUserMeta: {},
        chatChannelKey: null,
        viewedUserBlobImages: {},
        viewedUserSmallBlobImages: {},
      };
    case CLEAR_PROFILE:
      return initialState;
    default:
      return state;
  }
});
