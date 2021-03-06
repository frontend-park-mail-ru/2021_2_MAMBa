import {BaseView} from '../BaseView/BaseView.js';
import collectionsContent from '../../components/collectionsPage/collectionsPage.pug';
import {EVENTS} from '../../consts/EVENTS.js';

/** Class representing home page view. */
export class CollectionsPageView extends BaseView {
  /**
   * Create a home page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} - Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Emit event to get content for homepage.
   */
  emitGetContent = () => {
    this.eventBus.emit(EVENTS.collectionsPage.get.mainPageContent);
  }

  /**
   * Render content home page from pug template to content div.
   * @param {object} collections - Contains info about collections.
   */
  renderContent = (collections) => {
    const template = collectionsContent(collections);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
