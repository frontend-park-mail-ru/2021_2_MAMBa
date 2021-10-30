import {HomePageController} from './controllers/homeController.js';
import {ActorPagePageController} from './controllers/actorController.js';
import {FilmPagePageController} from './controllers/filmController';

import {Router} from './modules/router.js';
import {Routes} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const homePageController = new HomePageController();
const actorPagePageController = new ActorPagePageController();
const filmPagePageController = new FilmPagePageController();

const router = new Router(ROOT);

router.register(Routes.homePage, homePageController)
    .register(Routes.actorPage, actorPagePageController)
    .register(Routes.filmPage, filmPagePageController)
    .start();

