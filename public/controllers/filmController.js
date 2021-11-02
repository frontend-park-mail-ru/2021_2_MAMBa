import {BaseController} from './baseController.js';
import {FilmPageModel} from '../models/filmModel.js';
import {FilmView} from '../views/FilmView/FilmView.js';
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
    this.eventBus.on(Events.FilmPage.PostReview, this.model.postReview);
    this.eventBus.on(Events.FilmPage.Render.Page, this.view.render);
    this.eventBus.on(Events.FilmPage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.FilmPage.Render.WarningSend, this.view.renderWarning);
    this.eventBus.on(Events.FilmPage.Render.SuccessfulSend, this.view.renderSuccessfulSend);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.FilmPage.GetPageContent, this.model.getPageContent);
    this.eventBus.off(Events.FilmPage.Render.Page, this.view.render);
    this.eventBus.off(Events.FilmPage.Render.Content, this.view.renderContent);
  }
}
