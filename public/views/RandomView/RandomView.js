import {BaseView} from '../BaseView/BaseView.js';
import randomPug from '../../components/randomPage/randomPage.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {deployUrl, URLS} from '../../consts/urls';
import {ROUTES} from '../../consts/routes';
import {REGROUTES} from '../../consts/routesRegExp';


export class RandomView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  emitGetContent = () => {
    this.eventBus.emit(EVENTS.randomPage.getPageContent);
  }

  renderContent = (data) => {
    const content = document.querySelector('.content');
    if (!content) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    content.innerHTML = randomPug(data);
    this.setupCarousel(true);
    this.setupNavigation();
    this.handlerResize = () => {
      if (!window.location.pathname.match(REGROUTES.randomPage)) {
        this.removeEventListenerToResize();
      } else {
        this.setupCarousel();
      }
    };
    this.addEventListenerToResize();
    this.addEventListenerToMouseOnOver();
  }

  addEventListenerToResize = () => {
    window.addEventListener('resize', this.handlerResize);
  }

  removeEventListenerToResize = () => {
    window.removeEventListener('resize', this.handlerResize);
  }

  addEventListenerToMouseOnOver = () => {
    this.carouselFigure.addEventListener('mouseover', () => {
      this.deleteAutoRotate();
    });
    this.carouselFigure.addEventListener('mouseout', () => {
      this.autoRotate();
    });
  }

  setupCarousel = (startSetup = false) => {
    this.carouselFigure = document.querySelector('.carousel-random__card-container');
    this.carouselCards = document.querySelectorAll('.carousel-random__card');
    this.oneAngle = 2 * Math.PI / this.carouselCards.length;

    if (startSetup || !this.currentCardIndex) {
      this.currentCardIndex = 0;
    }

    if (!this.carouselFigure || !this.carouselCards || !this.hasOwnProperty('currentCardIndex') || !this.oneAngle) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }

    const imageWidth = this.carouselCards[0].clientWidth;

    const apothem = imageWidth / (2 * Math.tan(this.oneAngle / 2));
    this.carouselFigure.style.transformOrigin = `50% 50% ${-apothem}px`;

    this.carouselCards.forEach((card, index) => {
      card.style.transformOrigin = `50% 50% ${-apothem}px`;
      card.style.transform = `rotateY(${index * this.oneAngle}rad)`;
    });
    if (startSetup) {
      this.autoRotate();
    }
  }

  setupNavigation = () => {
    const btnContainer = document.querySelector('.carousel-random__btn-container');
    btnContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.classList.contains('carousel-random__next-btn')) {
        this.currentCardIndex++;
      } else {
        this.currentCardIndex--;
      }
      this.rotateCarousel(this.currentCardIndex);
    });
  }

  rotateCarousel = (imageIndex) => {
    this.carouselFigure.style.transform = `rotateY(${imageIndex * -this.oneAngle}rad)`;
  }

  autoRotate = (interval = 1400) => {
    if (this.autoRotateInterval) {
      this.deleteAutoRotate();
    }
    this.autoRotateInterval = setInterval(() => {
      this.currentCardIndex++;
      this.rotateCarousel(this.currentCardIndex);
    }, interval);
  }

  deleteAutoRotate = () => {
    clearInterval(this.autoRotateInterval);
  }
}
