import {HomePageModel} from '../models/homeModel';
import {HomePageView} from '../views/HomeView/HomeView.js';
import {BaseController} from './baseController.js';
import {Events} from '../consts/events';

/** Class representing home page controller. */
export class HomePageController extends BaseController {
  /**
   * Create an home page controller.
   */
  constructor() {
    super(HomePageView, HomePageModel);
    this.subscribe();
  }

  subscribe = () => {
    this.eventBus.on(Events.Homepage.Get.MainPageContent, this.model.getMainPageContent);
    // this.eventBus.on(Events.Homepage.Get.InfoForHeader, this.model.getInfoForHeader);
    this.eventBus.on(Events.Homepage.Render.Page, this.view.render);
    this.eventBus.on(Events.Homepage.Render.Header, this.view.renderHeader);
    this.eventBus.on(Events.Homepage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.Homepage.Render.ErrorPage, this.view.renderErrorPage);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.Homepage.Get.MainPageContent, this.model.getMainPageContent);
    this.eventBus.off(Events.Homepage.Get.InfoForHeader, this.model.getInfoForHeader);
    this.eventBus.off(Events.Homepage.Render.Page, this.view.render);
    this.eventBus.off(Events.Homepage.Render.Header, this.view.renderHeader);
    this.eventBus.off(Events.Homepage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.Homepage.Render.ErrorPage, this.view.renderErrorPage);
  }
}
