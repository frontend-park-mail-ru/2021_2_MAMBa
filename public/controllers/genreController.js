import {BaseController} from './baseController.js';
import {GenrePageModel} from '../models/genreModel.js';
import {GenreView} from '../views/GenreView/GenreView.js';
import {EVENTS} from '../consts/EVENTS';
import {renderWarning} from '../utils/utils.js';

/** Class representing genre page controller. */
export class GenrePageController extends BaseController {
  /**
   * Create an genre page controller.
   */
  constructor() {
    super(GenreView, GenrePageModel);
    this.events.push(
        {event: EVENTS.genrePage.render.content, handler: this.view.renderContent},
        {event: EVENTS.genrePage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.genrePage.getFilms, handler: this.model.getGenreFilmsContent},
        {event: EVENTS.genrePage.render.films, handler: this.view.renderFilms},
        {event: EVENTS.genrePage.render.notFoundFilms, handler: renderWarning},
    );
  }
}
