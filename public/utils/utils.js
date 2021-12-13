import {authModule} from '../modules/authorization';
import {eventBus} from '../modules/eventBus';
import {EVENTS} from '../consts/EVENTS';
import {ROUTES} from '../consts/routes';
import baseViewPug from '../views/BaseView/BaseView.pug';
import {headerLinks, mobileHeaderLinks} from '../consts/header';

const createElementFromHTML = (html) => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
};
export {createElementFromHTML};

/**
 * Check if the user is logged in
 * @param {number} id - Contains month of premiers to render.
 */
export const checkAuth = (id) =>{
  if (!authModule.user) {
    eventBus.emit(EVENTS.PathChanged, {path: ROUTES.AuthPage+`?redirect=films/${id}`});
    return;
  }
  return true;
};

/**
 * Render warning to auth.
 * @param {string} text - Warning text to render.
 * @param {string} className - Class of warning.
 */
export const renderWarning = (text, className) => {
  const errorBlock = document.querySelector(`.${className}`);
  if (errorBlock) {
    errorBlock.innerHTML = text;
  }
};

export const renderBaseView = () => {
  const userLocalStorage = window.localStorage.getItem('user');
  if (userLocalStorage) {
    const user = JSON.parse(userLocalStorage);
    return baseViewPug({
      headerLinks: headerLinks,
      mobileHeaderLinks: mobileHeaderLinks,
      userName: user.first_name.length > 8 ? user.first_name.substr(0, 8) + '...' : user.first_name,
      imgSrc: user.profile_pic,
      userId: user.id,
      profileHref: ROUTES.Profile,
      userFromStorage: true,
    });
  } else {
    return baseViewPug({
      headerLinks: headerLinks,
      mobileHeaderLinks: mobileHeaderLinks,
      userFromStorage: false,
    });
  }
};
