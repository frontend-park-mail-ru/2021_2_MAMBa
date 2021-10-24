import Events from '../consts/events.js';

export class AuthorizationModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.user = null;
    this.eventBus.on(Events.AuthPage.Submit, this.getUserFromSubmit);
    this.eventBus.on(Events.App.Start, this.getUserFromServer);
    this.eventBus.on(Events.Header.LogOut, this.logOutUser);
  }

  getUserFromSubmit = (user) => {
    this.user = user;
    this.eventBus.emit(Events.Authorization.GotUser, this.user);
  }

  getUserFromServer = () => {
    // TODO fetch
    let user = null; // from fetch
    if (user) {
      this.user = user;
      this.eventBus.emit(Events.Authorization.GotUser, this.user);
    }
  }

  logOutUser = () => {
    // TODO fetch to server /logoutUser
  }
}
