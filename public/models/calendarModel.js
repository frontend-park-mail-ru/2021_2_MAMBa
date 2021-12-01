import {EVENTS} from '../consts/EVENTS.js';
import {getInfoAboutPremiers} from '../modules/http';
import {convertArrayToCalendarPage, convertDateToCalendarPage} from '../modules/adapters';
import {statuses} from '../consts/reqStatuses';

/** Class representing calendar page model.
 * @param {object} year - info about film`s year.
 * @param {object} month - info about film`s month.
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
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.calendarPage.render.content,
                convertArrayToCalendarPage(response.body, year, month));
          } else if (response?.status === statuses.NOT_FOUND) {
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
          } else if (response?.status === statuses.OK && response.body) {
            this.eventBus.emit(EVENTS.calendarPage.render.films,
                convertArrayToCalendarPage(response.body, year, month));
          } else if (response.status === statuses.NOT_FOUND) {
            this.eventBus.emit(EVENTS.calendarPage.render.notFoundPremiers,
                convertDateToCalendarPage(month, year), year, month);
          }
        });
  }
}
