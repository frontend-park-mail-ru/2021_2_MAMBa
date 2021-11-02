import {URLS} from '../consts/urls.js';

import {
  convertArrayToActorFilms,
  convertArrayToActorPage, convertArrayToFilmPage,
} from './adapters.js';


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
    // const {status: responseStatus, parsedJson: responseBody} =
    //     await sendRequest(params);
    // if (responseStatus === 200) {
    //   return convertArrayToFilmPage(responseBody);
    // }
    // return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {Object} filmId - Contains id of review to render.
 * @return {Array} - Array of objects for render review page.
 */
const getInfoAboutReview = async (reviewId) => {
  const params = {
    url: URLS.api.review + reviewId,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === 200) {
      return convertArrayToFilmPage(responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

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
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {Integer} actorId - Contains id of actor to render.
 * @param {Integer} limit - Contains count of films to render.
 * @param {Integer} skip - Contains count 0f rendered films.
 * @return {Array} - Array of objects for render actor page.
 */
const getActorFilms = async (actorId, limit, skip) => {
  const params = {
    url: URLS.api.actorFilms + actorId + '&skip=' + skip + '&limit=' + limit,
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
    // console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URLS.api.changeAvatar);
    xhr.send(formData);
    xhr.onloadend = () => {
      if (xhr.status === 200) {
        console.log(xhr.response);
      } else {
        console.log("Ошибка " + this.status);
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
    url: URLS.api.profile + `/${id}`,
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
    url: URLS.api.getUser + id,
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
  getActorFilms,
  getCollections,
  sendRequest,
  getCurrentUser,
  getInfoAboutActor,
  getInfoAboutFilm,
  checkAuth,
  getNProfilePagesBlocks,
  changeSettings,
  changeAvatar,
  getProfile,
  register,
  login,
};
