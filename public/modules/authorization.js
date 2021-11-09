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
    this.eventBus.on(Events.ProfilePage.ChangedProfile, this.changeUser);
  }

  getUserFromSubmit = (parsedResponse) => {
    if (!parsedResponse) {
      return;
    }
    this.user = parsedResponse?.body;
    if (this.user) {
      this.eventBus.emit(Events.Authorization.GotUser);
    }
  }

  changeUser = (parsedResponse) => {
    if (!parsedResponse) {
      return;
    }
    this.user = parsedResponse?.body;
    if (this.user) {
      this.eventBus.emit(Events.Authorization.GotUser);
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
                this.eventBus.emit(Events.Authorization.GotUser);
              }
            }
          }).catch(() => {
            this.eventBus.emit(Events.App.ErrorPage);
          });
        }
      }
    }).catch(() => {
      this.eventBus.emit(Events.App.ErrorPage);
    });
  }

  logOutUser = () => {
    logout().then((response) => {
      if (!response) {
        this.eventBus.emit(Events.App.ErrorPage);
      }
      if (response?.parsedJson?.status === statuses.OK) {
        this.user = null;
      }
    }).catch(() => {
      this.eventBus.emit(Events.App.ErrorPage);
    });
  }
}

export const authModule = new Authorization(eventBus);
