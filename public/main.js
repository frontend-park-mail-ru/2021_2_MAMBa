import {HomePageController} from './controllers/homePage.js';
import {ActorPagePageController} from './controllers/actorPage.js';
import {AuthPageController} from './controllers/authPage.js';
import {HeaderController} from './controllers/header.js';
import {AuthorizationModel} from './models/authorization';


import Router from './modules/router.js';
import Routes from './consts/routes.js';

import './index.scss';

export const ROOT = document.getElementById('root');

const authorizationModel = new AuthorizationModel();
const headerController = new HeaderController();
const homePageController = new HomePageController();
const actorPagePageController = new ActorPagePageController();
const authPageController = new AuthPageController();

const router = new Router(ROOT);

router.register(Routes.HomePage, homePageController)
    .register(Routes.ActorPage, actorPagePageController)
    .register(Routes.AuthPage, authPageController)
    .start();
