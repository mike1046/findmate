export const ADD_CITIES = 'ADD_CITIES';
export const ADD_GENDER = 'ADD_GENDER';

export const addCities = cities => ({ type: ADD_CITIES, cities });
export const addGender = gender => ({ type: ADD_GENDER, gender });
