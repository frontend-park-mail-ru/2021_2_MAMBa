import {BaseView} from '../BaseView/BaseView.js';
import collectionFilmsPageContent from '../../components/collectionFilms/collectionFilms.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';

/** Class representing collection page view. */
export class CollectionView extends BaseView {
  /**
   * Create collection page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object}- Parameters for film page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html collection page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/film/:id');
    this.eventBus.emit(EVENTS.collectionPage.getPageContent, pathArgs);
  }

  /**
   * Render content collection page from pug template to content div.
   * @param {object} data - Contains info about collection.
   */
  renderContent = (data) => {
    const template = collectionFilmsPageContent(data);
    this.dataFilm = data;
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      this.eventBus.emit(EVENTS.homepage.render.errorPage);
    }
  }
}
