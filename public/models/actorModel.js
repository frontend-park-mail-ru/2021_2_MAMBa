import {EVENTS} from '../consts/EVENTS.js';
import {getActorFilms, getInfoAboutActor} from '../modules/http';
import {convertArrayToActorFilms, convertArrayToActorPage} from '../modules/adapters';
import {updateRenderFilmsData} from '../utils/showMore.js';
import {statuses} from '../consts/reqStatuses';

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
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.actorPage.render.content, convertArrayToActorPage(response.body));
          }
          if (response.parsedJson.status === statuses.NOT_FOUND) {
            this.eventBus.emit(EVENTS.App.ErrorPageText, "На нашем сайте такого фильма нет");
          }
        });
  }

  getActorFilmsContent = (actor, dataBeforeShowMore) => {
    if (!actor?.id && !actor?.skip && !actor?.limit) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getActorFilms(actor.id, actor.skip, actor.limit)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response?.status === statuses.OK && response.body) {
            const data = convertArrayToActorFilms(response.body);
            updateRenderFilmsData(data, dataBeforeShowMore);
            this.eventBus.emit(EVENTS.actorPage.render.films, data);
          }
        });
  }
}
