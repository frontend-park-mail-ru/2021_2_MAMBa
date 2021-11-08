import {eventBus} from '../modules/eventBus.js';

/** Class representing constructor for controller. */
export class BaseController {
  /**
   * Create an base controller.
   */
  constructor(view, model) {
    this.eventBus = eventBus;
    this.view = new view(eventBus);
    this.model = new model(eventBus);
    this.events = [];
  }
  subscribe = () => {
    this.events.forEach((item) => this.eventBus.on(item.event, item.handler));
  }
  unsubscribe = () => {
    this.events.forEach((item) => this.eventBus.off(item.event, item.handler));
  }
}

