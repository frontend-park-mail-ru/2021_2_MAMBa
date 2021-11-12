import {EVENTS} from '../consts/EVENTS.js';
import {getCollectionFilms} from '../modules/http';
import {convertCollectionToCollectionPage} from '../modules/adapters';

/** Class representing collection page model.
 * @param {object} collection - info about collection(id).
 */
export class CollectionPageModel {
  /**
   * Create a collection page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Get info for collection page emit render content.
   * @param {object} collection - collection to render.
   */
  getPageContent = (collection) => {
    if (!collection?.id) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getCollectionFilms(collection.id)
        .then((response) => {
          if (!response || !response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.collectionPage.render.content, convertCollectionToCollectionPage(response.body));
          }
        });
  }
}
