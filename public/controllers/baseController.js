import {eventBus} from '../modules/eventBus.js';

/**
 * Create an base controller.
 */
export class BaseController {
  /** Class representing constructor for controller. */
  constructor(view, model) {
    this.eventBus = eventBus;
    this.view = new view(eventBus);
    this.model = new model(eventBus);
  }
}

