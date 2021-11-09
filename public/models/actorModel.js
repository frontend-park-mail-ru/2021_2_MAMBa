import {Events} from '../consts/events.js';
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
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getInfoAboutActor(actor.id)
        .then((response) => {
          if (!response.status) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(Events.ActorPage.Render.Content, convertArrayToActorPage(response.body));
          }
          // TODO: отрисовывать стр если актера нет в бд
          // if (response.parsedJson.status === 404) {}
        });
  }

  getActorFilmsContent = (actor) => {
    if (!actor?.id && !actor?.limit && !actor?.limit) {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
      return;
    }
    getActorFilms(actor.id, actor.limit, actor.limit)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(Events.ActorPage.Render.Films, convertArrayToActorFilms(response.body));
          }
        });
  }
}
