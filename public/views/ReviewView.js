import {BaseView} from './BaseView/BaseView.js';
import reviewPageContent from './../components/review/review.pug';
import {EVENTS} from '../consts/EVENTS.js';
import {getPathArgs} from '../modules/router.js';

/** Class representing review page view. */
export class ReviewView extends BaseView {
  /**
   * Create review page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object}- Parameters for review page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html review page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/review/:id');
    this.eventBus.emit(EVENTS.reviewPage.getPageContent, pathArgs);
  }

  /**
   * Render content review page from pug template to content div.
   * @param {object} data - Contains info about review.
   */
  renderContent = (data) => {
    const template = reviewPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
