import {URLS} from '../consts/urls.js';

import {
  convertArrayToActorPage,
} from './adapters.js';
import {statuses} from '../consts/reqStatuses';


// const api_url = process.env.API_URL || '';
/**
 * Send async get request using async func.
 * @param {Object} actorId - Contains id of actor to render.
 * @return {Array} - Array of objects for render actor page.
 */
const getInfoAboutActor = async (actorId) => {
  const params = {
    url: URLS.api.actor + actorId,
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


export {
  getCollections,
  sendRequest,
  getCurrentUser,
  getInfoAboutActor,
  checkAuth,
  register,
  login,
  logout,
};
