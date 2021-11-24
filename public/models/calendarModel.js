import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutPremiers} from '../modules/http';
import {convertArrayToCalendarPage, convertDateToCalendarPage} from '../modules/adapters';

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
            this.eventBus.emit(EVENTS.calendarPage.render.content,
                convertArrayToCalendarPage(response.body, year, month));
          } else if (response.status === 404) {
            this.eventBus.emit(EVENTS.calendarPage.render.notFoundPremiers, year, month);
          }
        });
  }

  getCalendarFilmsContent = (year, month) => {
    if (!year && !month) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    getInfoAboutPremiers(year, month)
        .then((response) => {
          if (!response) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          } else if (response.status === 200 && response.body) {
            this.eventBus.emit(EVENTS.calendarPage.render.films,
                convertArrayToCalendarPage(response.body, year, month));
          } else if (response.status === 404) {
            this.eventBus.emit(EVENTS.calendarPage.render.notFoundPremiers,
                convertDateToCalendarPage(month, year), year, month);
          }
        });
  }
}
