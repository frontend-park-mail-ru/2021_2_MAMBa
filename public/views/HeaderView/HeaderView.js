import headerPug from '../../components/header/navbar.pug';
import enterButton from '../../components/header/enterButton.pug';
import userBlock from '../../components/header/userBlock/userBlock.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {headerLinks} from '../../consts/header';
import {authModule} from '../../modules/authorization';
import {BaseView} from '../BaseView/BaseView';
import {createElementFromHTML} from '../../utils/utils';
const symbolCount = 11;

export class HeaderView extends BaseView {
  constructor(eventBus) {
    super(eventBus);
  }

  render = () => {
    const template = headerPug({headerLinks: headerLinks});
    const header = this.getHeaderFromDom();
    if (header) {
      header.innerHTML = template;
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  changeActiveButton = (buttonHref) => {
    this.unActiveAllButtons();
    if (!buttonHref) {
      return;
    }
    const header = this.getHeaderFromDom();
    const buttons = header.querySelectorAll('.navbar__menu-btn');
    if (!buttons.length) {
      return;
    }
    for (const button of buttons) {
      if (button.getAttribute('href') === buttonHref) {
        button.classList.add('navbar__menu-btn_active');
        return;
      }
    }
  }

  getHeaderFromDom = () => {
    return document.querySelector('.navbar');
  }

  unActiveAllButtons = () => {
    const activeButtons = document.querySelectorAll('.navbar__menu-btn_active');
    if (!activeButtons.length) {
      return;
    }
    for (const button of activeButtons) {
      button.classList.remove('navbar__menu-btn_active');
    }
  }

  renderUserBlock = () => {
    if (!authModule.user) {
      return;
    }
    const changeBlock = document.querySelector('.navbar__login-btn') ||
        document.querySelector('.user-block');
    if (!changeBlock) {
      return;
    }
    const userName = authModule.user.first_name;
    // TODO MAKE CONST INSTEAD OF 11
    changeBlock.innerHTML = userBlock({
      userName: userName.length > symbolCount ? userName.substr(0, symbolCount) + '...' : userName,
      imgSrc: authModule.user.profile_pic,
      userId: authModule.user.id,
    });
    changeBlock.classList.remove('navbar__login-btn');
    changeBlock.classList.add('user-block');
    changeBlock.removeAttribute('href');
    this.addEventListenerToLogoutButton();
  }

  addEventListenerToLogoutButton = () => {
    const logoutButton = document.querySelector('.user-block__logout-btn');
    if (!logoutButton) {
      return;
    }
    logoutButton.addEventListener('click', (e) => {
      this.renderEnterButton();
      this.eventBus.emit(EVENTS.Header.LogOut);
    });
  }

  renderEnterButton = () => {
    const userBlock = document.querySelector('.user-block');
    if (!userBlock) {
      return;
    }
    userBlock.replaceWith(createElementFromHTML(enterButton()));
  }
}
