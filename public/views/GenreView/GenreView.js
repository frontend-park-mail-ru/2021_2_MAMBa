import {BaseView} from '../BaseView/BaseView.js';
import genrePageContent from '../../components/genreFilms/genreFilms.pug';
import genreFilmsContent from '../../components/filmsWithDescription/filmCardsWithDescription.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';
import premieresNotFound from '../../components/premieresNotFound/premieresNotFound.pug';

/** Class representing genre page view. */
export class GenreView extends BaseView {
  /**
   * Create genre page view.
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
    const pathArgs = getPathArgs(window.location.pathname, '/genres/:id');
    this.eventBus.emit(EVENTS.genrePage.getPageContent, pathArgs);
  }

  /**
   * Render content genre page from pug template to content div.
   * @param {Object} data - Contains info about genre`s films.
   */
  renderContent = (data) => {
    const template = genrePageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.showScrollMore(data);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  showScrollMore = (data) => {
    window.addEventListener('scroll', () => {
      const block = document.getElementById('infinite-scroll');
      let contentHeight = block.offsetHeight;
      const yOffset = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const y = yOffset + windowHeight;
      if (y >= contentHeight && data.moreAvailable) {
        contentHeight = block.offsetHeight;
        data.skip = data.skip + data.limit;
        this.eventBus.emit(EVENTS.genrePage.getFilms, data);
      }
    });
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {object} data - Contains info about actor films.
   * @param {object} dataOfRenderedFilms - Contains info about rendered films.
   */
  renderFilms = (data, dataOfRenderedFilms) => {
    const template = genreFilmsContent(data);
    const showMoreContainer = document.querySelector('.genre__container');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
    dataOfRenderedFilms.moreAvailable = data.moreAvailable;
  }
}
