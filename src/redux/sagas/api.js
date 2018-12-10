import {
  gerUsersUrl,
  signInEmail,
  signInKit,
  signInFacebook,
  cacheUrl,
  getCurrentUserUrl,
  getProfileMetaUrl,
  getUserStatusUrl,
  interactUrl,
  indexesUrl,
  submitUrl,
  getSettingsUrl,
  settingsUrl,
  passwordComfirmUrl,
  deleteAccountUrl,
  gpsUrl,
  messageUrl,
  locationUrl,
  onboardingUrl,
  bulkOnlineStatuses,
} from '../../global/apiUrl';

export const fetchUsers = async (formData, headers) => {
  const response = await fetch(gerUsersUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const fetchCache = async () => {
  const response = await fetch(cacheUrl);
  const data = await response.json();
  return data;
};

export const fetchTokenEmail = async (formData) => {
  const response = await fetch(signInEmail, {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const fetchTokenKit = async (formData) => {
  const response = await fetch(signInKit, {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const fetchTokenFacebook = async (formData) => {
  const response = await fetch(signInFacebook, {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const getCurrentUser = async (formData, headers) => {
  const response = await fetch(getCurrentUserUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const getProfileMeta = async (formData, headers) => {
  const response = await fetch(getProfileMetaUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const getUserStatus = async (headers) => {
  const response = await fetch(getUserStatusUrl, {
    method: 'post',
    headers,
  });
  const data = await response.json();
  return data;
};

export const interactWithProfile = async (formData, headers, interactType) => {
  const url = interactUrl(interactType);
  const response = await fetch(url, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const loadInterests = async (headers, indexType) => {
  const url = indexesUrl(indexType);
  const response = await fetch(url, {
    method: 'post',
    headers,
  });
  const data = await response.json();
  return data;
};

export const submitReport = async (formData, headers) => {
  const response = await fetch(submitUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const getSettings = async (headers) => {
  const response = await fetch(getSettingsUrl, {
    method: 'post',
    headers,
  });
  const data = await response.json();
  return data;
};

export const requestSettingsChange = async (formData, headers, type) => {
  const response = await fetch(settingsUrl(type), {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const requestPasswordConfirmApi = async (formData, headers) => {
  const response = await fetch(passwordComfirmUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const requestDeleteAccountApi = async (formData, headers) => {
  const response = await fetch(deleteAccountUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const sendGpsCoordsToServer = async (formData, headers) => {
  const response = await fetch(gpsUrl, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};

export const requestMessages = async (formData, headers, messageType) => {
  let params = {
    method: 'post',
    headers,
  };

  if (formData) {
    params = {
      method: 'post',
      body: formData,
      headers,
    };
  }
  const response = await fetch(messageUrl(messageType), params);
  const data = await response.json();
  return data;
};

export const requestLocations = async (formData, headers, urlType) => {
  let params = {
    method: 'post',
    headers,
  };

  if (formData) {
    params = {
      method: 'post',
      body: formData,
      headers,
    };
  }
  const response = await fetch(locationUrl(urlType), params);
  const data = await response.json();
  return data;
};

export const fetchOnboarding = async (formData, headers, onboardingAction) => {

  let params = {
    method: 'post',
    headers,
  };
  if (formData) {
    params = {
      method: 'post',
      body: formData,
      headers,
    };
  }

  const response = await fetch(onboardingUrl(onboardingAction), params);
  const data = await response.json();
  return data;
};

export const fetchOnlineStatuses = async (formData, headers) => {
  const response = await fetch(bulkOnlineStatuses, {
    method: 'post',
    body: formData,
    headers,
  });
  const data = await response.json();
  return data;
};
