import {BaseController} from './baseController.js';
import {ActorPageModel} from '../models/actorModel.js';
import {ActorView} from '../views/ActorView/ActorView.js';
import {renderFilms} from '../utils/showMore.js'
import {EVENTS} from '../consts/EVENTS';

/** Class representing actor page controller. */
export class ActorPageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(ActorView, ActorPageModel);
    this.events.push(
        {event: EVENTS.actorPage.render.content, handler: this.view.renderContent},
        {event: EVENTS.actorPage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.actorPage.getFilms, handler: this.model.getActorFilmsContent},
        {event: EVENTS.actorPage.render.films, handler: renderFilms},
    );
  }
}
