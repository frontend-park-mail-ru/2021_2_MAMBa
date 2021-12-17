import {BaseView} from '../BaseView/BaseView.js';
import homeContent from '../../components/homePage/homePage.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {mainSlider} from '../../utils/mainSlider';
import {slider} from '../../utils/slider';
import {horizontSlider} from '../../utils/genreSlider';

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

  renderContent = (collections, films) => {
    console.log(collections);
    const homePage = homeContent(collections, films);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = homePage;
      mainSlider('#main-slider');
      slider('#film-slider');
      horizontSlider();
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
