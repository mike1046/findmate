export const gerUsersUrl = 'https://react-v1.findmate.app/react-api/search/json';
export const cacheUrl = 'https://react-v1.findmate.app/react-api/options/cache';
export const signInEmail = 'https://react-v1.findmate.app/react-api/signin/email';
export const signInKit = 'https://react-v1.findmate.app/react-api/signin/accountKit';
export const signInFacebook = 'https://react-v1.findmate.app/react-api/signin/facebook';
export const getCurrentUserUrl = 'https://react-v1.findmate.app/react-api/profile/get';
export const getProfileMetaUrl = 'https://react-v1.findmate.app/react-api/interact/loadProfileMetadata';
export const getUserStatusUrl = 'https://react-v1.findmate.app/react-api/onboarding/status';
export const passwordComfirmUrl = 'https://react-v1.findmate.app/react-api/delete/password';
export const deleteAccountUrl = 'https://react-v1.findmate.app/react-api/delete/confirm';
export const gpsUrl = 'https://react-v1.findmate.app/react-api/general/stashGpsMobile';
export const bulkOnlineStatuses = 'https://react-v1.findmate.app/react-api/user/bulkOnlineStatus';

export const interactUrl = interactType => `https://react-v1.findmate.app/react-api/interact/${interactType}`;
export const messageUrl = urlType => `https://react-v1.findmate.app/react-api/message/${urlType}`;
export const indexesUrl = indexType => `https://react-v1.findmate.app/react-api/index/${indexType}`;
export const submitUrl = 'https://react-v1.findmate.app/react-api/report/submit';
export const getSettingsUrl = 'https://react-v1.findmate.app/react-api/settings/getProfileStatus';
export const settingsUrl = settingsType => `https://react-v1.findmate.app/react-api/settings/${settingsType}`;

export const flagUrl = countryCode => `https://findmate.app/img/flag-icons/png/${countryCode}.png`;
export const cityMapUrl = (city, country) => `https://findmate.app/utility/mapsImage/${city},${country}`;

export const locationUrl = urlType => `https://react-v1.findmate.app/react-api/location/${urlType}`;

export const onboardingUrl = onboardingAction => `https://react-v1.findmate.app/react-api/onboarding/${onboardingAction}`;

export const getFBPhotosUrl = (albumId, accessToken) => `https://graph.facebook.com/${albumId}/photos?access_token=${accessToken}&fields=height,width,link,images`;
