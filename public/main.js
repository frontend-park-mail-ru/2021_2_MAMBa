import {HeaderController} from './controllers/headerController.js';
import {AuthPageController} from './controllers/authController.js';
import {authModule} from './modules/authorization.js';
import {HomePageController} from './controllers/homeController.js';
import {ActorPagePageController} from './controllers/actorController.js';

import {Router} from './modules/router.js';
import {Routes} from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const AuthModule = authModule;
const headerController = new HeaderController();
const homePageController = new HomePageController();
const actorPagePageController = new ActorPagePageController();
const authPageController = new AuthPageController();

const router = new Router(ROOT);

router.register(Routes.HomePage, homePageController)
    .register(Routes.ActorPage, actorPagePageController)
    .register(Routes.AuthPage, authPageController)
    .register(Routes.RegPage, authPageController)
    .start();
