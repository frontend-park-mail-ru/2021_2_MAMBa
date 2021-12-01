import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';
import {GenresView} from '../views/GenresView/GenresView';
import {GenresPageModel} from '../models/genresModel';

/** Class representing genres page controller. */
export class GenresPageController extends BaseController {
  /**
   * Create an genres page controller.
   */
  constructor() {
    super(GenresView, GenresPageModel);
    this.events.push(
        {event: EVENTS.genresPage.render.content, handler: this.view.renderContent},
        {event: EVENTS.genresPage.genresPageContent, handler: this.model.getGenresPageContent},
    );
  }
}
