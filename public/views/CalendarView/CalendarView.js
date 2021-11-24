import {BaseView} from '../BaseView/BaseView.js';
import calendarPageContent from '../../components/calendar/calendar.pug';
import calendarFilmsContent from '../../components/calendarShowMore/calendarShowMore.pug';
import premieresNotFound from '../../components/premieresNotFound/premieresNotFound.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {showScrollMore} from '../../utils/showMore.js';

/** Class representing genre page view. */
export class CalendarView extends BaseView {
  /**
   * Create calendar page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for genre page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html genre page from pug template.
   */
  emitGetContent = () => {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth();
    this.eventBus.emit(EVENTS.calendarPage.getPageContent, year, month + 1);
  }

  /**
   * Render content calendar page from pug template to content div.
   * @param {Object} data - Contains info about date(year and month) of premiers.
   */
  renderContent = (data) => {
    const template = calendarPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      showScrollMore(data, EVENTS.calendarPage.getFilms);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  /**
   * Render content calendar page from pug template to content div.
   * @param {object} data - Contains info about premieres.
   */
  renderCalendarFilms = (data) => {
    const template = calendarFilmsContent(data);
    const showMoreContainer = document.getElementById('infinite-scroll');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
  }

  /**
   * Render content of not found premiers from pug template.
   * @param {object} date - Contains date of not found premieres.
   */
  renderNotFound = (date) => {
    const dateObject = {
      dateCalendar: date,
    };
    const template = premieresNotFound(dateObject);
    const showMoreContainer = document.querySelector('.premiere__container');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
  }
}
