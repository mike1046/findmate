import { RESET_PAGE, INCREMENT_PAGE, SET_MAX_PAGE } from '../actions/page';
import { makeReducer } from '../../global/reducerHelper';

const initialState = {
  nextPage: 0,
  maxPage: 1,
};
// const initialState = [496316, 447332];

export default makeReducer(initialState, null, (state = initialState, { type, page }) => {
  switch (type) {
    case INCREMENT_PAGE:
      return {
        ...state,
        nextPage: state.nextPage + 1,
      };
    case SET_MAX_PAGE:
      return {
        ...state,
        maxPage: page,
      };
    case RESET_PAGE:
      return initialState;

    default:
      return state;
  }
});
