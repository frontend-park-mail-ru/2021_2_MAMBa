import {SearchModel} from '../models/searchModel.js';
import {SearchView} from '../views/SearchView/SearchView.js';
import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing search page controller. */
export class SearchController extends BaseController {
  /**
   * Create search controller.
   */
  constructor() {
    super(SearchView, SearchModel);
    this.events.push(
        {event: EVENTS.searchPage.getContent, handler: this.model.getContent},
        {event: EVENTS.searchPage.renderEmptyPage, handler: this.view.renderEmptyPage},
        {event: EVENTS.searchPage.renderFilmsPersons, handler: this.view.renderFilmsPersons},
    );
  }
}
