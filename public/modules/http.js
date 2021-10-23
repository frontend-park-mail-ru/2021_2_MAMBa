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
    url: URLS.api.actor + actorId,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === 200) {
      return convertArrayToActorPage(responseBody);
    }
    return null;
  } catch (err) {
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
    if (responseStatus === 200) {
      return responseBody;
    }
    return null;
  } catch (err) {
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

/**
 * Send async get request using async func.
 * @return {Promise} - user id if you authorized, null in another case.
 */
const getCurrentUser = async () => {
  const params = {
    url: URLS.api.me,
    method: 'GET',
    credentials: 'include',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === 200) {
      return responseBody.id;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export {
  getCollections,
  sendRequest,
  getCurrentUser,
  getInfoAboutActor,
};
