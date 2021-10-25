import {eventBus} from '../modules/eventBus.js';
import {HomePageModel} from '../models/homePage.js';
import {HomePageView} from '../views/HomeView/HomeView.js';
import {Controller} from './controller.js';
import {Events} from '../consts/events';

/** Class representing home page controller. */
export class HomePageController extends Controller {
  /**
   * Create an home page controller.
   */
  constructor() {
    super();
    this.eventBus = eventBus;
    this.model = new HomePageModel(this.eventBus);
    this.view = new HomePageView(this.eventBus);
    this.eventBus.on(Events.Homepage.Render.Page, this.view.render);
    this.eventBus.on(Events.Homepage.Render.Header, this.view.renderHeader);
    this.eventBus.on(Events.Homepage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.Homepage.Render.ErrorPage, this.view.renderErrorPage);
  }
}
