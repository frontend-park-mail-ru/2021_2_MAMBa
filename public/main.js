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
import {CalendarPageController} from './controllers/calendarController';

import {Router} from './modules/router.js';
import {ROUTES} from './consts/routes.js';
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

const router = new Router(ROOT);

router.register(ROUTES.homePage, homePageController)
    .register(ROUTES.filmPage, filmPageController)
    .register(ROUTES.reviewPage, reviewPageController)
    .register(ROUTES.collectionPage, collectionPageController)
    .register(ROUTES.AuthPage, authPageController)
    .register(ROUTES.RegPage, authPageController)
    .register(ROUTES.Profile, profileController)
    .register(ROUTES.actorPage, actorPageController)
    .register(ROUTES.genres, genresPageController)
    .register(ROUTES.genrePage, genrePageController)
    .register(ROUTES.calendarPage, calendarPageController)
    .start();
