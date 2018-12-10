export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const SET_MAX_PAGE = 'SET_MAX_PAGE';
export const RESET_PAGE = 'RESET_PAGE';

export const incrementPage = () => ({ type: INCREMENT_PAGE });
export const setMaxPage = page => ({ type: SET_MAX_PAGE, page });
export const resetPage = () => ({ type: RESET_PAGE });
