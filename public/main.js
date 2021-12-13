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
import {CalendarPageController} from './controllers/calendarController';

import {Router} from './modules/router.js';
import {REGROUTES} from './consts/routesRegExp.js';
import {errorPage} from './modules/404.js';

import './index.scss';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js', {scope: '/'})
//       .then((registration) => {
//         console.log('sw registration on scope:', registration.scope);
//       })
//       .catch((err) => {
//       });
// }

export const ROOT = document.getElementById('root');

const AuthModule = authModule;
const error = new errorPage();
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
    .start();
