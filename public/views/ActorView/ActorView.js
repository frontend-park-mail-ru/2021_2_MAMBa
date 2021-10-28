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

      this.setAnchorActions();
      this.setSliderActions();
      this.showMore();
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }


  showMore = () => {
    let data={
      id:1,
      skip:3,
      limit:3
    }
    const Button = document.querySelector('.next-page');

    Button.addEventListener('click', ()=>{
      console.log("clock");
      // this.draw(data)

      // this.eventBus.emit(Events.ActorPage.GetFilms, data);
    })
  }

  renderFilms = (data)=>{
    const list = document.querySelector('.showMoreContainer');
    const newElements = data.filmsWithDescription.map((item) => {
      const newContainer = document.createElement('div');
      newContainer.classList.add('item')
      const img = document.createElement('img');
      img.setAttribute('src', item.film_avatar);
      newContainer.appendChild(img);
      return newContainer;
    })

    newElements.forEach(element => {
      list.appendChild(element);
    })
  }

  draw = (data) => {
    const list = document.querySelector('.showMoreContainer');
    const newElements = data.filmsWithDescription.map((item) => {
      const newContainer = document.createElement('div');
      newContainer.classList.add('item')
      const img = document.createElement('img');
      img.setAttribute('src', item.film_avatar);
      newContainer.appendChild(img);
      return newContainer;
    })

    newElements.forEach(element => {
      list.appendChild(element);
    })
  }

  /**
   * Set slider actions.
   */
  setSliderActions = () => {
    let position = 0;
    const slidesToShow = 6;
    const slidesToScroll = 1;
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.film-collection_pics');
    const itemCount = items.length;
    console.log(itemCount);
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
      if (position === 0) {
        btvPrev.classList.add('hidden');
      } else {
        btvPrev.classList.remove("hidden");
      }

      if (position <= -(itemCount - slidesToShow) * itemWidth) {
        btvNext.classList.add('hidden');
      } else {
        btvNext.classList.remove("hidden");
      }
    };
    checkBnts();
  }
  /**
   * Set anchor actions.
   */
  setAnchorActions = () => {
    const anchors = document.querySelectorAll('a.scroll-to');

    for (const anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href');
        console.log(blockID);

        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }

}
