import {BaseView} from '../BaseView/BaseView.js';
import genresPageContent from '../../components/genres/genres.pug';
import {EVENTS} from '../../consts/EVENTS.js';

/** Class representing actor page view. */
export class GenresView extends BaseView {
  /**
   * Create actor page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html actor page from pug template.
   */
  emitGetContent = () => {
    this.eventBus.emit(EVENTS.genresPage.getGenresPageContent);
  }

  /**
   * Render content actor page from pug template to content div.
   * @param {Object} data - Contains info about actor.
   */
  renderContent = (data) => {
    const template = genresPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
