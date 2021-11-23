import {BaseView} from '../BaseView/BaseView.js';
import genrePageContent from '../../components/genreFilms/genreFilms.pug';
import genreFilmsContent from '../../components/filmsWithDescription/filmCardsWithDescription.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';

/** Class representing genre page view. */
export class GenreView extends BaseView {
  /**
   * Create genre page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for genre page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.dataGenre;
  }

  /**
   * Render html genre page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/genres/:id');
    this.eventBus.emit(EVENTS.genrePage.getPageContent, pathArgs);
  }

  /**
   * Render content genre page from pug template to content div.
   * @param {Object} data - Contains info about genre`s films.
   */
  renderContent = (data) => {
    const template = genrePageContent(data);
    this.dataGenre = data;
    console.log(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.showScrollMore(this.dataGenre);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  showScrollMore = (data) => {
    window.addEventListener('scroll', () => {
      const block = document.getElementById('infinite-scroll');

      const contentHeight = block.offsetHeight; // 1) высота блока контента вместе с границами
      const yOffset = window.pageYOffset; // 2) текущее положение скролбара
      const window_height = window.innerHeight; // 3) высота внутренней области окна документа
      const y = yOffset + window_height;

      if (y >= contentHeight && this.dataGenre.moreAvailable) {
        const newData = {
          id: data.id,
          skip: data.skip + data.limit,
          limit: data.limit,
        };
        this.eventBus.emit(EVENTS.genrePage.getFilms, newData);
      }
    });
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {object} data - Contains info about actor films.
   */
  renderFilms = (data) => {
    const template = genreFilmsContent(data);
    const showMoreContainer = document.querySelector('.films-with-description__container');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
    this.dataGenre.moreAvailable = data.moreAvailable;
    this.dataGenre.skip = data.skip;
    this.dataGenre.limit = data.limit;
  }
}
