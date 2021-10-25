import {ROOT} from '../../main.js';
import {BaseView} from '../BaseView/BaseView.js';
import header from '../../components/header/header.pug';
import homeContent from '../../components/collections/collections.pug';
import errorPage from '../../components/errorPage/errorPage.pug';
import loader from '../../components/loader/loader.pug';
import {Events} from '../../consts/events.js';

/** Class representing home page view. */
export class HomePageView extends BaseView {
  /**
   * Create a home page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {Object} - Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html home page from pug template.
   */
  render = () => {
    const template = loader();
    ROOT.innerHTML = template;
    this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    this.eventBus.emit(Events.Homepage.Get.MainPageContent);
  }

  /**
   * Render header from pug template.
   * @param {Object} data - Contains flag of authorizing and open section.
   */
  renderHeader = (data) => {
    const template = header(data);
    const [headerTag] = document.getElementsByTagName('header');
    if (headerTag) {
      headerTag.outerHTML = template;
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  /**
   * Render content home page from pug template to content div.
   * @param {Object} collections - Contains info about collections.
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
