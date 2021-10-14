import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import Header from '../../components/header/header.pug';
import Footer from '../../components/footer/footer.pug';
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
        // this.eventBus.on(Events.Homepage.Render.Footer, this.renderFooter);
    }

    render = () => {
        const template = Loader();
        ROOT.innerHTML = template;
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.Homepage.Get.MainPageContent);

    }

    renderHeader = (data) => {
        console.log("render header", data);
        const template = Header(data);
        const header = document.getElementsByTagName('header');
        if (header) {
            header.outerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.errorPage);
        }
    }

    renderContent = (collections) => {
        console.log("render content page");
        this._data = collections;
        const template = HomeContent(this._data);
        ROOT.innerHTML = template;
    }

    renderErrorPage = () => {
        const template = ErrorPage();
        ROOT.innerHTML = template;
    }

}
