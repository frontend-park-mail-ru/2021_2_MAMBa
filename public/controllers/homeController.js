import {HomePageModel} from '../models/homeModel';
import {HomePageView} from '../views/HomeView/HomeView.js';
import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing home page controller. */
export class HomePageController extends BaseController {
  /**
   * Create an home page controller.
   */
  constructor() {
    super(HomePageView, HomePageModel);
    this.events.push(
        {event: EVENTS.homepage.get.mainPageContent, handler: this.model.getMainPageContent},
        {event: EVENTS.homepage.render.content, handler: this.view.renderContent},
    );
  }
}
