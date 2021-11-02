import {HomePageController} from './controllers/homeController.js';
import {ActorPageController} from './controllers/actorController.js';

import {Router} from './modules/router.js';
import {ROUTES} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const homePageController = new HomePageController();
const actorPageController = new ActorPageController();

const router = new Router(ROOT);

router.register(ROUTES.homePage, homePageController)
    .register(ROUTES.actorPage, actorPageController)
    .start();

