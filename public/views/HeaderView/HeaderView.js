import Header from '../../components/header/header.pug';
import UserBlock from '../../components/header/userBlock.pug';
import {Events} from '../../consts/events.js';
import {headerLinks} from '../../consts/header';
import {authModule} from '../../modules/authorization';
import {BaseView} from '../BaseView/BaseView';

export class HeaderView extends BaseView {
  constructor(eventBus) {
    super(eventBus);
  }

  render = () => {
    const template = Header(headerLinks);
    const header = document.querySelector('.header');
    if (header) {
      header.innerHTML = template;
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  changeActiveButton = (buttonHref) => {
    this.unActiveAllButtons();
    if (buttonHref === null) {
      return;
    }
    const header = this.getHeaderFromDom();
    const buttons = header.querySelectorAll('.menu-btn');
    if (!buttons.length) {
      return;
    }
    for (const button of buttons) {
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
    const activeButtons = document.querySelectorAll('.active-btn');
    if (!activeButtons.length) {
      return;
    }
    for (const button of activeButtons) {
      button.classList.remove('active-btn');
    }
  }

  renderUserBlock = () => {
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
    enterButton.innerHTML = UserBlock({userName: authModule.user.first_name, imgSrc: authModule.user.profile_pic});
    enterButton.classList.remove('login-btn');
    enterButton.classList.add('user-block');
    enterButton.removeAttribute('href');
    this.addEventListenerToLogoutButton();
  }

  addEventListenerToLogoutButton = () => {
    const logoutButton = document.querySelector('.logout-btn');
    if (!logoutButton) {
      return;
    }
    logoutButton.addEventListener('click', (e) => {
      this.renderEnterButton();
      this.eventBus.emit(Events.Header.LogOut);
    });
  }

  renderEnterButton = () => {
    const userBlock = document.querySelector('.user-block');
    if (!userBlock) {
      return;
    }
    const enterButton = document.createElement('a');
    enterButton.classList.add('login-btn');
    enterButton.setAttribute('href', '/auth');
    enterButton.innerText = 'Войти';
    userBlock.replaceWith(enterButton);
  }
}
