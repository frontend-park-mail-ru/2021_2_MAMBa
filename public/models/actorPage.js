import Events from '../consts/events.js';
import { getInfoAboutActor } from '../modules/http';

export class ActorPageModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.ActorPage.GetPageContent, this.getPageContent);
    }

    getPageContent = (actorId) => {
        getInfoAboutActor(actorId.id).then((contentData) => {
            console.log(contentData);
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
        }).catch((err) => {
            console.log("err in model", err);
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
