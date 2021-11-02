import {HomePageController} from './controllers/homeController.js';
import {FilmPagePageController} from './controllers/filmController.js';
import {ReviewPagePageController} from './controllers/reviewController.js';
import {HeaderController} from './controllers/header.js';
import {AuthPageController} from './controllers/authController.js';
import {authModule} from './modules/authorization.js';
import {ProfileController} from './controllers/profileController.js';
import {ActorPageController} from './controllers/actorController.js';

import {Router} from './modules/router.js';
import {ROUTES} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const homePageController = new HomePageController();
const actorPageController = new ActorPageController();

const router = new Router(ROOT);

router.register(Routes.homePage, homePageController)
    .register(Routes.actorPage, actorPagePageController)
    .register(Routes.filmPage, filmPagePageController)
    .register(Routes.reviewPage, reviewPagePageController)
    .register(Routes.AuthPage, authPageController)
    .register(Routes.RegPage, authPageController)
    .register(Routes.Profile, profileController)
router.register(ROUTES.homePage, homePageController)
    .register(ROUTES.actorPage, actorPageController)
    .start();

