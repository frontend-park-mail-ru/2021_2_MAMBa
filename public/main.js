import {HomePageController} from './controllers/homeController.js';
import {FilmPagePageController} from './controllers/filmController.js';
import {ReviewPagePageController} from './controllers/reviewController.js';
import {AuthPageController} from './controllers/authController.js';
import {ProfileController} from './controllers/profileController.js';
import {ActorPageController} from './controllers/actorController.js';

import {Router} from './modules/router.js';
import {ROUTES} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const homePageController = new HomePageController();
const actorPageController = new ActorPageController();
const authPageController = new AuthPageController();
const profileController = new ProfileController();
const filmPagePageController = new FilmPagePageController();
const reviewPagePageController = new ReviewPagePageController();

const router = new Router(ROOT);

router.register(ROUTES.homePage, homePageController)
    .register(ROUTES.filmPage, filmPagePageController)
    .register(ROUTES.reviewPage, reviewPagePageController)
    .register(ROUTES.AuthPage, authPageController)
    .register(ROUTES.RegPage, authPageController)
    .register(ROUTES.Profile, profileController)
    .register(ROUTES.actorPage, actorPageController)
    .start();

