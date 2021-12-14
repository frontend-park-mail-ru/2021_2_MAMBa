import {BaseView} from '../BaseView/BaseView.js';
import homeContent from '../../components/homePage/homePage.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {slider} from "../../utils/slider";

/** Class representing home page view. */
export class HomePageView extends BaseView {
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
    this.eventBus.emit(EVENTS.homepage.get.mainPageContent);
  }

  /**
   * Render content home page from pug template to content div.
   * @param {object} collections - Contains info about collections.
   */
  renderContent = (collections) => {
    const template = homeContent(collections);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      slider('#main-slider');
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
