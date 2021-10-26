import { ROOT } from '../../main.js';
import Header from '../../components/header/header.pug';
import Events from '../../consts/events.js';
import {headerLinks} from '../../consts/header';
import {authModule} from '../../modules/authorization';
import {BaseView} from "../BaseView/BaseView";

export class HeaderView extends BaseView {
  constructor(eventBus) {
    super(eventBus);
  }

  render = () => {
    const template = Header(headerLinks);
    const header = document.querySelector('.header');
    if (header) {
      header.innerHTML = template;
    }
    else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  changeActiveButton = (buttonHref) => {
    this.unActiveAllButtons();
    if (buttonHref === null) {
      return;
    }
    let header = this.getHeaderFromDom();
    let buttons = header.querySelectorAll('.menu-btn');
    if (!buttons.length) {
      return;
    }
    for (let button of buttons) {
      if (button.getAttribute('href') === buttonHref) {
        button.classList.add('active-btn');
        return;
      }
    }
  }

  getHeaderFromDom = () => {
    return document.querySelector('.navbar');
  }

  unActiveAllButtons = () => {
    let activeButtons = document.querySelectorAll('.active-btn');
    if (!activeButtons.length) {
      return;
    }
    for (let button of activeButtons) {
      button.classList.remove('active-btn');
    }
  }

  renderUserBlock = () => {
    console.log('render block');
    console.log(authModule.user);
    if (!authModule.user) {
      return;
    }
    const header = this.getHeaderFromDom();
    if (!header) {
      return;
    }
    const enterButton = header.querySelector('.login-btn');
    if (!enterButton) {
      return;
    }
    enterButton.innerHTML = `${authModule.user.first_name}`;
    enterButton.classList.remove('login-btn');
    enterButton.classList.add('user-block');
  }

  renderEnterButton = () => {
  }
}
