import {Events} from '../consts/events.js';
import {getActorFilms, getInfoAboutActor} from '../modules/http';

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
  }

  /**
   * Get info for actor page emit render content.
   */
  getPageContent = (actor) => {
    if (actor === undefined || actor.id === undefined) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
    getInfoAboutActor(actor.id)
        .then((contentData) => {
          if (contentData !== undefined)
            console.log(contentData);
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
        }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }

  getActorFilmsContent = (actor) => {
    getActorFilms(actor.id, actor.limit, actor.skip)
        .then((contentData) => {
          if (contentData !== undefined)
            this.eventBus.emit(Events.ActorPage.Render.Films, contentData);
        }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }
}
