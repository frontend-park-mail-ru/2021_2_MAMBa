import {BaseController} from './baseController.js';
import {ActorPageModel} from '../models/actorModel.js';
import {ActorView} from '../views/ActorView/ActorView.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing actor page controller. */
export class ActorPageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(ActorView, ActorPageModel);
    this.events.push(
        {event: EVENTS.ActorPage.GetPageContent, handler: this.view.render},
        {event: EVENTS.ActorPage.Render.Content, handler: this.view.renderContent},
        {event: EVENTS.ActorPage.GetFilms, handler: this.view.addErrorMessage},
        {event: EVENTS.ActorPage.Render.Films, handler: this.view.deleteErrorMessage},
    );
  }
}
