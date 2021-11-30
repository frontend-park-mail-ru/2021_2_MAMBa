import {EVENTS} from '../consts/EVENTS.js';
import {statuses} from '../consts/reqStatuses.js';
import {eventBus} from './eventBus';
import {checkAuth, getCurrentUser, logout} from './http';

class Authorization {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    this.lastEvent = null;
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
      this.lastEvent = EVENTS.authorization.gotUser;
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
        return null;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        return response.parsedJson?.body?.id;
      } else {
        this.eventBus.emit(EVENTS.authorization.notLoggedIn);
        this.lastEvent = EVENTS.authorization.notLoggedIn;
        return null;
      }
    }).then((userId) => {
      if (userId) {
        return getCurrentUser(userId);
      }
    }).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        this.user = response.parsedJson?.body;
        if (this.user) {
          this.lastEvent = EVENTS.authorization.gotUser;
          this.eventBus.emit(EVENTS.authorization.gotUser);
          this.eventBus.emit(EVENTS.AuthPage.redirect);
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
      if (response.status === statuses.OK) {
        this.user = null;
        this.lastEvent = EVENTS.authorization.logOutUser;
      }
    }).catch(() => {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    });
  }
}

export const authModule = new Authorization(eventBus);
