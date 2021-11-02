import {ROOT} from '../../main.js';
import {BaseView} from '../BaseView/BaseView.js';
import header from '../../components/header/header.pug';
import homeContent from '../../components/collections/collections.pug';
import errorPage from '../../components/errorPage/errorPage.pug';
import {Events} from '../../consts/events.js';

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
    this.eventBus.emit(Events.Homepage.Get.MainPageContent);
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
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  /**
   * Render error page from pug template.
   */
  renderErrorPage = () => {
    ROOT.innerHTML = errorPage();
  }
}
