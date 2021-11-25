import {EVENTS} from '../consts/EVENTS.js';
import {getGenres} from '../modules/http';
import {convertArrayToGenresPage} from '../modules/adapters';
import {statuses} from '../consts/reqStatuses';

/**
 * Class representing genres page model.
 */
export class GenresPageModel {
  /**
   * Create a genres page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getGenresPageContent = () => {
    getGenres()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          }
          if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.genresPage.render.content, convertArrayToGenresPage(response.body));
          }
        });
  }
}
