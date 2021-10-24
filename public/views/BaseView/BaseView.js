import BaseView from 'BaseView.pug'
import Loader from '../../components/loader/loader.pug'
import {headerLinks} from '../../consts/header'
import {ROOT} from "../../main.js";

export class BaseView {
    constructor(eventBus, { data = {} } = {}) {
        this._data = data;
        this.eventBus = eventBus;
        this.render = () => {
            const content = document.querySelector('.content');
            if (!content) {
                ROOT.innerHTML = BaseView(headerLinks);
            } else {
                content.innerHTML = Loader();
            }
            this.emitGetContent();
        }
        this.emitGetContent = function () {};
    }
}
