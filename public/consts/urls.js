const localUrl = 'http://localhost:8082';

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
    register: `${currentUrl}/api/user/register`,
    logout: `${currentUrl}/api/user/logout`,
    checkAuth: `${currentUrl}/api/user/checkAuth`,
    // getUser: `${currentUrl}/api/user/${userId}`,
    getProfile: `${currentUrl}/api/user/getProfile`,
    collections: `${currentUrl}/api/collections/getCollections/skip=${COLLECTIONS_LIMIT}&limit=${COLLECTIONS_COUNT}`,
    actor: `${currentUrl}/api/actor/getActor/skipPopular=0&limitPopular=11&skipFull=0&limitFull=6&id=`,
  },
};
