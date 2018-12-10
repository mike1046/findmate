export const SET_SORT = 'SET_SORT';
export const SET_SORT_DEFAULT = 'SET_SORT_DEFAULT';

export const setSort = activeTab => ({ type: SET_SORT, activeTab });
export const setSortDefault = () => ({ type: SET_SORT_DEFAULT });
