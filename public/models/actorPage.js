import Events from '../consts/events.js';
import { getInfoAboutActor } from '../modules/http';

export class ActorPageModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.ActorPage.GetPageContent, this.getPageContent);
    }

    getPageContent = (actorId) => {
        getInfoAboutActor(actorId.id).then((contentData) => {
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
        }).catch(() => {
            console.log("err in model");
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
