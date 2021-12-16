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
    const warning = document.createElement('div');
    warning.classList.add('error-block');
    const loader = document.querySelector('.mask');
    warning.innerHTML = text;
    content.replaceChild(warning, loader)
  }
}
