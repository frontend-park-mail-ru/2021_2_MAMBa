import {BaseView} from '../BaseView/BaseView.js';
import calendarPageContent from '../../components/calendar/calendar.pug';
import calendarFilmsContent from '../../components/calendarShowMore/calendarShowMore.pug';
import premieresNotFound from '../../components/premieresNotFound/premieresNotFound.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {eventBus} from '../../modules/eventBus';

/** Class representing genre page view. */
export class CalendarView extends BaseView {
  /**
   * Create calendar page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for genre page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.isLoading = false;
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
      this.showScrollMore(data);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  showScrollMore = (data, condition) => {
    if (!condition) {
      condition = true;
    }
    const block = document.getElementById('infinite-scroll');
    window.addEventListener('scroll', () => {
      if (this.isLoading === true) {
        return;
      }
      const contentHeight = block.offsetHeight;
      const yOffset = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const y = yOffset + windowHeight;
      if (y >= contentHeight + 300 && condition) {
        const newData = nextMonth(data.year, data.month);
        data.year = newData[0];
        data.month = newData[1];
        this.isLoading = true;

        eventBus.emit( EVENTS.calendarPage.getFilms, data.year, data.month);
      }
    });

    const nextMonth = (year, month) => {
      if (month === 12) {
        month = 1;
        year += 1;
      } else {
        month += 1;
      }
      return [year, month];
    };
  };


  /**
   * Render content calendar page from pug template to content div.
   * @param {object} data - Contains info about premieres.
   */
  renderCalendarFilms = (data) => {
    const template = calendarFilmsContent(data);
    const showMoreContainer = document.getElementById('infinite-scroll');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
      this.isLoading = false;
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
      this.isLoading = false;
    }
  }
}
