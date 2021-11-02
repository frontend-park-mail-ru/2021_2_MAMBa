// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8086';

// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://film4u.club';

const COLLECTIONS_COUNT = 12;
const COLLECTIONS_LIMIT = 0;

export const currentUrl = localUrl;

export const URLS = {
  pages: {
    main: '/',
  },
  api: {
    login: `${currentUrl}/api/user/login`,
    profile: `${currentUrl}/api/user/getProfile`,
    register: `${currentUrl}/api/user/register`,
    logout: `${currentUrl}/api/user/logout`,
    checkAuth: `${currentUrl}/api/user/checkAuth`,
    getUser: `${currentUrl}/api/user/`, // +user_id
    getProfile: `${currentUrl}/api/user/getProfile`,
    changeSettings: `${currentUrl}/api/user/changeProfile`,
    changeAvatar: `${currentUrl}/api/user/changeAvatar`,
    getBookmarks: `${currentUrl}/api/user/getBookmarks`,
    getReviewsAndStars: `${currentUrl}/api/user/getReviewsAndStars`,
    getSubscriptions: `${currentUrl}/api/user/getSubscriptions`,
    collections: `${currentUrl}/api/collections/getCollections/skip=${COLLECTIONS_LIMIT}&limit=${COLLECTIONS_COUNT}`,
    actor: `${currentUrl}/api/actor/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=3&id=`,
    actorFilms: `${currentUrl}/api/person/getPersonFilms/id=`,

    review: `${currentUrl}/api/review/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=3&id=`,

    film: `${currentUrl}/api/film/getFilm/skipReview=0&limitReview=11&skipRec=0&limitRec=11&id=`,
  },
};
