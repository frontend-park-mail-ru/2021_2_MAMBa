import {BaseView} from '../BaseView/BaseView.js';
import filmPageContent from '../../components/film/film.pug';
import userRating from '../../components/userRating/userRating.pug';
import readMore from '../../components/textReadMore/textReadMore.pug';
import successfulSendButton from '../../components/successfulSendButton/successfulSendButton.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';
import {setAnchorActions} from '../../utils/anchorAction.js'

/** Class representing film page view. */
export class FilmView extends BaseView {
  /**
   * Create film page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object}- Parameters for film page view.
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
    this.eventBus.emit(EVENTS.filmPage.getPageContent, pathArgs);
  }

  /**
   * Render content film page from pug template to content div.
   * @param {object} data - Contains info about film.
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
      this.rating(data.film.id);
      this.setReadMore(data);
      setAnchorActions();
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  setReadMore = (data) => {
    const summery = document.querySelector('.trailer__summery');
    if (summery.clientHeight > 120) {
      const template = readMore(data);
      const content = document.querySelector('.trailer__summery');
      if (summery) {
        summery.innerHTML = template;
      }
    }
  }


  renderWarningRatingSend = (text) => {
    const ratingArea = document.querySelector('.user_rating');
    if (ratingArea) {
      ratingArea.innerHTML = text;
    }
  }

  renderSuccessfulRatingSend = (rating, newFilmRating) => {
    const Rating = {
      myRating: rating,
    };
    const ratingArea = document.querySelector('.user_rating');
    const template = userRating(Rating);
    if (ratingArea) {
      ratingArea.innerHTML = template;
    }
    const ratingAdapter = (!(newFilmRating % 1) || newFilmRating === 10) ? `${newFilmRating}.0` : newFilmRating;
    const ratingItemStar = document.querySelector('.rating-number-stars');
    const ratingItem = document.querySelector('.rating-number');
    if (ratingItem && ratingItemStar) {
      ratingItem.textContent = `${ratingAdapter}`;
      ratingItemStar.textContent = `${ratingAdapter}`;
    }
  }

  rating = (filmId) => {
    const rating = document.querySelector('.rating__stars');
    const ratingItem = document.querySelectorAll('.rating-item');
    rating.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.classList.contains('rating-item')) {
        removeClass(ratingItem, 'current-active');
        target.classList.add('active', 'current-active');
        const rating = {
          myRating: target.getAttribute('data-rate'),
        };
        this.eventBus.emit(EVENTS.filmPage.postRating, filmId, rating.myRating);
      }
    });
    rating.onmouseover = function(e) {
      const target = e.target;
      if (target.classList.contains('rating-item')) {
        removeClass(ratingItem, 'active');
        target.classList.add('active');
        mouseOverActiveClass(ratingItem);
      }
    };
    rating.onmouseout = function() {
      addClass(ratingItem, 'active');
      mouseOutActiveClass(ratingItem);
    };

    function removeClass(arr) {
      for (let i = 0, iLen = arr.length; i < iLen; i++) {
        for (let j = 1; j < arguments.length; j++) {
          ratingItem[i].classList.remove(arguments[j]);
        }
      }
    }

    function addClass(arr) {
      for (let i = 0, iLen = arr.length; i < iLen; i++) {
        for (let j = 1; j < arguments.length; j++) {
          ratingItem[i].classList.add(arguments[j]);
        }
      }
    }

    function mouseOverActiveClass(arr) {
      for (let i = 0, iLen = arr.length; i < iLen; i++) {
        if (arr[i].classList.contains('active')) {
          break;
        } else {
          arr[i].classList.add('active');
        }
      }
    }

    function mouseOutActiveClass(arr) {
      for (let i = arr.length - 1; i >= 1; i--) {
        if (arr[i].classList.contains('current-active')) {
          break;
        } else {
          arr[i].classList.remove('active');
        }
      }
    }
  }

  addSubmitSendReviewListener = (filmId) => {
    const review = {
      film_id: filmId,
      review_text: '',
      review_type: 0,
    };

    const positiveButton = document.querySelector('.type-positive');
    const neutralButton = document.querySelector('.type-neutral');
    const negativeButton = document.querySelector('.type-negative');
    if (positiveButton && neutralButton && negativeButton) {
      positiveButton.addEventListener('click', () => {
        review.review_type = 3;
        positiveButton.classList.add('positive-chosen');
        negativeButton.classList.remove('negative-chosen');
        neutralButton.classList.remove('neutral-chosen');
        this.removeWarning('warning_type');
      });
      neutralButton.addEventListener('click', () => {
        review.review_type = 2;
        positiveButton.classList.remove('positive-chosen');
        negativeButton.classList.remove('negative-chosen');
        neutralButton.classList.add('neutral-chosen');
        this.removeWarning('warning_type');
      });
      negativeButton.addEventListener('click', () => {
        review.review_type = 1;
        positiveButton.classList.remove('positive-chosen');
        negativeButton.classList.add('negative-chosen');
        neutralButton.classList.remove('neutral-chosen');
        this.removeWarning('warning_type');
      });
    }

    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
      clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        const content = document.getElementById('input');
        if (content) {
          content.value = ' ';
        }
      });
    }

    const sendButton = this.getSendButtonFromDom();
    if (sendButton) {
      sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (review.review_type === 0) {
          this.renderWarning('Чтобы отправить отзыв, пожалуйста, выберете тип отзывы', 'warning_type');
          return;
        }
        const textInput = document.querySelector('.write_review__text').value;
        if (textInput) {
          if (textInput === '') {
            this.renderWarning('Введите текст отзыва', 'warning_empty-text');
            return;
          }
          review.review_text = textInput;
        }
        this.eventBus.emit(EVENTS.filmPage.postReview, review);
        this.removeWarning('warning_empty-text');
      });
    }
  }

  getSendButtonFromDom = () => {
    return document.querySelector('.send-review');
  }

  /**
   * Render warning to auth.
   * @param {string} text - Warning text to render.
   * @param {string} className - Class of warning.
   */
  renderWarning = (text, className) => {
    const errorBlock = document.querySelector(`.${className}`);
    if (errorBlock) {
      errorBlock.innerHTML = text;
    }
  }

