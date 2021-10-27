import {BaseController} from './baseController.js';
import {AuthPageModel} from '../models/authModel.js';
import {AuthView} from '../views/AuthView/AuthView.js';
import {Events} from '../consts/events';

export class AuthPageController extends BaseController {
  constructor() {
    super(AuthView, AuthPageModel);
    this.subscribe();
  }
  subscribe = () => {
    this.eventBus.on(Events.AuthPage.Render.Page, this.view.render);
    this.eventBus.on(Events.AuthPage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.AuthPage.AddValidateError, this.view.addErrorMessage);
    this.eventBus.on(Events.AuthPage.DeleteValidateError, this.view.deleteErrorMessage);
    this.eventBus.on(Events.AuthPage.HavingWrongInput, this.view.animateWrongInput);
    this.eventBus.on(Events.AuthPage.GetRegContent, this.model.getRegContent);
    this.eventBus.on(Events.AuthPage.GetAuthContent, this.model.getAuthContent);
    this.eventBus.on(Events.AuthPage.Validate, this.model.validateOneInput);
    this.eventBus.on(Events.AuthPage.Submit, this.model.submit);
  }
  unsubscribe = () => {
    this.eventBus.off(Events.AuthPage.Render.Page, this.view.render);
    this.eventBus.off(Events.AuthPage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.AuthPage.AddValidateError, this.view.addErrorMessage);
    this.eventBus.off(Events.AuthPage.DeleteValidateError, this.view.deleteErrorMessage);
    this.eventBus.off(Events.AuthPage.HavingWrongInput, this.view.animateWrongInput);
    this.eventBus.off(Events.AuthPage.GetRegContent, this.model.getRegContent);
    this.eventBus.off(Events.AuthPage.GetAuthContent, this.model.getAuthContent);
    this.eventBus.off(Events.AuthPage.Validate, this.model.validateOneInput);
    this.eventBus.off(Events.AuthPage.Submit, this.model.submit);
  }
}
