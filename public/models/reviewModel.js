import {EVENTS} from '../consts/EVENTS.js';
import {convertReviewToReviewPage} from '../modules/adapters';
import {getInfoAboutReview} from '../modules/http';
import {statuses} from '../consts/reqStatuses';

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
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getInfoAboutReview(review.id)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.reviewPage.render.content, convertReviewToReviewPage(response.body));
          } else if (response.parsedJson.status === statuses.NOT_FOUND) {
            this.eventBus.emit(EVENTS.App.ErrorPageText, 'На нашем сайте такого отзыва нет');
          }
        });
  }
}
