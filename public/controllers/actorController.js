import {BaseController} from './baseController.js';
import {ActorPageModel} from '../models/actorModel.js';
import {ActorView} from '../views/ActorView/ActorView.js';
import {Events} from '../consts/events';

/** Class representing actor page controller. */
export class ActorPagePageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(ActorView, ActorPageModel);
  }

  subscribe = () => {
    this.eventBus.on(Events.ActorPage.GetPageContent, this.model.getPageContent);
    this.eventBus.on(Events.ActorPage.Render.Page, this.view.render);
    this.eventBus.on(Events.ActorPage.Render.Content, this.view.renderContent);
  }

  unsubscribe = () => {
    this.eventBus.on(Events.ActorPage.GetPageContent, this.model.getPageContent);
    this.eventBus.on(Events.ActorPage.Render.Page, this.view.render);
    this.eventBus.on(Events.ActorPage.Render.Content, this.view.renderContent);
  }
}
