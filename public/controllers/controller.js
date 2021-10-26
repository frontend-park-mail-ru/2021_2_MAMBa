import { eventBus } from '../modules/eventBus.js';
import { Events } from "../consts/events";

export class Controller {
  constructor(view, model) {
    this.eventBus = eventBus;
    this.view = new view(eventBus);
    this.model = new model(eventBus);
    // this.commonSubscribe();
  }
  // commonSubscribe = () => {
  // }
  // commonUnsubscribe = () => {
  // }
}
