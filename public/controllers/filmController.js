import {BaseController} from './baseController.js';
import {FilmPageModel} from '../models/filModel.js';
import {FilmView} from '../views/FilmView.js';
import {Events} from '../consts/events';

/** Class representing film page controller. */
export class FilmPagePageController extends BaseController {
  /**
   * Create an film page controller.
   */
  constructor() {
    super(FilmView, FilmPageModel);
    this.subscribe();
  }

  subscribe = () => {
    this.eventBus.on(Events.FilmPage.GetPageContent, this.model.getPageContent);
    this.eventBus.on(Events.FilmPage.Render.Page, this.view.render);
    this.eventBus.on(Events.FilmPage.Render.Content, this.view.renderContent);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.FilmPage.GetPageContent, this.model.getPageContent);
    this.eventBus.off(Events.FilmPage.Render.Page, this.view.render);
    this.eventBus.off(Events.FilmPage.Render.Content, this.view.renderContent);
  }
}
