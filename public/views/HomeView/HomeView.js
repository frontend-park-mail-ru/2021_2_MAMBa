import {BaseView} from '../BaseView/BaseView.js';
import homeContent from '../../components/homePage/homePage.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {mainSlider} from '../../utils/mainSlider';
import {slider} from '../../utils/slider';
import liSliderPug from '../../components/slider/sliderNotMixin.pug';

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
   * @param {object} data - Contains info about home infp.
   */

  renderContent = (data) => {
    console.log(data)
    console.log("data.mainSliderContent", data.mainSliderContent)
    const homePage = homeContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = homePage;
      mainSlider('#main-slider');
      slider('#film-slider');
      slider('#genre-slider');
      slider('#collections-slider');
      this.homeMenu(data)
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  homeMenu = (data) => {
    const liPopularFilms = document.querySelector(`.popularFilms`);
    const liPremiere = document.querySelector(`.premiereLi`);
    const liSlider = document.querySelector(`.liSlider`);
    if (liPopularFilms && liSlider && liPremiere) {
      liPopularFilms.addEventListener('click', (e) => {
        e.preventDefault();
        const films = {
          films: data.popularFilms
        }
        if (!liPopularFilms.classList.contains('subtitle_chosen')) {
          liSlider.innerHTML = liSliderPug(films);
          liPremiere.classList.remove('subtitle_chosen');
          liPopularFilms.classList.add('subtitle_chosen');
        }
        slider('#film-slider');
      });
      liPremiere.addEventListener('click', (e) => {
        e.preventDefault();
        const films = {
          films: data.premieres
        }
        if (!liPremiere.classList.contains('subtitle_chosen')) {
          liSlider.innerHTML = liSliderPug(films);
          liPremiere.classList.add('subtitle_chosen');
          liPopularFilms.classList.remove('subtitle_chosen');
          slider('#film-slider');
        }
      });
    }
  };

}
