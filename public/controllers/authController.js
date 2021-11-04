import {BaseController} from './baseController.js';
import {AuthPageModel} from '../models/authModel.js';
import {AuthView} from '../views/AuthView/AuthView.js';
import {Events} from '../consts/events';

export class AuthPageController extends BaseController {
  constructor() {
    super(AuthView, AuthPageModel);
    this.events.push(
        {event: Events.AuthPage.Render.Page, handler: this.view.render},
        {event: Events.AuthPage.Render.Content, handler: this.view.renderContent},
        {event: Events.AuthPage.AddValidateError, handler: this.view.addErrorMessage},
        {event: Events.AuthPage.DeleteValidateError, handler: this.view.deleteErrorMessage},
        {event: Events.AuthPage.HavingWrongInput, handler: this.view.animateWrongInput},
        {event: Events.AuthPage.GetContent, handler: this.model.getContent},
        {event: Events.AuthPage.Validate, handler: this.model.validateOneInput},
        {event: Events.AuthPage.Submit, handler: this.model.submit},
        {event: Events.Authorization.GotUser, handler: this.model.redirectToHomePage},
    );
  }
}
