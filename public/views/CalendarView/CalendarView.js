import {BaseView} from '../BaseView/BaseView.js';
import calendarPageContent from '../../components/calendar/calendar.pug';
import calendarFilmsContent from '../../components/calendarShowMore/calendarShowMore.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';

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
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    this.eventBus.emit(EVENTS.calendarPage.getPageContent, year, month + 1);
  }

  /**
   * Render content calendar page from pug template to content div.
   * @param {Object} data - Contains info about date(year and month) of premiers.
   */
  renderContent = (data) => {
    const template = calendarPageContent(data);
    this.dataGenre = data;
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.showScrollMore(data);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  nextMonth = (year, month) => {
    if (month ==12){
      month=1
      year+=1
    }
    else {
      month+=1
    }
    return [year, month]

  }

  showScrollMore = (data) => {
    console.log("in show more");
    window.addEventListener('scroll', () => {
      const block = document.getElementById('infinite-scroll');
      const contentHeight = block.offsetHeight;
      const yOffset = window.pageYOffset;
      const window_height = window.innerHeight;
      const y = yOffset + window_height;

      console.log(block);
      console.log(y,contentHeight);
      if (y >= contentHeight) {
        const newData = this.nextMonth(data.year, data.month)
        const newYear = newData[0]
        const newMonth = newData[1]
        this.eventBus.emit(EVENTS.calendarPage.getFilms, newYear, newMonth);
      }
    });
  }

  /**
   * Render content calendar page from pug template to content div.
   * @param {object} data - Contains info about premieres.
   */
  renderFilms = (data) => {
    console.log("render")
    const template = calendarFilmsContent(data);
    const showMoreContainer = document.querySelector('.calendar');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }

  }
}
