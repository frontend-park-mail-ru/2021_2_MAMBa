import {BaseController} from './baseController.js';
import {FilmPageModel} from '../models/filmModel.js';
import {FilmView} from '../views/FilmView/FilmView.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing film page controller. */
export class FilmPageController extends BaseController {
  /**
   * Create an film page controller.
   */
  constructor() {
    super(FilmView, FilmPageModel);
    this.events.push(
        {event: EVENTS.FilmPage.GetPageContent, handler: this.model.getPageContent},
        {event: EVENTS.FilmPage.PostReview, handler: this.model.postReview},
        {event: EVENTS.FilmPage.Render.Page, handler: this.view.render},
        {event: EVENTS.FilmPage.Render.Content, handler: this.view.renderContent},
        {event: EVENTS.FilmPage.Render.WarningSend, handler: this.view.renderWarning},
        {event: EVENTS.FilmPage.Render.SuccessfulSend, handler:this.view.renderSuccessfulSend},
        {event: EVENTS.FilmPage.PostRating, handler: this.model.postRating},
        {event: EVENTS.FilmPage.Render.WarningRatingSend, handler:this.view.renderWarningRatingSend},
        {event: EVENTS.FilmPage.Render.SuccessfulRatingSend, handler: this.view.renderSuccessfulRatingSend},
    );
  }
}
