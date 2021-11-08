// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8084';

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
    collections: `${currentUrl}/api/collections/getCollections/skip=0&limit=12`,
    // actor: `${currentUrl}/api/actor/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=6&id=`,
    actor: `${currentUrl}/api/person/getPerson?id=4`,
  },
};
