import {authModule} from '../modules/authorization';
import {eventBus} from '../modules/eventBus';
import {EVENTS} from '../consts/EVENTS';
import {ROUTES} from '../consts/routes';

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
    eventBus.emit(EVENTS.PathChanged, ROUTES.AuthPage+`?redirect=films/${id}`);
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
}
