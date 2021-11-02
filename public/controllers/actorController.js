import {BaseController} from './baseController.js';
import {ActorPageModel} from '../models/actorModel.js';
import {ActorView} from '../views/ActorView/ActorView.js';
import {Events} from '../consts/events';

/** Class representing actor page controller. */
export class ActorPageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(ActorView, ActorPageModel);
    this.subscribe();
  }
  // TODO: заменить на массив
  subscribe = () => {
    this.eventBus.on(Events.ActorPage.GetPageContent, this.model.getPageContent);
    this.eventBus.on(Events.ActorPage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.ActorPage.GetFilms, this.model.getActorFilmsContent);
    this.eventBus.on(Events.ActorPage.Render.Films, this.view.renderFilms);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.ActorPage.GetPageContent, this.model.getPageContent);
    this.eventBus.off(Events.ActorPage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.ActorPage.GetFilms, this.model.getActorFilmsContent);
    this.eventBus.off(Events.ActorPage.Render.Films, this.view.renderFilms);
  }
}
