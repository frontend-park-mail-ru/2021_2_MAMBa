import {HomePageController} from './controllers/homePage.js';
import {ActorPagePageController} from './controllers/actorPage.js';


import {Router} from './modules/router.js';
import {Routes} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const homePageController = new HomePageController();
const actorPagePageController = new ActorPagePageController();

const router = new Router(ROOT);

router.register(Routes.homePage, homePageController)
    .register(Routes.actorPage, actorPagePageController)
    .start();

