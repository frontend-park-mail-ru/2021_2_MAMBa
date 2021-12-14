import {statuses} from '../consts/reqStatuses';
import {URLS} from '../consts/urls.js';
import regeneratorRuntime from 'regenerator-runtime';

/**
 * Send async post request using async func.
 * @param {number} filmId - film`s id of rating.
 * @param {number} rating - rating to post.
 */
const sendRating = async (filmId, rating) => {
  const params = {
    url: `${URLS.api.sendRating}${filmId}&rating=${rating}`,
    method: 'POST',
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
 * Send async post request using async func.
 * @param {object} review - review to post.
 */
const sendReview = async (review) => {
  const params = {
    url: URLS.api.sendReview,
    method: 'POST',
    body: JSON.stringify(review),
  };
  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

const getInfoAboutFilm = async (filmId) => {
  const params = {
    url: `${URLS.api.film}${filmId}`,
    method: 'GET',
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
 * Send async get request using async func.
 * @param {object} reviewId - Contains id of review to render.
 * @return {array} - Array of objects for render review page.
 */
const getInfoAboutReview = async (reviewId) => {
  const params = {
    url: `${URLS.api.review}${reviewId}`,
    method: 'GET',
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
    if (responseStatus === statuses.OK) {
      return responseBody;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {number} actorId - Contains id of actor to render.
 * @param {number} skip - Contains count 0f rendered films.
 * @param {number} limit - Contains count of films to render.
 * @return {array} - Array of objects for render actor page.
 */
const getActorFilms = async (actorId, skip, limit) => {
  const params = {
    url: `${URLS.api.actorFilms}${actorId}&skip=${skip}&limit=${limit}`,
    method: 'GET',
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
    if (responseStatus === statuses.OK) {
      return (responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {object} collectionId - Contains id of collection to render.
 * @return {array} - Array of objects for render collection page.
 */
const getCollectionFilms = async (collectionId) => {
  const params = {
    url: `${URLS.api.collectionFilms}${collectionId}`,
    method: 'GET',
  };

  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === statuses.OK) {
      return (responseBody);
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
    if (response.status !== statuses.OK) {
      return null;
    }
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

const changeAvatar = async (formData) => {
  const response = await fetch(URLS.api.changeAvatar, {
    method: 'POST',
    body: formData,
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
 * @return {promise} - user id if you authorized, null in another case.
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

const getSearch = async (value, skipFilms, limitFilms, skipPersons, limitPersons) => {
  const params = {
    url: URLS.api.search + `?query=${value}&limit_films=${limitFilms}&skip_films=${skipFilms}` +
        `&limit_persons=${limitPersons}&skip_persons=${skipPersons}`,
    method: 'GET',
  };

  try {
    return await sendRequest(params);
  } catch (err) {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @return {array} - Array of objects for render genres page.
 */
const getGenres = async () => {
  const params = {
    url: URLS.api.genres,
    method: 'GET',
    credentials: 'include',
  };
  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === statuses.OK) {
      return (responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Send async get request using async func.
 * @param {object} genreId - Contains id of genres to render.
 * @return {array} - Array of objects for render genre page.
 */
const getInfoAboutGenre = async (genreId) => {
  const limit = 6;
  const skip = 0;
  const params = {
    url: `${URLS.api.genre}${genreId}&skip=${skip}&limit=${limit}`,
    method: 'GET',
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
 * Send async get request using async func.
 * @param {number} genreId - Contains id of genre to render.
 * @param {number} skip - Contains count 0f rendered films.
 * @param {number} limit - Contains count of films to render.
 * @return {array} - Array of objects for render actor page.
 */
const getGenreFilms = async (genreId, skip, limit) => {
  const params = {
    url: `${URLS.api.genre}${genreId}&skip=${skip}&limit=${limit}`,
    method: 'GET',
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
 * Send async get request using async func.
 * @param {number} year - Contains year 0f premiers.
 * @param {number} month - Contains month of premiers to render.
 * @return {array} - Array of objects for render calendar page.
 */
const getInfoAboutPremiers = async (year, month) => {
  const params = {
    url: `${URLS.api.calendar}?month=${month}&year=${year}&skip=0&limit=10`,
    method: 'GET',
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
 * Send async post request using async func.
 * @param {number} filmId - film`s id of rating.
 * @param {boolean} bookmarked - status of future bookmark.
 */
const sendBookmark = async (filmId, bookmarked) => {
  const params = {
    url: `${URLS.api.sendBookmark}${filmId}&bookmarked=${bookmarked}`,
    method: 'POST',
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
 * Send async get request using async func.
 * @return {array} - Array of objects for render home page.
 */
const getMainPageContent = async () => {
  const params = {
    url: URLS.api.collections,
    method: 'GET',
    credentials: 'include',
  };
  try {
    const {status: responseStatus, parsedJson: responseBody} =
        await sendRequest(params);
    if (responseStatus === statuses.OK) {
      return (responseBody);
    }
    return null;
  } catch {
    return null;
  }
};

export {
  getCollectionFilms,
  sendReview,
  sendRating,
  getActorFilms,
  getCollections,
  getInfoAboutReview,
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
  logout,
  getGenres,
  getInfoAboutGenre,
  getGenreFilms,
  getInfoAboutPremiers,
  sendBookmark,
  getSearch,
  getMainPageContent
};

