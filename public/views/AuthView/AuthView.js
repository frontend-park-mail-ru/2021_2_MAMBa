import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import Loader from '../../components/loader/loader.pug';
import AuthContent from '../../components/auth/auth.pug';
import Events from '../../consts/events.js';
import { getPathArgs } from '../../modules/router.js';
import {createError, deleteErrors} from "../../utils/utils";

export class AuthView extends BaseView {
  constructor(eventBus, { data = {} } = {}) {
    super(eventBus, data);
    this.eventBus.on(Events.AuthPage.Render.Page, this.render);
    this.eventBus.on(Events.AuthPage.Render.Content, this.renderContent);
    this.eventBus.on(Events.AuthPage.AddValidateError, this.addErrorMessage);
    this.eventBus.on(Events.AuthPage.DeleteValidateError, this.deleteErrorMessages);
  }

  render = () => {
    const template = Loader();
    ROOT.innerHTML = template;
    this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    this.eventBus.emit(Events.AuthPage.GetAuthContent);
  }

  renderContent = (data) => {
    this._data = data;
    const template = AuthContent(this._data);
    this.addValidateListeners();
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.addSubmitListener();
      this.addLinkListener();
    }
    else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addErrorMessage = (inputName, errorMessages) => {
    const authForm = document.forms.authForm;
    const errorInput = authForm[inputName];
    errorMessages.forEach((value) => {
      authForm.insertBefore(createError(value), errorInput);
    })
  }

  deleteErrorMessages = (inputName) => {
    const errorInput = document.forms.authForm[inputName];
    deleteErrors(errorInput);
  }

  addValidateListeners = () => {
    const authForm = document.forms.authForm;
    if (!authForm) {
      return;
    }
    const formTextInputs = authForm.querySelectorAll('.text-inputs');
    for (const input of formTextInputs) {
      input.addEventListener('keydown', () => {
        this.eventBus.emit(Events.AuthPage.Validate, {
          inputName: input.name,
          inputValue: input.value,
          passwordValue: input.name === 'RepPassword' ? authForm.password.value : '',
        });
      })
    }
  }

  addLinkListener = () => {
    const authRegLink = document.querySelector('.auth-a');
    if (!authRegLink) {
      return;
    }
    authRegLink.addEventListener('click', (e) => {
      if (authRegLink.dataset.link === 'signup') {
        this.eventBus.emit(Events.AuthPage.GetRegContent);
      } else {
        this.eventBus.emit(Events.AuthPage.GetAuthContent);
      }
    })
  }

  addSubmitListener = () => {
    const submitBtn = document.forms.authForm.submitBtn;
    submitBtn.addEventListener('click', (e) => {
        this.eventBus.emit(Events.AuthPage.Submit);
    })
  }
}