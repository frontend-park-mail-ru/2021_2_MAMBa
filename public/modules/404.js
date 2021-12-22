import {EVENTS} from '../consts/EVENTS.js';
import errorPagePug from '../components/404/404.pug';
import {renderBaseView} from '../utils/utils.js';
import {eventBus} from './eventBus';
import {ROOT} from '../main';

export class errorPage {
  constructor() {
    this.eventBus = eventBus;
    this.eventBus.on(EVENTS.App.ErrorPage, this.render);
  }

  render = () => {
    const content = document.querySelector('.content');
    if (!content) {
      ROOT.innerHTML = renderBaseView();
      document.querySelector('.content').innerHTML = errorPagePug();
    } else {
      content.innerHTML = errorPagePug();
    }
  }
}
