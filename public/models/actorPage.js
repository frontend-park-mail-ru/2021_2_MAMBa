import {Events} from '../consts/events.js';
import {getInfoAboutActor} from '../modules/http';

/** Class representing actor page model.
 * @param {Object} actor - info about actor(id).
 */
export class ActorPageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on(Events.ActorPage.GetPageContent, this.getPageContent);
  }

    getPageContent = (actor) => {
      getInfoAboutActor(actor.id).then((contentData) => {
        this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
      }).catch((err) => {
        this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      });
    }
}
