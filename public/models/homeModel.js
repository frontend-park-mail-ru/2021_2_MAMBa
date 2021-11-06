import {getCollections} from '../modules/http.js';
import {Events} from '../consts/events.js';

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
        .then((data) => {
          if (data) {
            this.eventBus.emit(Events.Homepage.Render.Content, data);
          } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          }
        });
  }
}
