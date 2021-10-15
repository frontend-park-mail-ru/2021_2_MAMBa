import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
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
        debugger;
        const template = Loader();
        const loader = document.getElementsByTagName('loader');
        console.log(loader);
        if (loader) {
            // document.body.innerHTML = "";
            console.log("in loader");
            loader.outerHTML = template;
        } else
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.Homepage.Get.MainPageContent);
    }

    renderHeader = (data) => {
        const template = Header(data);
        console.log(data);
        console.log(document);
        const header = document.getElementsByTagName('header');
        console.log(header);
        if (header) {
            // document.body.innerHTML = "";
            console.log("in header");
            header.outerHTML = template;
            // ROOT.appendChild(header);
        } else
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        ROOT.innerHTML += template;
    }

    renderContent = (collections) => {
        debugger;
        console.log("render content page");
        const content = document.getElementsByTagName('content');
        console.log(content);
        this._data = collections;
        const template = HomeContent(this._data);
        if (content) {
            console.log("in content", template);
            // ROOT.innerHTML = template;
            // ROOT.innerHTML += template;
            content.outerHTML = template;
            // ROOT.innerHTML += content;
        } else
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        ROOT.innerHTML += template;
        console.log(document);
    }

    renderErrorPage = () => {
        const template = ErrorPage();
        ROOT.innerHTML = template;
    }
}
