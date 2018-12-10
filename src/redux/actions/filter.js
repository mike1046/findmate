export const ADD_LOCATION = 'ADD_LOCATION';
export const WITHDRAW_LOCATION = 'WITHDRAW_LOCATION';
export const RESET_FILTER = 'RESET_FILTER';
export const CHANGE_AGE = 'CHANGE_AGE';
export const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
export const CHANGE_WEIGHT = 'CHANGE_WEIGHT';
export const CHANGE_LAST_ACTIVE = 'CHANGE_LAST_ACTIVE';
export const CHANGE_DISTANCE = 'CHANGE_DISTANCE';
export const CHANGE_TRUST = 'CHANGE_TRUST';
export const CHANGE_RESPOSIVENESS = 'CHANGE_RESPOSIVENESS';

export const addLocation = item => ({ type: ADD_LOCATION, item });
export const withdrawLocation = item => ({ type: WITHDRAW_LOCATION, item });
export const resetFilter = () => ({ type: RESET_FILTER });
export const changeAge = age => ({ type: CHANGE_AGE, age });
export const changeHeight = height => ({ type: CHANGE_HEIGHT, height });
export const changeWeight = weight => ({ type: CHANGE_WEIGHT, weight });
export const changeLastActive = lastActive => ({ type: CHANGE_LAST_ACTIVE, lastActive });
export const changeDistance = distance => ({ type: CHANGE_DISTANCE, distance });
export const changeTrust = trust => ({ type: CHANGE_TRUST, trust });
export const changeResponsiveness = responsiveness => ({ type:
  CHANGE_RESPOSIVENESS,
responsiveness });
