import {BaseController} from './baseController.js';
import {ReviewPageModel} from '../models/reviewModel';
import {ReviewView} from '../views/ReviewView';
import {EVENTS} from '../consts/EVENTS';

/** Class representing review page controller. */
export class ReviewPageController extends BaseController {
  /**
   * Create an review page controller.
   */
  constructor() {
    super(ReviewView, ReviewPageModel);
    this.events.push(
        {event: EVENTS.ReviewPage.GetPageContent, handler: this.model.getPageContent},
        {event: EVENTS.ReviewPage.Render.Page, handler: this.view.render},
        {event: EVENTS.ReviewPage.Render.Content, handler: this.view.renderContent},
       );
  }
}
