import {BaseController} from './baseController.js';
import {ReviewPageModel} from '../models/reviewModel';
import {ReviewView} from '../views/ReviewView';
import {Events} from '../consts/events';

/** Class representing review page controller. */
export class ReviewPageController extends BaseController {
  /**
   * Create an review page controller.
   */
  constructor() {
    super(ReviewView, ReviewPageModel);
    this.subscribe();
  }

  subscribe = () => {
    this.eventBus.on(Events.ReviewPage.GetPageContent, this.model.getPageContent);
    this.eventBus.on(Events.ReviewPage.Render.Page, this.view.render);
    this.eventBus.on(Events.ReviewPage.Render.Content, this.view.renderContent);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.ReviewPage.GetPageContent, this.model.getPageContent);
    this.eventBus.off(Events.ReviewPage.Render.Page, this.view.render);
    this.eventBus.off(Events.ReviewPage.Render.Content, this.view.renderContent);
  }
}
