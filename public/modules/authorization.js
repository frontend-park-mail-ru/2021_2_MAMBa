import {Events} from '../consts/events.js';
import {statuses} from '../consts/reqStatuses.js';
import {eventBus} from './eventBus';
import {checkAuth, getCurrentUser, logout} from './http';

class Authorization {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    this.getUserFromServer();
    this.eventBus.on(Events.AuthPage.SuccessLogReg, this.getUserFromSubmit);
    this.eventBus.on(Events.Header.LogOut, this.logOutUser);
  }

  getUserFromSubmit = (parsedResponse) => {
    if (!parsedResponse) {
      return;
    }
    this.user = parsedResponse;
    this.eventBus.emit(Events.Authorization.GotUser);
  }

  getUserFromServer = () => {
    checkAuth().then((response) => {
      if (!response) {
        return;
      }
      if (response.status === statuses.OK) {
        const id = response.parsedJson?.id;
        if (id) {
          getCurrentUser(id).then((response) => {
            if (!response) {
              return;
            }
            if (response.status === statuses.OK) {
              this.user = response.parsedJson;
              this.eventBus.emit(Events.Authorization.GotUser);
            }
          }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
          });
        }
      }
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }

  logOutUser = () => {
    logout().then((response) => {
      if (response?.status === statuses.OK) {
        this.user = null;
      }
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }
}

export const authModule = new Authorization(eventBus);
