import {ROOT} from '../../main.js';
import loader from '../../components/loader/loader.pug';
import {EVENTS} from '../../consts/EVENTS';
import {renderBaseView} from '../../utils/utils';

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
      ROOT.innerHTML = renderBaseView();
      this.eventBus.emit(EVENTS.Header.Render.header);
    } else {
      content.innerHTML = loader();
    }
    this.emitGetContent();
  }
}
