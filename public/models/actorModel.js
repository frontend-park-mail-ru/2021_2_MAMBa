import {EVENTS} from '../consts/EVENTS.js';
import {getActorFilms, getInfoAboutActor} from '../modules/http';
import {convertArrayToActorFilms, convertArrayToActorPage} from '../modules/adapters';

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
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getInfoAboutActor(actor.id)
        .then((response) => {
          if (!response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.actorPage.render.content, convertArrayToActorPage(response.body));
          }
          // TODO: отрисовывать стр если актера нет в бд
          // if (response.parsedJson.status === 404) {}
        });
  }

  getActorFilmsContent = (actor) => {
    if (!actor?.id && !actor?.limit && !actor?.limit) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getActorFilms(actor.id, actor.limit, actor.limit)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.actorPage.render.films, convertArrayToActorFilms(response.body));
          }
        });
  }
}
