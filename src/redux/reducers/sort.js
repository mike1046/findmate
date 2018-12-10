import { SET_SORT, SET_SORT_DEFAULT } from '../actions/sort';

const initialState = {
  activeTab: 'online',
};

export default (state = initialState,
  { type, activeTab }) => {
  switch (type) {
    case SET_SORT:
      return {
        ...state,
        activeTab,
      };
    case SET_SORT_DEFAULT:
      return initialState;
    default:
      return state;
  }
};
