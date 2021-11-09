import {Events} from '../consts/events.js';
import errorPagePug from '../components/404/404.pug';
import {eventBus} from './eventBus';

export class errorPage {
  constructor() {
    this.eventBus = eventBus;
    this.eventBus.on(Events.App.ErrorPage, this.render);
  }

  render = () => {
    const content = document.querySelector('.content');
    if (!content) {
      return;
    }
    content.innerHTML = errorPagePug();
  }
}
