// @flow

const convertToFeetInches = (number: number) => {
  const feet = number * 4 / 48 - (number * 4 / 48) % 1;
  const inches = Math.round(((number * 4 / 48) % 1) * 12);
  if (!inches) return `${feet}'`;
  return `${feet}'${inches}"`;
};

const convertToCm = (number: number) => {
  const cm = Math.round(number * 4 / 48 * 30.48);
  return `(${cm}cm)`;
};

const getHeightString = (number: number) => `${convertToFeetInches(number)} ${convertToCm(number)}`;

const convertKgToLbs = (number: number) => Math.round(number * 2.20462262185);

const getWeightString = (number: number) => `${convertKgToLbs(number)} LB (${number} kg)`;

const getActiveInLast = {
  '1': '24 Hours',
  '2': 'Week',
  '3': 'Month',
  '4': 'Year',
  '5': 'Any time',
};

const getDistance = {
  '1': '10 km',
  '2': '50 km',
  '3': '100 km',
  '4': '500 km',
  '5': 'Anywhere',
};

const generateInstanceId = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default {
  generateInstanceId,
  getHeightString,
  getWeightString,
  getActiveInLast,
  getDistance,
};
