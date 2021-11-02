// eslint-disable-next-line no-unused-vars
const localUrl = 'http://localhost:8089';

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
    me: `${currentUrl}/api/me`,
    collections: `${currentUrl}/api/collections/getCollections?skip=${COLLECTIONS_LIMIT}&limit=${COLLECTIONS_COUNT}`,
    actor: `${currentUrl}/api/person/getPerson?id=`,
    actorFilms: `${currentUrl}/api/person/getPersonFilms?id=`,
  },
};
