import {URLS} from '../consts/urls.js';

import {
  convertArrayToActorFilms,
  convertArrayToActorPage,
} from './adapters.js';

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

const getProfile = async () => {
  const params = {
    url: URLS.api.profile,
    method: 'GET',
    credentials: 'include',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const sendReview = async (user) => {
  const params = {
    url: URLS.api.sendReview,
    method: 'POST',
    body: JSON.stringify(user),
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {Object} filmId - Contains id of film to render.
 * @return {Array} - Array of objects for render film page.
 */
const getInfoAboutFilm = async (filmId) => {
  const params = {
    url: URLS.api.film + filmId,
    method: 'GET',
  };

  try {
    return await sendRequest(params);
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {Object} reviewId - Contains id of review to render.
 * @return {Array} - Array of objects for render review page.
 */
const getInfoAboutReview = async (reviewId) => {
  const params = {
    url: URLS.api.review + reviewId,
    method: 'GET',
  };

  try {
    return await sendRequest(params);
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {object} actorId - Contains id of actor to render.
 * @return {array} - Array of objects for render actor page.
 */
const getInfoAboutActor = async (actorId) => {
  const params = {
    url: `${URLS.api.actor}${actorId}`,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === 200) {
      return convertArrayToActorPage(responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {Integer} actorId - Contains id of actor to render.
 * @param {Integer} limit - Contains count of films to render.
 * @param {Integer} skip - Contains count 0f rendered films.
 * @return {array} - Array of objects for render actor page.
 */
const getActorFilms = async (actorId, limit, skip) => {
  const params = {
    url: `${URLS.api.actorFilms}${actorId}&skip=${limit}&limit=${skip}`,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === 200) {
      return convertArrayToActorFilms(responseBody);
    }
    return null;
  } catch {
    return null;
  }
};
/**
 * Send async get request using async func.
 * @return {array} - Array of objects for render collections page.
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
  } catch {
    return null;
  }
};

/**
 * Send async request to the server.
 * @param {object} params - parameters for request.
 * @return {object} - returns status and parsed response.
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
 * @return {promise} - user id if you authorized, null in another case.
 */
const getCurrentUser = async () => {
  const params = {
    url: URLS.api.me,
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
  sendReview,
  getActorFilms,
  getCollections,
  getInfoAboutReview,
  sendRequest,
  getCurrentUser,
  getInfoAboutActor,
  getInfoAboutFilm,
  checkAuth,
  getProfile,
  register,
  login,
};
