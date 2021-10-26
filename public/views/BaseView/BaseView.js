import BaseViewPug from './BaseView.pug'
import Loader from '../../components/loader/loader.pug'
import {headerLinks} from '../../consts/header'
import {ROOT} from "../../main.js";

export class BaseView {
    constructor(eventBus, { data = {} } = {}) {
        this._data = data;
        this.eventBus = eventBus;
    }
    emitGetContent = () => {};
    render = () => {
        const content = document.querySelector('.content');
        console.log('\n\n');
        console.log(content);
        if (!content) {
            ROOT.innerHTML = BaseViewPug(headerLinks);
        } else {
            content.innerHTML = Loader();
        }
        this.emitGetContent();
    }
}
