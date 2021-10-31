import {BaseView} from '../BaseView/BaseView.js';
import filmPageContent from '../../components/film/film.pug';
import successfulSendButton from '../../components/authWarningButton/authWarningButton.pug';
import {Events} from '../../consts/events.js';
import {getPathArgs} from '../../modules/router.js';

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
      this.addSubmitSendReviewListener(data.film.id);
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addSubmitSendReviewListener = (filmId) => {
    const review={
      film_id: filmId,
      text: '',
      review_type: -2,
    };

    const positiveButton= document.querySelector('.type-positive');
    const neutralButton= document.querySelector('.type-neutral');
    const negativeButton= document.querySelector('.type-negative');
    positiveButton.addEventListener('click', (e) => {
      review.review_type = 1;
      positiveButton.classList.add('positive-chosen');
      negativeButton.classList.remove('negative-chosen');
      neutralButton.classList.remove('neutral-chosen');
      this.removeWarning('warning_type');
    });
    neutralButton.addEventListener('click', (e) => {
      review.review_type = 0;
      positiveButton.classList.remove('positive-chosen');
      negativeButton.classList.remove('negative-chosen');
      neutralButton.classList.add('neutral-chosen');
      this.removeWarning('warning_type');
    });
    negativeButton.addEventListener('click', (e) => {
      review.review_type = -1;
      positiveButton.classList.remove('positive-chosen');
      negativeButton.classList.add('negative-chosen');
      neutralButton.classList.remove('neutral-chosen');
      this.removeWarning('warning_type');
    });

    const clearButton= document.querySelector('.clear-button');
    clearButton.addEventListener('click', (e) => {
      document.getElementById('input').value = '';
    });

    const sendButton = this.getSendButtonFromDom();
    sendButton.addEventListener('click', (e) => {
      if (review.review_type===-2) {
        this.renderWarning('Чтобы отправить отзыв, пожалуйста, выберете тип отзывы', 'warning_type');
        return;
      }

      const textInput =document.querySelector('.write_review__text').value;
      if (textInput==='') {
        this.renderWarning('Введите текст отзыва', 'warning_empty-text');
        return;
      }
      review.text=textInput;

      this.eventBus.emit(Events.FilmPage.PostReview, review);
      this.removeWarning('warning_empty-text');
    });
  }


  getSendButtonFromDom = () => {
    return document.querySelector('.send-review');
  }

  /**
   * Render warning to auth.
   */
  renderWarning = (text, className) => {
    const errorBlock= document.querySelector(`.${className}`);
    errorBlock.innerHTML = text;
  }

  /**
   * Remove warning to auth.
   */
  removeWarning = (className) => {
    if (className===undefined) {
      className='warning_no-auth';
    }
    const errorBlock= document.querySelector(`.${className}`);
    if (errorBlock) {
      errorBlock.innerHTML = '';
    }
  }

  /**
   * Render button to successful sending.
   */
  renderSuccessfulSend = () => {
    const template = successfulSendButton();
    const sendButton = this.getSendButtonFromDom();
    if (sendButton) {
      sendButton.innerHTML = template;
    }
  }

  /**
   * Set slider actions.
   */
  setSliderReviewActions = () => {
    const gap = 20;
    const padding = 40;
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
    const itemWidthWithMargin = itemWidth + gap + padding * 2;
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


