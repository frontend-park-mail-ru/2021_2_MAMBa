import {HomePageController} from './controllers/homeController.js';
import {HeaderController} from './controllers/headerController.js';
import {authModule} from './modules/authorization.js';
import {FilmPageController} from './controllers/filmController.js';
import {ReviewPageController} from './controllers/reviewController.js';
import {AuthPageController} from './controllers/authController.js';
import {ProfileController} from './controllers/profileController.js';
import {ActorPageController} from './controllers/actorController.js';
import {CollectionPageController} from './controllers/collectionController.js';
import {GenresPageController} from './controllers/genresController';
import {GenrePageController} from './controllers/genreController';
import {SearchController} from './controllers/searchController.js';
import {RandomController} from './controllers/randomController.js';
import {CalendarPageController} from './controllers/calendarController';

import {Router} from './modules/router.js';
import {REGROUTES} from './consts/routesRegExp.js';
import {errorPage} from './modules/404.js';
import {errorPageText} from './modules/404Text';

import './index.scss';
import {CollectionsPageController} from './controllers/collectionsController';
import {initializeApp} from 'firebase/app';
import {getMessaging, onMessage, getToken} from 'firebase/messaging';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js', {scope: '/'})
//       .then((registration) => {
//         console.log('sw registration on scope:', registration.scope);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCPmCF5tpc8JqtCsY5Jndeki2353RWNTcg',
  authDomain: 'film4u-83b5d.firebaseapp.com',
  projectId: 'film4u-83b5d',
  storageBucket: 'film4u-83b5d.appspot.com',
  messagingSenderId: '1081604991906',
  appId: '1:1081604991906:web:ee3348c5d9eb38ddf760fb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();
getToken(messaging, {vapidKey: 'BIfcfgyjgd3fPzG_8gS5SD9O9aRs2T-P9541lwshLM-G0X9J4prDCmZSsIqbPA4x-FT9aN6vhxqFzjPtBQETOmU'}).then((currentToken) => {
  if (currentToken) {
    fetch('https://film4u.club/api/user/subscribePush', {
      method: 'POST',
      body: JSON.stringify({token: currentToken}),
    }).finally();
    console.log(`token: ${currentToken}`);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

onMessage(messaging, (payload) => {
  const greeting = new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: 'https://film4u.club/assets/favicon.ico',
  });
});


export const ROOT = document.getElementById('root');

const AuthModule = authModule;
const error = new errorPage();
const errorText = new errorPageText();
const headerController = new HeaderController();
const homePageController = new HomePageController();
const actorPageController = new ActorPageController();
const authPageController = new AuthPageController();
const profileController = new ProfileController();
const filmPageController = new FilmPageController();
const reviewPageController = new ReviewPageController();
const collectionPageController = new CollectionPageController();
const genresPageController = new GenresPageController();
const genrePageController = new GenrePageController();
const calendarPageController = new CalendarPageController();
const searchController = new SearchController();
const collectionsController = new CollectionsPageController();
const randomController = new RandomController();

const router = new Router(ROOT);

router.register(REGROUTES.homePage, homePageController)
    .register(REGROUTES.filmPage, filmPageController)
    .register(REGROUTES.reviewPage, reviewPageController)
    .register(REGROUTES.collectionPage, collectionPageController)
    .register(REGROUTES.AuthPage, authPageController)
    .register(REGROUTES.RegPage, authPageController)
    .register(REGROUTES.Profile, profileController)
    .register(REGROUTES.actorPage, actorPageController)
    .register(REGROUTES.genres, genresPageController)
    .register(REGROUTES.genrePage, genrePageController)
    .register(REGROUTES.calendarPage, calendarPageController)
    .register(REGROUTES.search, searchController)
    .register(REGROUTES.collections, collectionsController)
    .register(REGROUTES.randomPage, randomController)
    .start();
