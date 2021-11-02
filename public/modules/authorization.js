import {Events} from '../consts/events.js';
import {eventBus} from './eventBus';
import {checkAuth, getCurrentUser} from './http';

class Authorization {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    this.getUserFromServer();
    this.eventBus.on(Events.AuthPage.SuccessLogReg, this.getUserFromSubmit);
    this.eventBus.on(Events.Header.LogOut, this.logOutUser);
  }

  getUserFromSubmit = (parsedResponse) => {
    this.user = parsedResponse;
    this.eventBus.emit(Events.Authorization.GotUser);
  }

  getUserFromServer = () => {
    checkAuth().then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        const id = response.parsedJson.id;
        if (id) {
          getCurrentUser(id).then((response) => {
            if (!response) {
              return;
            }
            if (response.status === 200) {
              this.user = response.parsedJson;
              this.eventBus.emit(Events.Authorization.GotUser);
            }
          });
        }
      }
    }).catch(() => {
      console.log('4');
    });
  }

  logOutUser = () => {
    this.user = null;
    // TODO fetch to server /logoutUser
  }
}

export const authModule = new Authorization(eventBus);
