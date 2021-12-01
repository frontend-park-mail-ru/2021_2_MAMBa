import headerPug from '../../components/header/navbar.pug';
import enterButton from '../../components/header/enterButton.pug';
import logoutButton from '../../components/header/logoutButton.pug';
import userBlock from '../../components/header/userBlock/userBlock.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {headerLinks, mobileHeaderLinks} from '../../consts/header';
import {authModule} from '../../modules/authorization';
import {BaseView} from '../BaseView/BaseView';
import {createElementFromHTML} from '../../utils/utils';
import {ROUTES} from '../../consts/routes';
import {menuObjects} from '../../consts/profileMenu';
const symbolCount = 11;
const enterCode = 13;

export class HeaderView extends BaseView {
  constructor(eventBus) {
    super(eventBus);
  }

  render = () => {
    const template = headerPug({headerLinks: headerLinks, mobileHeaderLinks: mobileHeaderLinks});
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

  hideVerticalMenu = () => {
    const checkBox = document.querySelector('.navbar__vertical-menu input');
    if (!checkBox) {
      return;
    }
    checkBox.checked = false;
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

  removeLogoutButton = () => {
    const logoutBtn = [...document.querySelectorAll('.vertical-menu__btn-container a')]
        .find((elem) => elem.textContent.includes('Выйти'));
    if (logoutBtn) {
      logoutBtn.remove();
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
    changeBlock.replaceWith(createElementFromHTML(userBlock({
      userName: userName.length > symbolCount ? userName.substr(0, symbolCount) + '...' : userName,
      imgSrc: authModule.user.profile_pic,
      userId: authModule.user.id,
      profileHref: ROUTES.Profile,
    })));
    const verticalMenu = document.querySelector('.vertical-menu__btn-container');
    if (verticalMenu) {
      verticalMenu.appendChild(createElementFromHTML(logoutButton()));
    }
    this.addEventListenerToLogoutButton();
  }

  addEventListenerToLogoutButton = () => {
    const logoutButton = document.querySelector('.user-block__logout-btn');
    if (!logoutButton) {
      return;
    }
    logoutButton.addEventListener('click', (e) => {
      this.renderEnterButton();
      this.removeLogoutButton();
      this.eventBus.emit(EVENTS.Header.LogOut);
    });
  }

  addEventListenerToSearch = () => {
    const input = document.querySelector('.search__input');
    if (!input) {
      return;
    }
    input.addEventListener('keydown', (e) => {
      if (e.keyCode === enterCode) {
        this.eventBus.emit(EVENTS.PathChanged, {path: `${ROUTES.search}?query=${input.value}`});
      }
    });
    const button = document.querySelector('.search__btn');
    if (!button) {
      return;
    }
    button.addEventListener('click', (e) => {
      this.eventBus.emit(EVENTS.PathChanged, {path: `${ROUTES.search}?query=${input.value}`});
    });
    const checkbox = document.querySelector('.search__checkbox');
    if (!checkbox) {
      return;
    }
    checkbox.addEventListener('change', (e) => {
      const logo = document.querySelector('.navbar__logo');
      const verticalMenu = document.querySelector('.navbar__vertical-menu');
      const searchInput = document.querySelector('.search__input');
      const searchBtn = document.querySelector('.search__btn');
      if (e.target.checked) {
        if (logo) {
          logo.style.display = 'none';
        }
        if (verticalMenu) {
          verticalMenu.style.display = 'none';
        }
        if (searchInput) {
          searchInput.style.display = 'flex';
          searchInput.style.zIndex = '4';
        }
        if (searchBtn) {
          searchBtn.style.zIndex = '4';
        }
      } else {
        if (logo) {
          logo.style.removeProperty('display');
        }
        if (verticalMenu) {
          verticalMenu.style.removeProperty('display');
        }
        if (searchInput) {
          searchInput.style.removeProperty('display');
          searchInput.style.removeProperty('z-index');
        }
        if (searchBtn) {
          searchBtn.style.removeProperty('z-index');
        }
      }
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
