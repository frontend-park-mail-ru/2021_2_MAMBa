import {BaseView} from '../BaseView/BaseView.js';
import actorPageContent from '../../components/actor/actor.pug';
import actorFilmsContent from '../../components/filmsWithDescription/filmCardsWithDescription.pug';
import {Events} from '../../consts/events.js';
import {getPathArgs} from '../../modules/router.js';

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
    this.eventBus.emit(Events.ActorPage.GetPageContent, pathArgs);
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
      this.setAnchorActions();
      this.setSliderActions();
      this.showMore(this.dataActor);
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  checkShowMoreButton = (available) => {
    const buttonShowMore = document.querySelector('.show-more-films');
    if (!available) {
      buttonShowMore.classList.add('hidden');
    }
  }

  showMore = (data) => {
    const newData = {
      id: data.id,
      skip: data.skip + data.limit,
      limit: data.limit,
    };
    const buttonShowMore = document.querySelector('.show-more-films');
    buttonShowMore.addEventListener('click', (e) => {
      e.preventDefault();
      this.eventBus.emit(Events.ActorPage.GetFilms, newData);
    });
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {Object} data - Contains info about actor films.
   */
  renderFilms = (data) => {
    const template = actorFilmsContent(data);
    const showMoreContainer = document.querySelector('.actor-info__black-container_films-with-description_container');
    if (showMoreContainer) {
      showMoreContainer.innerHTML += template;
    }
    this.dataActor.moreAvailable=data.moreAvailable;
    this.dataActor.skip= data.skip;
    this.dataActor.limit=data.limit;
    this.checkShowMoreButton(this.dataActor.moreAvailable);
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
  /**
   * Set anchor actions.
   */
  setAnchorActions = () => {
    const anchors = document.querySelectorAll('a.scroll-to');

    for (const anchor of anchors) {
      anchor.addEventListener('click', (e) =>{
        e.preventDefault();

        const blockID = anchor.getAttribute('href');

        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }
}
