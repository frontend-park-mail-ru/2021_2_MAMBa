import {BaseView} from './BaseView/BaseView.js';
import filmPageContent from './../components/film/film.pug';
import inputReviewContent from './../components/writeReview/writeReview.pug';
import {Events} from '../consts/events.js';
import {getPathArgs} from '../modules/router.js';
import actorFilmsContent from "../components/filmsWithDescription/filmCardsWithDescription.pug";

/** Class representing film page view. */
export class FilmView extends BaseView {
  /**
   * Create film page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {Object}- Parameters for film page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.dataFilm;
  }

  /**
   * Render html film page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/film/:id');
    this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    this.eventBus.emit(Events.FilmPage.GetPageContent, pathArgs);
  }

  /**
   * Render content film page from pug template to content div.
   * @param {Object} data - Contains info about film.
   */
  renderContent = (data) => {
    const template = filmPageContent(data);
    this.dataFilm = data;
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.setSliderReviewActions();
      this.setSliderActions();
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addEventListenerToLogout = () => {
    const logoutButton = document.querySelector('.logout-btn');
    if (!logoutButton) {
      return;
    }
    logoutButton.addEventListener('click', (e) => {
      this.eventBus.emit(Events.FilmPage.Render.WriteReview);
    });
  }

  renderInputReview = () => {
    const d = document.querySelector('.input_review');
    console.log("кут");
    const template = inputReviewContent();

    console.log(d);
    if (d) {
      d.innerHTML += template;
    }
    // this.dataActor.moreAvailable = data.moreAvailable;
    // this.dataActor.skip = data.skip;
    // this.dataActor.limit = data.limit;
    // this.checkShowMoreButton(this.dataActor.moreAvailable);
  }

  /**
   * Set slider actions.
   */
  setSliderReviewActions = () => {
    let gap = 20;
    let padding = 40;
    let position = 0;
    const reviewSlidesToShow = 3;
    const reviewSlidesToScroll = 1;
    const container = document.querySelector('.review-slider-container');
    const track = document.querySelector('.review-slider-container__track');
    const reviews = document.querySelectorAll('.review-slider-container__track_review');
    const reviewCount = reviews.length;
    const btvPrev = document.querySelector('.review-slider-container_button-left');
    const btvNext = document.querySelector('.review-slider-container_button-right');
    const itemWidth = (container.clientWidth - gap * (reviewSlidesToShow) - padding * 2 * reviewSlidesToShow) / reviewSlidesToShow;
    const itemWidthWithMargin = itemWidth + gap + padding * 2
    const movePosition = reviewSlidesToScroll * itemWidthWithMargin;

    reviews.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
    });

    btvNext.addEventListener('click', () => {
      const itemLeft = reviewCount - (Math.abs(position) + reviewSlidesToShow * itemWidthWithMargin) / itemWidthWithMargin;
      position -= itemLeft >= reviewSlidesToScroll ? movePosition : itemLeft * itemWidthWithMargin;
      setPosition();
      checkButtons();
    });

    btvPrev.addEventListener('click', () => {
      const itemLeft = Math.abs(position) / itemWidthWithMargin;
      position += itemLeft >= reviewSlidesToScroll ? movePosition : itemLeft * itemWidthWithMargin;
      setPosition();
      checkButtons();
    });
    /**
     * Set film to the right position.
     */
    const setPosition = () => {
      track.style.transform = `translateX(${position}px`;
    };
    /**
     * Check buttons.
     */
    const checkButtons = () => {
      if (position === 0) {
        btvPrev.classList.add('hidden');
      } else {
        btvPrev.classList.remove('hidden');
      }

      if (position <= -(reviewCount - reviewSlidesToShow) * itemWidthWithMargin) {
        btvNext.classList.add('hidden');
      } else {
        btvNext.classList.remove('hidden');
      }
    };
    checkButtons();
  }
  /**
   * Set slider actions.
   */
  setSliderActions = () => {
    let position = 0;
    const slidesToShow = 6;
    const slidesToScroll = 1;
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-container__track');
    const items = document.querySelectorAll('.slider-container__track_film');
    const itemCount = items.length;
    const btvPrev = document.querySelector('.slider-container_button-left');
    const btvNext = document.querySelector('.slider-container_button-right');
    const itemWidth = container.clientWidth / slidesToShow;
    const movePosition = slidesToScroll * itemWidth;

    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
    });

    btvNext.addEventListener('click', () => {
      const itemLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
      position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkButtons();
    });

    btvPrev.addEventListener('click', () => {
      const itemLeft = Math.abs(position) / itemWidth;
      position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkButtons();
    });
    /**
     * Set film to the right position.
     */
    const setPosition = () => {
      track.style.transform = `translateX(${position}px`;
    };
    /**
     * Check buttons.
     */
    const checkButtons = () => {
      if (position === 0) {
        btvPrev.classList.add('hidden');
      } else {
        btvPrev.classList.remove('hidden');
      }

      if (position <= -(itemCount - slidesToShow) * itemWidth) {
        btvNext.classList.add('hidden');
      } else {
        btvNext.classList.remove('hidden');
      }
    };
    checkButtons();
  }

}


