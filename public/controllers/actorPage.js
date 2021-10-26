import {Controller} from './controller.js';
import { ActorPageModel } from '../models/actorPage.js';
import { ActorView } from '../views/ActorView/ActorView.js';
import Events from "../consts/events";

/** Class representing actor page controller. */
export class ActorPagePageController extends Controller {
    constructor() {
        super(ActorView, ActorPageModel);
        this.subscribe();
    }
    subscribe = () => {
        this.eventBus.on(Events.ActorPage.Render.Page, this.view.render);
        this.eventBus.on(Events.ActorPage.Render.Content, this.view.renderContent);
        this.eventBus.on(Events.ActorPage.GetPageContent, this.model.getPageContent);
    }
    unsubscribe = () => {
        this.eventBus.off(Events.ActorPage.Render.Page, this.render);
        this.eventBus.off(Events.ActorPage.Render.Content, this.renderContent);
        this.eventBus.off(Events.ActorPage.GetPageContent, this.model.getPageContent);
    }
}