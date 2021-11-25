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
        {event: EVENTS.filmPage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.filmPage.postReview, handler: this.model.postReview},
        {event: EVENTS.filmPage.render.Page, handler: this.view.render},
        {event: EVENTS.filmPage.render.content, handler: this.view.renderContent},
        {event: EVENTS.filmPage.render.warningSend, handler: this.view.renderWarning},
        {event: EVENTS.filmPage.render.successfulSend, handler: this.view.renderSuccessfulSend},
        {event: EVENTS.filmPage.postRating, handler: this.model.postRating},
        {event: EVENTS.filmPage.postBookmark, handler: this.model.postBookmark},
        {event: EVENTS.filmPage.render.warningRatingSend, handler: this.view.renderWarningRatingSend},
        {event: EVENTS.filmPage.render.successfulRatingSend, handler: this.view.renderSuccessfulRatingSend},
    );
  }
}
