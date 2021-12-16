import {BaseView} from '../BaseView/BaseView.js';
import filmPageContent from '../../components/film/film.pug';
import userRating from '../../components/userRating/userRating.pug';
import readMore from '../../components/textReadMore/textReadMore.pug';
import {getPathArgs} from '../../modules/router.js';
import {checkAuth, renderWarning} from '../../utils/utils.js';
import {setAnchorActions} from '../../utils/anchorAction.js';
import {ratingNumber} from '../../modules/adapters';
import {EVENTS} from '../../consts/EVENTS.js';
import {slider} from '../../utils/slider';
import {authModule} from '../../modules/authorization';

/** Class representing film page view. */
export class FilmView extends BaseView {
  /**
   * Create film page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object}- Parameters for film page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
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
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      if (data.myReview.reviewText === 0) {
        this.addSubmitSendReviewListener(data.film.id);
      }
      this.rating(data.film.id);
      this.setReadMore(data);
      this.bookmarked(data.film.id);
      setAnchorActions();
      slider('#film-slider');
      slider('#review-slider');
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  setReadMore = (data) => {
    const summery = document.querySelector('.trailer__summery');
    if (summery.clientHeight > 135) {
      const template = readMore(data);
      const content = document.querySelector('.trailer__summery');
      if (content) {
        summery.innerHTML = template;
      }
    }
  }

  renderWarningRatingSend = (text) => {
    const ratingArea = document.querySelector('.user-rating');
    if (ratingArea) {
      ratingArea.innerHTML = text;
    }
  }

  renderSuccessfulRatingSend = (rating, newFilmRating) => {
    const Rating = {
      myRating: rating,
    };
    const ratingArea = document.querySelector('.user-rating');
    const template = userRating(Rating);
    if (ratingArea) {
      ratingArea.innerHTML = template;
    }
    const ratingAdapter = ratingNumber(newFilmRating);
    const ratingItemStar = document.querySelector('.rating-number-stars');
    const ratingItem = document.querySelector('.rating-number');
    if (ratingItem && ratingItemStar) {
      ratingItem.textContent = `${ratingAdapter}`;
      ratingItemStar.textContent = `${ratingAdapter}`;
    }
  }

  bookmarked = (filmId) => {
    const bookmark = document.querySelector('.bookmark');
    if (bookmark) {
      bookmark.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (checkAuth(filmId)) {
          if (target.classList.contains('not_favourite')) {
            bookmark.classList.remove('not_favourite');
            target.classList.add('favourite');
            this.eventBus.emit(EVENTS.filmPage.postBookmark, filmId, true);
          } else if (target.classList.contains('favourite')) {
            bookmark.classList.remove('favourite');
            target.classList.add('not_favourite');
            this.eventBus.emit(EVENTS.filmPage.postBookmark, filmId, false);
          }
        }
      });
    }

    const bookmarkPhone = document.querySelector('.bookmark-phone');
    const bookmarkColorPhone = document.querySelector('.bookmark_mobile');
    const bookmarkTextPhone = document.querySelector('.bookmark-text ');
    if (bookmarkPhone && bookmarkColorPhone && bookmarkTextPhone) {
      bookmarkPhone.addEventListener('click', (e) => {
        e.preventDefault();
        if (checkAuth(filmId)) {
          if (!bookmarkColorPhone.classList.contains('in-favourite')) {
            this.eventBus.emit(EVENTS.filmPage.postBookmark, filmId, true);
            bookmarkTextPhone.textContent = 'В избранном';
          } else if (bookmarkColorPhone.classList.contains('in-favourite')) {
            bookmarkTextPhone.textContent = 'В избранное';
            this.eventBus.emit(EVENTS.filmPage.postBookmark, filmId, false);
          }
        }
        bookmarkColorPhone.classList.toggle('in-favourite');
      });
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
    if (neutralButton) {
      review.review_type = 2;
      neutralButton.classList.add('neutral-chosen');
    }
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
        const textInput = document.querySelector('.write_review__text').value;
        if (textInput === '') {
          renderWarning('Введите текст отзыва', 'warning_empty-text');
          return;
        } else {
          this.removeWarning('warning_empty-text');
        }
        review.review_text = textInput;
        if (!authModule.user) {
          renderWarning(`Чтобы оставить отзыв, пожалуйста, <a href= /auth?redirect=films/${filmId} class = "black_text">зарегистрируйтесь</a>`,
              'warning_no-auth');
        } else {
          this.eventBus.emit(EVENTS.filmPage.postReview, review);
        }
      });
    }
  }

  getSendButtonFromDom = () => {
    return document.querySelector('.send-review');
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
    const sendButton = this.getSendButtonFromDom();
    if (sendButton) {
      sendButton.outerHTML = '<button class = \'send-review-success\' > Ваш отзыв опубликован</button>';
    }
    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
      if (clearButton) {
        clearButton.classList.add('disabled-clear-button');
        clearButton.classList.remove('clear-button');
        clearButton.setAttribute('disabled', 'disabled');
      }
    }

    const reviewInput = document.querySelector('.write_review__text');
    const positiveButton = document.querySelector('.type-positive');
    const neutralButton = document.querySelector('.type-neutral');
    const negativeButton = document.querySelector('.type-negative');
    if (positiveButton && neutralButton && negativeButton && reviewInput) {
      reviewInput.setAttribute('disabled', 'disabled');
      positiveButton.setAttribute('disabled', 'disabled');
      neutralButton.setAttribute('disabled', 'disabled');
      negativeButton.setAttribute('disabled', 'disabled');
    }
  }
}
