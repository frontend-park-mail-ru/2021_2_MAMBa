import enterButton from '../../components/header/enterButton.pug';
import logoutButton from '../../components/header/logoutButton.pug';
import userBlock from '../../components/header/userBlock/userBlock.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {authModule} from '../../modules/authorization';
import {BaseView} from '../BaseView/BaseView';
import {createElementFromHTML, renderBaseView} from '../../utils/utils';
import {ROUTES} from '../../consts/routes';
const symbolCount = 11;
const enterCode = 13;

export class HeaderView extends BaseView {
  constructor(eventBus) {
    super(eventBus);
    this.searchIsClicked = false;
    this.vertMenuIsClicked = false;
  }

  render = () => {
    const template = renderBaseView();
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
      }
    }
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

  renderEnterButton = () => {
    const userBlock = document.querySelector('.user-block');
    if (!userBlock) {
      return;
    }
    userBlock.replaceWith(createElementFromHTML(enterButton()));
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
      const logoutBtn = document.querySelector('#vertical-logout-btn');
      if (logoutBtn) {
        return;
      }
      verticalMenu.appendChild(createElementFromHTML(logoutButton()));
    }
    this.addEventListenerToLogoutButton();
  }

  addEventListenerToLogoutButton = () => {
    const logoutButton = document.querySelectorAll('.user-block__logout-btn');
    if (!logoutButton.length) {
      return;
    }
    logoutButton.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.renderEnterButton();
        this.removeLogoutButton();
        this.eventBus.emit(EVENTS.Header.LogOut);
      });
    });
  }


  addEventListenerToResize = () => {
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth > 450) {
        this.showNavAndHideSearch();
      }
    });
  }


  addEventListenerToSearch = () => {
    const input = document.querySelector('.search__input');
    if (!input) {
      return;
    }

    input.addEventListener('keydown', (e) => {
      if (e.keyCode === enterCode) {
        this.eventBus.emit(EVENTS.PathChanged, {path: `/search?query=${input.value}`});
        if (document.documentElement.clientWidth <= 450) {
          this.showNavAndHideSearch();
          this.searchIsClicked = false;
        }
      }
    });
    const searchBtn = document.querySelector('.search__btn');
    if (!searchBtn) {
      return;
    }
    searchBtn.addEventListener('click', (e) => {
      if (document.documentElement.clientWidth > 450) {
        this.searchIsClicked = false;
        this.eventBus.emit(EVENTS.PathChanged, {path: `/search?query=${input.value}`});
      } else {
        if (this.searchIsClicked) {
          this.searchIsClicked = false;
          this.eventBus.emit(EVENTS.PathChanged, {path: `/search?query=${input.value}`});
        } else {
          this.searchIsClicked = true;
          this.hideNavAndShowSearch();
        }
      }
    });
  }

  showNavAndHideSearch = () => {
    this.searchIsClicked = false;
    const logo = document.querySelector('.navbar__logo');
    const verticalMenu = document.querySelector('.navbar__vertical-menu');
    const searchInput = document.querySelector('.search__input');
    if (logo) {
      logo.style.removeProperty('display');
    }
    if (verticalMenu) {
      verticalMenu.style.removeProperty('display');
    }
    if (searchInput) {
      searchInput.style.removeProperty('visibility');
      searchInput.style.removeProperty('opacity');
    }
  }

  hideNavAndShowSearch = () => {
    const logo = document.querySelector('.navbar__logo');
    const verticalMenu = document.querySelector('.navbar__vertical-menu');
    const searchInput = document.querySelector('.search__input');
    if (logo) {
      logo.style.display = 'none';
    }
    if (verticalMenu) {
      verticalMenu.style.display = 'none';
    }
    if (searchInput) {
      searchInput.style.visibility = 'visible';
      searchInput.style.opacity = '1';
    }
  };


  addEventListenerToVerticalMenu = () => {
    const verticalMenu = document.querySelector('.navbar__vertical-menu');
    if (!verticalMenu) {
      return;
    }
    verticalMenu.addEventListener('click', () => {
      if (!this.vertMenuIsClicked) {
        this.showVerticalMenu();
        this.vertMenuIsClicked = true;
      } else {
        this.hideVerticalMenu();
        this.vertMenuIsClicked = false;
      }
    });
  }

  hideVerticalMenu = () => {
    this.vertMenuIsClicked = false;
    const spanLines = document.querySelectorAll('.vertical-menu-line');
    if (spanLines.length) {
      spanLines.forEach((item) => {
        const lineClass = item.classList.item(1);
        item.classList.remove(lineClass);
        item.classList.add(lineClass.replace('_animated', ''));
      });
    }
    const verticalMenu = document.querySelector('.vertical-menu__btn-container');
    if (!verticalMenu) {
      return;
    }
    verticalMenu.style.visibility = 'hidden';
    verticalMenu.style.opacity = '0';
  }

  showVerticalMenu = () => {
    const spanLines = document.querySelectorAll('.vertical-menu-line');
    if (spanLines.length) {
      spanLines.forEach((item) => {
        const lineClass = item.classList.item(1);
        item.classList.remove(lineClass);
        item.classList.add(`${lineClass}_animated`);
      });
    }
    const verticalMenu = document.querySelector('.vertical-menu__btn-container');
    if (!verticalMenu) {
      return;
    }
    verticalMenu.style.visibility = 'visible';
    verticalMenu.style.opacity = '1';
  }


  getHeaderFromDom = () => {
    return document.querySelector('.navbar');
  }
}
