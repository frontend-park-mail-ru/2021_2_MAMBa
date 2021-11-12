import {EVENTS} from '../consts/EVENTS.js';
import {statuses} from '../consts/reqStatuses.js';
import {eventBus} from './eventBus';
import {checkAuth, getCurrentUser, logout} from './http';

class Authorization {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    if (navigator.onLine) {
      this.getUserFromServer();
    }
    this.eventBus.on(EVENTS.AuthPage.SuccessLogReg, this.getUserFromSubmit);
    this.eventBus.on(EVENTS.Header.LogOut, this.logOutUser);
    this.eventBus.on(EVENTS.ProfilePage.ChangedProfile, this.changeUser);
  }

  getUserFromSubmit = (parsedResponse) => {
    if (!parsedResponse) {
      return;
    }
    this.user = parsedResponse?.body;
    if (this.user) {
      this.eventBus.emit(EVENTS.authorization.gotUser);
    }
  }

  changeUser = (user) => {
    if (!user) {
      return;
    }
    this.user = user;
    if (this.user) {
      this.eventBus.emit(EVENTS.authorization.changedUser);
    }
  }

  getUserFromServer = () => {
    checkAuth().then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        const id = response.parsedJson?.body?.id;
        if (id) {
          getCurrentUser(id).then((response) => {
            if (!response) {
              return;
            }
            if (response?.parsedJson?.status === statuses.OK) {
              this.user = response.parsedJson?.body;
              if (this.user) {
                this.eventBus.emit(EVENTS.authorization.gotUser);
              }
            }
          }).catch(() => {
            this.eventBus.emit(EVENTS.App.ErrorPage);
          });
        }
      }
    }).catch(() => {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    });
  }

  logOutUser = () => {
    logout().then((response) => {
      if (!response) {
        this.eventBus.emit(EVENTS.App.ErrorPage);
      }
      if (response?.parsedJson?.status === statuses.OK) {
        this.user = null;
      }
    }).catch(() => {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    });
  }
}

export const authModule = new Authorization(eventBus);
