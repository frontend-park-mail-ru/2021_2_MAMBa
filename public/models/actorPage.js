import Events from '../consts/events.js';
import { getInfoAboutActor } from '../modules/http';
import {Model} from "./model";

export class ActorPageModel extends Model {
    constructor(eventBus) {
        super(eventBus);
    }

    getPageContent = (actorId) => {
        getInfoAboutActor(actorId.id).then((contentData) => {
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
