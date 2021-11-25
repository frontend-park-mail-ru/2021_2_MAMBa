import {authModule} from "../modules/authorization";
import {eventBus} from "../modules/eventBus";
import {EVENTS} from "../consts/EVENTS";
import {ROUTES} from "../consts/routes";

const createElementFromHTML = (html) => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
};
export {createElementFromHTML};


export const checkAuth = () =>{
  if (!authModule.user) {
    eventBus.emit(EVENTS.PathChanged, ROUTES.AuthPage);
    return;
  }
  return true
}