  /**
   * Remove warning to auth.
   * @param {string} className - Class of warning.
   */
  removeWarning = (className) => {
    if (!className) {
      className = 'warning_no-auth';
    }
    const errorBlock = document.querySelector(`.${className}`);
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
    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
      clearButton.classList.add('disabled-clear-button');
      clearButton.classList.remove('clear-button');
      clearButton.classList.remove('review_button');
    }

    if (sendButton) {
      sendButton.outerHTML = template;
    }
  }

  /**
   * Set slider actions.
   */
  setSliderReviewActions = () => {
    const gap = 20;
    const padding = 20;
    let position = 0;
    const reviewSlidesToShow = 3;
    const reviewSlidesToScroll = 1;
    const container = document.querySelector('.review-slider-container');
    const track = document.querySelector('.review-slider-container__track');
    const reviews = document.querySelectorAll('.review-slider-container__track_review');
    const reviewCount = reviews.length;
    const btvPrev = document.querySelector('.review-slider-container_button-left');
    const btvNext = document.querySelector('.review-slider-container_button-right');
    const itemWidth = (container.clientWidth - gap * (reviewSlidesToShow) - padding *
        2 * reviewSlidesToShow) / reviewSlidesToShow;
    const itemWidthWithMargin = itemWidth + gap + padding * 2;
    const movePosition = reviewSlidesToScroll * itemWidthWithMargin;

    reviews.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
      item.style.maxWidth = `${itemWidth}px`;
    });

    btvNext.addEventListener('click', (e) => {
      e.preventDefault();
      const itemLeft = reviewCount - (Math.abs(position) + reviewSlidesToShow *
          itemWidthWithMargin) / itemWidthWithMargin;
      position -= itemLeft >= reviewSlidesToScroll ? movePosition : itemLeft * itemWidthWithMargin;
      setPosition();
      checkButtons();
    });

    btvPrev.addEventListener('click', (e) => {
      e.preventDefault();
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
      item.style.maxWidth = `${itemWidth}px`;
      item.style.minWidth = `${itemWidth}px`;
    });

    btvNext.addEventListener('click', () => {
      const itemLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
      position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkButtons();
    });

    btvPrev.addEventListener('click', (e) => {
      e.preventDefault();
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
