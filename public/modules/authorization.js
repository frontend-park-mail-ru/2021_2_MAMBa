import Events from '../consts/events.js';
import {eventBus} from './eventBus';

class Authorization {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    this.getUserFromServer();
    this.eventBus.on(Events.AuthPage.SuccessLogReg, this.getUserFromSubmit);
    // this.eventBus.on(Events.App.Start, this.getUserFromServer);
    this.eventBus.on(Events.Header.LogOut, this.logOutUser);
  }

  getUserFromSubmit = (user) => {
    console.log('aUthik')
    this.user = user;
    console.log(user);
    this.eventBus.emit(Events.Authorization.GotUser, this.user);
  }

  getUserFromServer = () => {
    // TODO fetch// from fetch
    // if (user) {
    //   this.user = user;
    //   this.eventBus.emit(Events.Authorization.GotUser, this.user);
    // }
  }

  logOutUser = () => {
    this.user = null;
    // TODO fetch to server /logoutUser
  }
}

export const authModule = new Authorization(eventBus);
