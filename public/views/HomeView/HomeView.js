import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import  BaseViewPug  from '../BaseView/BaseView.pug';
import Header from '../../components/header/header.pug';
import HomeContent from '../../components/collections/collections.pug';
import ErrorPage from '../../components/errorPage/errorPage.pug';
import Loader from '../../components/loader/loader.pug';
import { Events } from '../../consts/events.js';


export class HomePageView extends BaseView {
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.Homepage.Render.Page, this.render);
        this.eventBus.on(Events.Homepage.Render.Header, this.renderHeader);
        this.eventBus.on(Events.Homepage.Render.Content, this.renderContent);
        this.eventBus.on(Events.Homepage.Render.ErrorPage, this.renderErrorPage);
    }

    render = () => {
        const template = Loader();
        ROOT.innerHTML = template;
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.Homepage.Get.MainPageContent);
    }

    renderHeader = (data) => {
        const template = Header(data);
        const [header] = document.getElementsByTagName('header');
        if (header) {
            header.outerHTML = template;
        } else{
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
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
