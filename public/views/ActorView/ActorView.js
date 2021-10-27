import {BaseView} from '../BaseView/BaseView.js';
import actorPageContent from '../../components/actor/actor.pug';
import {Events} from '../../consts/events.js';
import {getPathArgs} from '../../modules/router.js';

/** Class representing actor page view. */
export class ActorView extends BaseView {
  /**
   * Create actor page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {Object}- Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.eventBus.on(Events.SliderActions, this.setSliderActions);
  }

  /**
   * Render html favourites page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/actor/:id');
    this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    this.eventBus.emit(Events.ActorPage.GetPageContent, pathArgs);
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {Object} data - Contains info about actor.
   */
  renderContent = (data) => {
    const template = actorPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      const anchors = document.querySelectorAll('a.scroll-to');

      for (const anchor of anchors) {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();

          const blockID = anchor.getAttribute('href');

          document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      }
      let position = 0;
      const slidesToShow = 6;
      const slidesToScroll = 1;
      const container = document.querySelector('.slider-container');
      const track = document.querySelector('.slider-track');
      const items = document.querySelectorAll('.film-collection_pics');
      const itemCount = items.length;
      const btvPrev = document.querySelector('.btn-prev');
      const btvNext = document.querySelector('.btn-next');
      const itemWidth = container.clientWidth / slidesToShow;
      const movePosition = slidesToScroll * itemWidth;

      items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`;
      });

      btvNext.addEventListener('click', () => {
        const itemLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
        position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
        setPosition();
        checkBnts();
      });

      btvPrev.addEventListener('click', () => {
        const itemLeft = Math.abs(position) / itemWidth;
        position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
        setPosition();
        checkBnts();
      });

      const setPosition = () => {
        track.style.transform = `translateX(${position}px`;
      };

      const checkBnts = () => {
        btvPrev.disabled = position === 0;
        btvNext.disabled = position <= -(itemCount-slidesToShow) * itemWidth;
      };
      checkBnts();
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  /**
   * Set slider actions.
   */
  setSliderActions = () => {
    // slider top
    let position = 0;
    const slidesToShow = 6;
    const slidesToScroll = 1;
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.film-collection_pic');
    const itemCount = items.length;
    const btvPrev = document.querySelector('.btn-prev');
    const btvNext = document.querySelector('.btn-next');
    const itemWidth = container.clientWidth / slidesToShow;
    const movePosition = slidesToScroll * itemWidth;

    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
    });

    btvNext.addEventListener('click', () => {
      const itemLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
      position -= itemLeft >= slidesToShow ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkBnts();
    });

    btvPrev.addEventListener('click', () => {
      const itemLeft = Math.abs(position) / itemWidth;
      position += itemLeft >= slidesToShow ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkBnts();
    });

    const setPosition = () => {
      track.style.transform = `translateX(${position}px`;
    };

    const checkBnts = () => {
      btvPrev.disabled = position === 0;
      btvNext.disabled = position <= -(itemCount - slidesToShow) * itemWidth;
    };
    checkBnts();
  }
}
