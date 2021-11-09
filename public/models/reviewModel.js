import {Events} from '../consts/events.js';
import {convertReviewToReviewPage} from '../modules/adapters';
import {getInfoAboutReview} from '../modules/http';

/** Class representing actor page model.
 * @param {object} review - info about review(id).
 */
export class ReviewPageModel {
  /**
   * Create a review page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getPageContent = (review) => {
    if (!review?.id) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getInfoAboutReview(review.id)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          }
          if (response.status === 200 && response.body) {
            this.eventBus.emit(Events.ReviewPage.Render.Content, convertReviewToReviewPage(response.body));
          }
        });
  }
}
