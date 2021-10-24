import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import {AuthConfig, AuthFormName, SubmitButtonName} from '../../consts/authConfig';
import Loader from '../../components/loader/loader.pug';
import Header from '../../components/header/header.pug';
import Events from '../../consts/events.js';

export class HeaderView extends BaseView {
  constructor(eventBus, { data = {} } = {}) {
    super(eventBus, data);
    this.user = null;
    this.eventBus.on(Events.Header.Render.Content, this.renderContent);
    this.eventBus.on(Events.Header.ChangeAuth, this.changeAuth);
  }

  emitGetContent = () => {
    this.eventBus.emit(Events.Header.GetHeaderContent);
  }

  changeAuth = () => {
  }

  renderContent = (data) => {
    this._data = data;
    const template = Header(this._data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    }
    else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }
}