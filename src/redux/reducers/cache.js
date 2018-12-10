import { ADD_CITIES, ADD_GENDER } from '../actions/cache';

const initialState = {
  cities: [],
  gender: {},
};

export default (state = initialState, { type, cities, gender }) => {
  switch (type) {
    case ADD_CITIES:
      return {
        ...state,
        cities,
      };
    case ADD_GENDER:
      return {
        ...state,
        gender,
      };
    default:
      return state;
  }
};
