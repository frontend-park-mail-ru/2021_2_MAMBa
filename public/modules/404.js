import {EVENTS} from '../consts/EVENTS.js';
import errorPagePug from '../components/404/404.pug';
import {eventBus} from './eventBus';

export class errorPage {
  constructor() {
    this.eventBus = eventBus;
    this.eventBus.on(EVENTS.App.ErrorPage, this.render);
  }

  render = () => {
    const content = document.querySelector('.content');
    if (!content) {
      return;
    }
    content.innerHTML = errorPagePug();
  }
}
