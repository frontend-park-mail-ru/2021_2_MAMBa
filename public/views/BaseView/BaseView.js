import {ROOT} from '../../main.js';
import BaseViewPug from './BaseView.pug';
import {headerLinks} from '../../consts/header';
import Loader from '../../components/loader/loader.pug';
/** Abstract class representing base view. */
export class BaseView {
  /**
   * Create a home page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {Object} - Parameters for view.
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
      ROOT.innerHTML = BaseViewPug({headerLinks: headerLinks});
    } else {
      content.innerHTML = Loader();
    }
    this.emitGetContent();
  }
}
