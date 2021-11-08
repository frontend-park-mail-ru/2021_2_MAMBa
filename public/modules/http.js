import {statuses} from '../consts/reqStatuses';
import {URLS} from '../consts/urls.js';
import {
  convertArrayToActorPage,
} from './adapters.js';


/**
 * Send async get request using async func.
 * @param {Object} actorId - Contains id of actor to render.
 * @return {Array} - Array of objects for render actor page.
 */
const getInfoAboutActor = async (actorId) => {
  const params = {
    url: URLS.api.actor,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === statuses.OK) {
      return convertArrayToActorPage(responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @return {Array} - Array of objects for render collections page.
 */
const getCollections = async () => {
  const params = {
    url: URLS.api.collections,
    method: 'GET',
    credentials: 'include',
  };
  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === statuses.OK) {
      return responseBody;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async request to the server.
 * @param {Object} params - parameters for request.
 * @return {Object} - returns status and parsed response.
 */
const sendRequest = async ({url, method, body} = {}) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
    mode: 'cors',
    credentials: 'include',
  });

  try {
    const parsedJson = await response?.json();
    return {
      status: response.status,
      parsedJson,
    };
  } catch {
    return {
      status: response.status,
    };
  }
};

const login = async (user) => {
  const params = {
    url: URLS.api.login,
    method: 'POST',
    body: JSON.stringify(user),
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const logout = async () => {
  const params = {
    url: URLS.api.logout,
    method: 'GET',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const register = async (user) => {
  const params = {
    url: URLS.api.register,
    method: 'POST',
    body: JSON.stringify(user),
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const changeAvatar = (formData) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URLS.api.changeAvatar);
    xhr.send(formData);
    xhr.onloadend = () => {
      if (xhr.status === statuses.OK) {
        return xhr.response;
      } else {
        console.log('Ошибка ' + this.status);
      }
    };
  } catch (err) {
    return null;
  }
};

const changeSettings = async (settings) => {
  const params = {
    url: URLS.api.changeSettings,
    method: 'POST',
    body: JSON.stringify(settings),
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const getProfile = async (id) => {
  const params = {
    url: URLS.api.profile + `?id=${id}`,
    method: 'GET',
    credentials: 'include',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const checkAuth = async () => {
  const params = {
    url: URLS.api.checkAuth,
    method: 'GET',
    credentials: 'include',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @return {Promise} - user id if you authorized, null in another case.
 */
const getCurrentUser = async (id) => {
  const params = {
    url: URLS.api.getUser.concat(id),
    method: 'GET',
    credentials: 'include',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const getNProfilePagesBlocks = async (url, id, limit, skip) => {
  const params = {
    url: url + `?id=${id}&limit=${limit}&skip=${skip}`,
    method: 'GET',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};


export {
  getCollections,
  sendRequest,
  getCurrentUser,
  getInfoAboutActor,
  checkAuth,
  getNProfilePagesBlocks,
  changeSettings,
  changeAvatar,
  getProfile,
  register,
  login,
  logout,
};
