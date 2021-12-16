import {getMainPageContent} from '../modules/http.js';
import {EVENTS} from '../consts/EVENTS.js';
import {
  convertArrayToHomeMainSliderPage,
} from '../modules/adapters';
import {statuses} from '../consts/reqStatuses';

/**
 * Class representing home page model.
 */
export class HomePageModel {
  /**
   * Create a home page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getMainPageContent = () => {
    getMainPageContent()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.homepage.render.content, convertArrayToHomeMainSliderPage(response.body));
          }
        });
  }
}
