import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import Loader from '../../components/loader/loader.pug';
import ActorPageContent from '../../components/actor/actor.pug';
import Events from '../../consts/events.js';
import { getPathArgs } from '../../modules/router.js';

export class ActorView extends BaseView {
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.ActorPage.Render.Page, this.render);
        this.eventBus.on(Events.ActorPage.Render.Content, this.renderContent);
    }

    render = () => {
        const template = Loader();
        ROOT.innerHTML = template;
        const pathArgs = getPathArgs(window.location.pathname, '/actor/:id');
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.ActorPage.GetPageContent, pathArgs);
    }

    renderContent = (data) => {
        this._data = data;
        const template = ActorPageContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {

            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }
}
