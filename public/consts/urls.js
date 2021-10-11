const localUrl = 'http://localhost:3001';

const deployUrl = 'https://film4u.club';

const COLLECTIONS_COUNT = 12;
const COLLECTIONS_LIMIT = 0;

export const currentUrl = deployUrl;

export const URLS = {
  pages: {
    main: '/',
  },
  api: {
    me: `${currentUrl}/api/me`,
    collections: `${currentUrl}/api/collections/getCollections?skip=${COLLECTIONS_LIMIT}&limit=${COLLECTIONS_COUNT}`,
  },
};
