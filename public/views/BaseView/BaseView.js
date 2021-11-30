import {ROOT} from '../../main.js';
import baseViewPug from './BaseView.pug';
import {headerLinks, mobileHeaderLinks} from '../../consts/header';
import loader from '../../components/loader/loader.pug';
import {EVENTS} from '../../consts/EVENTS';

/** Abstract class representing base view. */
export class BaseView {
  /**
   * Create a home page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} - Parameters for view.
   */
  constructor(eventBus, {data = {}} = {}) {
    this._data = data;
    this.eventBus = eventBus;
  }

  emitGetContent = () => {};
  render = (routeData) => {
    this.routeData = routeData;
    const content = document.querySelector('.content');
    if (!content) {
      ROOT.innerHTML = baseViewPug({headerLinks: headerLinks, mobileHeaderLinks: mobileHeaderLinks});
      this.eventBus.emit(EVENTS.Header.Render.header);
    } else {
      content.innerHTML = loader();
    }
    this.emitGetContent();
  }
}
