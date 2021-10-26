import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import HomeContent from '../../components/collections/collections.pug';
import ErrorPage from '../../components/errorPage/errorPage.pug';
import { Events } from '../../consts/events.js';
import {getPathArgs} from "../../modules/router";


export class HomePageView extends BaseView {
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
    }

    emitGetContent = () => {
        this.eventBus.emit(Events.Homepage.Get.MainPageContent);
    }

    renderContent = (collections) => {
        this._data = collections;
        const template = HomeContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }

    renderErrorPage = () => {
        const template = ErrorPage();
        ROOT.innerHTML = template;
    }
}
