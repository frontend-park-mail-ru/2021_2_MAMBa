import {eventBus} from '../modules/eventBus.js';

/**
 * Create an base controller.
 */
export class BaseController {
  /** Class representing constructor for controller.
   * @param {function} view - View .
   * @param {function} model - Model.
   */
  constructor(view, model) {
    this.eventBus = eventBus;
    this.view = new view(eventBus);
    this.model = new model(eventBus);
  }
}
