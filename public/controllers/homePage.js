import {eventBus} from '../modules/eventBus.js';
import {HomePageModel} from '../models/homePage.js';
import {HomePageView} from '../views/HomeView/HomeView.js';
import {Controller} from './controller.js';
import Events from "../consts/events";

export class HomePageController extends Controller {
  constructor() {
    super(HomePageView, HomePageModel);
    this.subscribe();
  }
  subscribe = () => {
    this.eventBus.on(Events.Homepage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.Homepage.Render.ErrorPage, this.view.renderErrorPage);
    this.eventBus.on(Events.Homepage.Get.MainPageContent, this.model.getMainPageContent);
    this.eventBus.on(Events.Homepage.Get.InfoForHeader, this.model.getInfoForHeader);
  }
  unsubscribe = () => {
    this.eventBus.off(Events.Homepage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.Homepage.Render.ErrorPage, this.view.renderErrorPage);
    this.eventBus.off(Events.Homepage.Get.MainPageContent, this.model.getMainPageContent);
    this.eventBus.off(Events.Homepage.Get.InfoForHeader, this.model.getInfoForHeader);
  }
}
