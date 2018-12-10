import { makeReducer } from '../../global/reducerHelper';
import {
  ADD_LOCATION,
  WITHDRAW_LOCATION,
  RESET_FILTER,
  CHANGE_AGE,
  CHANGE_HEIGHT,
  CHANGE_WEIGHT,
  CHANGE_LAST_ACTIVE,
  CHANGE_DISTANCE,
  CHANGE_RESPOSIVENESS,
  CHANGE_TRUST } from '../actions/filter';

const initialState = {
  locations: [],
  age: [18, 60],
  height: [48, 78],
  weight: [35, 110],
  lastActive: 5,
  distance: 5,
  trust: 0,
  responsiveness: 0,
  shouldAddToFormData: {},
};

export default makeReducer(initialState, null, (state = initialState,
  { type, item, age, height, weight, lastActive, distance, trust, responsiveness }) => {
  switch (type) {
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, item],
        shouldAddToFormData: {
          ...state.shouldAddToFormData, locations: true,
        },
      };
    case WITHDRAW_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== item.id),
      };
    case CHANGE_AGE:
      return {
        ...state,
        age,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, age: true,
        },
      };
    case CHANGE_HEIGHT:
      return {
        ...state,
        height,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, height: true,
        },
      };
    case CHANGE_WEIGHT:
      return {
        ...state,
        weight,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, weight: true,
        },
      };
    case CHANGE_LAST_ACTIVE:
      return {
        ...state,
        lastActive,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, lastActive: true,
        },
      };
    case CHANGE_DISTANCE:
      return {
        ...state,
        distance,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, distance: true,
        },
      };
    case CHANGE_TRUST:
      return {
        ...state,
        trust,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, trust: true,
        },
      };
    case CHANGE_RESPOSIVENESS:
      return {
        ...state,
        responsiveness,
        shouldAddToFormData: {
          ...state.shouldAddToFormData, responsiveness: true,
        },
      };
    case RESET_FILTER:
      return initialState;

    default:
      return state;
  }
});
