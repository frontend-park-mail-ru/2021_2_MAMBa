import {eventBus} from '../modules/eventBus.js';
import {Controller} from './controller.js';
import {ActorPageModel} from '../models/actorPage.js';
import {ActorView} from '../views/ActorView/ActorView.js';
import {Events} from '../consts/events';

/** Class representing actor page controller. */
export class ActorPagePageController extends Controller {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super();
    this.eventBus = eventBus;
    this.model = new ActorPageModel(this.eventBus);
    this.view = new ActorView(this.eventBus);
    this.eventBus.on(Events.ActorPage.Render.Page, this.view.render);
    this.eventBus.on(Events.ActorPage.Render.Content, this.view.renderContent);
  }
}
