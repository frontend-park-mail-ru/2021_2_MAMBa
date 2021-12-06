import {BaseController} from './baseController.js';
import {AuthPageModel} from '../models/authModel.js';
import {AuthView} from '../views/AuthView/AuthView.js';
import {EVENTS} from '../consts/EVENTS';

export class AuthPageController extends BaseController {
  constructor() {
    super(AuthView, AuthPageModel);
    this.events.push(
        {event: EVENTS.AuthPage.Render.Page, handler: this.view.render},
        {event: EVENTS.AuthPage.Render.Content, handler: this.view.renderContent},
        {event: EVENTS.AuthPage.AddValidateError, handler: this.view.addErrorMessage},
        {event: EVENTS.AuthPage.DeleteValidateError, handler: this.view.deleteErrorMessage},
        {event: EVENTS.AuthPage.HavingWrongInput, handler: this.view.animateWrongInput},
        {event: EVENTS.AuthPage.GetContent, handler: this.model.getContent},
        {event: EVENTS.AuthPage.Validate, handler: this.model.validateOneInput},
        {event: EVENTS.AuthPage.Submit, handler: this.model.submit},
        {event: EVENTS.AuthPage.redirect, handler: this.model.redirectToHomeOrLastPage},
        {event: EVENTS.AuthPage.RenderError, handler: this.view.addNotAuthorizedMessage},
        {event: EVENTS.AuthPage.deleteAllErrors, handler: this.model.deleteAllErrorsFromInput},
    );
  }
}
