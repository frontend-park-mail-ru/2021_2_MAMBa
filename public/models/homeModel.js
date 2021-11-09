import {getCollections} from '../modules/http.js';
import {Events} from '../consts/events.js';
import {convertArrayToCollectionsPage} from '../modules/adapters';

/**
 * Class representing home page model.
 */
export class HomePageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  getMainPageContent = () => {
    getCollections()
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          }
          if (response.status === 200 && response.body) {
            this.eventBus.emit(Events.Homepage.Render.Content, convertArrayToCollectionsPage(response.body));
          }
        });
  }
}
