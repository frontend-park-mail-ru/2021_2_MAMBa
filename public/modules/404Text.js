import {EVENTS} from '../consts/EVENTS.js';
import {eventBus} from './eventBus';

export class errorPageText {
  constructor() {
    this.eventBus = eventBus;
    this.eventBus.on(EVENTS.App.ErrorPageText, this.render);
  }

  render = (text) => {
    const content = document.querySelector('.content');
    if (!content) {
      return;
    }
    content.innerHTML = `div class = "error-block">${text}</div>`;
  }
}
