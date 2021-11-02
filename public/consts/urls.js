// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8086';

// eslint-disable-next-line no-unused-vars
const deployUrl = 'https://film4u.club';

const COLLECTIONS_COUNT = 12;
const COLLECTIONS_LIMIT = 0;

export const currentUrl = deployUrl;

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
    getUser: `${currentUrl}/api/user/`,
    getProfile: `${currentUrl}/api/user/getProfile`,
    changeSettings: `${currentUrl}/api/user/changeProfile`,
    changeAvatar: `${currentUrl}/api/user/changeAvatar`,
    getBookmarks: `${currentUrl}/api/user/getBookmarks`,
    getReviewsAndStars: `${currentUrl}/api/user/getReviewsAndStars`,
    getSubscriptions: `${currentUrl}/api/user/getSubscriptions`,
    me: `${currentUrl}/api/me`,
    collections: `${currentUrl}/api/collections/getCollections?skip=${COLLECTIONS_LIMIT}&limit=${COLLECTIONS_COUNT}`,
    actor: `${currentUrl}/api/person/getPerson?id=`,
    actorFilms: `${currentUrl}/api/person/getPersonFilms?id=`,
    review: `${currentUrl}/api/film/getReview?id=`,
    sendReview: `${currentUrl}/api/film/postReview`,
    film: `${currentUrl}/api/film/getFilm?id=`,
  },
};
