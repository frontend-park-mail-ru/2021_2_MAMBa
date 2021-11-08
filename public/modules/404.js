import {Events} from '../consts/events.js';
import errorPagePug from '../components/404/404.pug';
import {eventBus} from './eventBus';
import {ROOT} from '../main';
import {headerLinks} from '../consts/header';

export class errorPage {
  constructor() {
    this.eventBus = eventBus;
    this.eventBus.on(Events.App.ErrorPage, this.render);
  }

  render = () => {
    if (!ROOT) {
      return;
    }
    ROOT.innerHTML = errorPagePug({headerLinks: headerLinks});
  }
}
