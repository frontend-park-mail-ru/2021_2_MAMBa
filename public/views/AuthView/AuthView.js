import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import {AuthConfig, AuthFormName, SubmitButtonName} from '../../consts/authConfig';
import Loader from '../../components/loader/loader.pug';
import AuthContent from '../../components/auth/auth.pug';
import Events from '../../consts/events.js';

export class AuthView extends BaseView {
  constructor(eventBus, { data = {} } = {}) {
    super(eventBus, data);
    this.eventBus.on(Events.AuthPage.Render.Page, this.render);
    this.eventBus.on(Events.AuthPage.Render.Content, this.renderContent);
    this.eventBus.on(Events.AuthPage.AddValidateError, this.addErrorMessage);
    this.eventBus.on(Events.AuthPage.DeleteValidateError, this.deleteErrorMessage);
    this.eventBus.on(Events.AuthPage.HavingWrongInput, this.animateWrongInput);
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
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.addValidateListeners();
      this.addLinkListener();
      this.addSubmitListener();
    }
    else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addErrorMessage = (inputName, errorMessage) => {
    if (!inputName || !errorMessage) {
      return;
    }
    const authForm = document.forms[AuthFormName];
    const errorInput = authForm[inputName];
    errorInput.classList.add('error-input');
    authForm.insertBefore(this.createError(errorMessage), errorInput);
  }

  deleteErrorMessage = (inputName, errorMessage) => {
    console.log(inputName, errorMessage);
    if (!inputName || !errorMessage) {
      return;
    }
    const errorInput = document.forms[AuthFormName][inputName];
    errorInput.classList.remove('error-input');
    const errorBlocks = document.forms[AuthFormName].querySelectorAll('.error-text');
    console.log(errorBlocks);
    if (!errorBlocks.length) {
      return;
    }
    for (let errorBlock of errorBlocks) {
      if (errorMessage === errorBlock.innerText) {
        errorBlock.remove();
      }
    }
  }

  animateWrongInput = (inputName) => {
    const errorInput = document.forms[AuthFormName][inputName];
    if (!errorInput) {
      return;
    }
    errorInput.classList.add('animated');
  }

  addValidateListeners = () => {
    const authForm = document.forms[AuthFormName];
    console.log(authForm);
    if (!authForm) {
      return;
    }
    const formTextInputs = authForm.querySelectorAll('.text-inputs');
    if (!formTextInputs.length) {
      return;
    }
    for (const input of formTextInputs) {
      input.addEventListener('keyup', () => {
        this.eventBus.emit(Events.AuthPage.Validate, input.name, input.value, input.name ===
          AuthConfig.repPasswordInput.name  ? document.forms[AuthFormName][AuthConfig.passwordInput.name].value : '');
      })
      input.addEventListener("animationend", () => {
        input.classList.remove("animated");
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
    const authForm = document.forms[AuthFormName];
    const submitBtn = authForm[SubmitButtonName];
    if (!submitBtn) {
      return;
    }
    submitBtn.addEventListener('click', (e) => {
      const formTextInputs = authForm.querySelectorAll('.text-inputs');
      if (!formTextInputs.length) {
        return;
      }
      let inputsData = {};
      for (let input of formTextInputs) {
        inputsData[input.name] = input.value;
      }
      this.eventBus.emit(Events.AuthPage.Submit, inputsData);
    })
  }

  createError = (text) => {
    const errorBlock = document.createElement('div');
    errorBlock.innerText = text;
    errorBlock.classList.add('error-text');
    return errorBlock;
  }
}