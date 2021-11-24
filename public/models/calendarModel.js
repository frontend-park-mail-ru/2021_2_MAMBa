import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutPremiers} from '../modules/http';
import {convertArrayToCalendarPage} from '../modules/adapters';

/** Class representing calendar page model.
 * @param {object} films - info about release films.
 */
export class CalendarPageModel {
  /**
   * Create a calendar page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Get info for calendar page emit render content.
   * @param {number} year - year of premiers to render.
   * @param {number} month - month of premiers to render.
   */
  getPageContent = (year, month) => {
    getInfoAboutPremiers(year, month)
        .then((response) => {
          if (!response.status) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.calendarPage.render.content, convertArrayToCalendarPage(response.body, year, month));
          }
          // TODO: отрисовывать стр если premieres нет в бд
          // if (response.parsedJson.status === 404) {}
        });
  }

  // getGenreFilmsContent = (genre) => {
  //   if (!genre?.id && !genre?.skip && !genre?.limit) {
  //     this.eventBus.emit(EVENTS.App.ErrorPage);
  //     return;
  //   }
  //   getGenreFilms(genre.id, genre.skip, genre.limit)
  //       .then((response) => {
  //         if (!response) {
  //           this.eventBus.emit(EVENTS.App.ErrorPage);
  //         } else if (response.status === 200 && response.body) {
  //           this.eventBus.emit(EVENTS.genrePage.render.films, convertArrayToActorFilms(response.body));
  //         }
  //       });
  // }
}
