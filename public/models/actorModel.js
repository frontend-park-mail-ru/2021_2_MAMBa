import {Events} from '../consts/events.js';
import {getActorFilms, getInfoAboutActor} from '../modules/http';

/** Class representing actor page model.
 * @param {object} actor - info about actor(id).
 */
export class ActorPageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Get info for actor page emit render content.
   * @param {object} actor - actor to render.
   */
  getPageContent = (actor) => {
    if (!actor?.id) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getInfoAboutActor(actor.id)
        .then((contentData) => {
          if (!contentData) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          } else {
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
          }
        });
  }

  getActorFilmsContent = (actor) => {
    if (!actor?.id && !actor?.limit && !actor?.limit) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getActorFilms(actor.id, actor.limit, actor.limit)
        .then((contentData) => {
          if (!contentData) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          } else {
            this.eventBus.emit(Events.ActorPage.Render.Films, contentData);
          }
        });
  }
}
