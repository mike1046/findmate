import { SET_SETTINGS, CHANGE_NOTIFICATIONS } from '../actions/settings';
import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  isLoading: false,
  notifications: [],
  smsNotifications: false,
  privacy: false,
  profileStatusItems: {},
};

export default makeReducer(initialState, SET_SETTINGS, (state = initialState, {
  type,
  notificationId,
  notificationType,
  notificationValue,
}) => {
  switch (type) {
    case CHANGE_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map(
          notification => (notification.notificationId === notificationId)
            ? { ...notification,
              unsubscribed: { ...notification.unsubscribed,
                [notificationType]: notificationValue,
              },
            }
            : notification,
        ),
      };
    default:
      return state;
  }
});
