import {BaseView} from '../BaseView/BaseView.js';
import calendarPageContent from '../../components/calendar/calendar.pug';
// import genreFilmsContent from '../../components/filmsWithDescription/filmCardsWithDescription.pug';
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
    this.dataCalendar;
  }

  /**
   * Render html genre page from pug template.
   */
  emitGetContent = () => {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    let monthName
    // Преобразуем месяца
    switch (month)
    {
      case 0: monthName="января"; break;
      case 1: monthName="февраля"; break;
      case 2: monthName="марта"; break;
      case 3: monthName="апреля"; break;
      case 4: monthName="мае"; break;
      case 5: monthName="июня"; break;
      case 6: monthName="июля"; break;
      case 7: monthName="августа"; break;
      case 8: monthName="сентября"; break;
      case 9: monthName="октября"; break;
      case 10: monthName="ноября"; break;
      case 11: monthName="декабря"; break;
    }
    // const splittedDate = splitDate(date);
    // const year = splittedDate[0];
    // const month = splittedDate[1];
    // const day = splittedDate[2];
    // console.log(year);
    // console.log(month);
    // console.log(day);
    this.eventBus.emit(EVENTS.calendarPage.getPageContent,year, month+1);
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
      this.showScrollMore();
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  showScrollMore = () => {
    // window.addEventListener('scroll', () => {
    //   const block = document.getElementById('infinite-scroll');
    //
    //   const contentHeight = block.offsetHeight;
    //   const yOffset = window.pageYOffset;
    //   const window_height = window.innerHeight;
    //   const y = yOffset + window_height;
    //
    //   if (y >= contentHeight && this.dataGenre.moreAvailable) {
    //     const newData = {
    //       id: data.id,
    //       skip: data.skip + data.limit,
    //       limit: data.limit,
    //     };
    //     this.eventBus.emit(EVENTS.genrePage.getFilms, newData);
    //   }
    // });
  }

  /**
   * Render content calendar page from pug template to content div.
   * @param {object} data - Contains info about premieres.
   */
  renderFilms = (data) => {
    // const template = genreFilmsContent(data);
    // const showMoreContainer = document.querySelector('.films-with-description__container');
    // if (showMoreContainer) {
    //   showMoreContainer.innerHTML += template;
    // }
    // this.dataGenre.moreAvailable = data.moreAvailable;
    // this.dataGenre.skip = data.skip;
    // this.dataGenre.limit = data.limit;
  }
}
