import {BaseView} from '../BaseView/BaseView.js';
import actorPageContent from '../../components/actor/actor.pug';
import actorFilmsContent from '../../components/filmsWithDescription/filmCardsWithDescription.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';
import {showMore} from '../../utils/showMore.js'
import {checkShowMoreButton} from '../../utils/showMore.js'
import {setAnchorActions} from '../../utils/anchorAction.js'

/** Class representing actor page view. */
export class ActorView extends BaseView {
  /**
   * Create actor page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.dataActor;
  }

  /**
   * Render html actor page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/actor/:id');
    this.eventBus.emit(EVENTS.actorPage.getPageContent, pathArgs);
  }

  /**
   * Render content actor page from pug template to content div.
   * @param {Object} data - Contains info about actor.
   */
  renderContent = (data) => {
    const template = actorPageContent(data);
    this.dataActor= data;
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      setAnchorActions();
      this.setSliderActions();
      checkShowMoreButton(this.dataActor.moreAvailable,".button__show-more" )
      showMore(this.dataActor, ".button__show-more", EVENTS.actorPage.getFilms);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {object} data - Contains info about actor films.
   */
  renderFilms = (data) => {
    const template = actorFilmsContent(data);
    const showMoreContainer = document.querySelector('.films-with-description__container');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
    this.dataActor.moreAvailable=data.moreAvailable;
    this.dataActor.skip= data.skip;
    this.dataActor.limit=data.limit;
    checkShowMoreButton(this.dataActor.moreAvailable, ".button__show-more");
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

    btvNext.addEventListener('click', (e) => {
      e.preventDefault();
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
