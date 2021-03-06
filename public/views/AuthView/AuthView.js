import {BaseView} from '../BaseView/BaseView.js';
import {authConfig, AuthFormName} from '../../consts/authConfig';
import authContent from '../../components/auth/auth.pug';
import authError from '../../components/auth/authError/authError.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {createElementFromHTML} from '../../utils/utils';
import {ROUTES} from '../../consts/routes';
import {REGROUTES} from '../../consts/routesRegExp';

export class AuthView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  emitGetContent = () => {
    this.eventBus.emit(EVENTS.AuthPage.GetContent, this.routeData);
  }

  renderContent = (data) => {
    this._data = data;
    const template = authContent(this._data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.addValidateListeners();
      this.addSubmitListener();
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }

  addErrorMessage = (inputName, errorMessage) => {
    if (!inputName || !errorMessage) {
      return;
    }
    const authForm = this.getAuthFormFromDom();
    const errorInput = authForm[inputName];
    errorInput.classList.add('auth-error-input');
    authForm.insertBefore(this.createError(errorMessage), errorInput.nextSibling);
  }

  addNotAuthorizedMessage = (message) => {
    this.deleteNotAuthorizedMessage();
    const submitBtn = this.routeData.path.path === ROUTES.AuthPage ? document.querySelector('.auth__btn') :
        document.querySelector('.reg__btn');
    if (!submitBtn) {
      return;
    }
    const authForm = this.getAuthFormFromDom();
    const errorDiv = this.createError(message);
    errorDiv.classList.add('not-authorized-error');
    errorDiv.style.textAlign = 'center';
    authForm.insertBefore(errorDiv, submitBtn);
  }

  deleteNotAuthorizedMessage = () => {
    const message = document.querySelector('.not-authorized-error');
    if (message) {
      message.remove();
    }
  }

  deleteErrorMessage = (inputName, errorMessage) => {
    if (!inputName || !errorMessage) {
      return;
    }
    const errorInput = document.forms[AuthFormName][inputName];
    errorInput.classList.remove('auth-error-input');
    const errorBlocks = document.forms[AuthFormName].querySelectorAll('.auth-error-text');
    if (!errorBlocks.length) {
      return;
    }
    for (const errorBlock of errorBlocks) {
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
    errorInput.classList.add('auth-error-input_animated');
  }

  addValidateListeners = () => {
    const authForm = this.getAuthFormFromDom();
    if (!authForm) {
      return;
    }
    const formTextInputs = authForm.querySelectorAll('.text-inputs');
    if (!formTextInputs.length) {
      return;
    }
    for (const input of formTextInputs) {
      input.addEventListener('input', () => {
        this.eventBus.emit(EVENTS.AuthPage.deleteAllErrors, input.name);
        this.deleteNotAuthorizedMessage();
      });
      input.addEventListener('change', () => {
        this.eventBus.emit(EVENTS.AuthPage.Validate, input.name, input.value, input.name ===
        authConfig.repPasswordInput.name ? this.getAuthFormFromDom()[authConfig.passwordInput.name].value : '');
      });
      input.addEventListener('animationend', () => {
        input.classList.remove('auth-error-input_animated');
      });
    }
  }

  addSubmitListener = () => {
    const authForm = this.getAuthFormFromDom();
    const submitBtn = document.querySelector(
        this.routeData.path.path.match(REGROUTES.AuthPage) ? '.auth__btn' : '.reg__btn');
    if (!submitBtn) {
      return;
    }
    submitBtn.addEventListener('click', (e) => {
      const formTextInputs = authForm.querySelectorAll('.text-inputs');
      if (!formTextInputs.length) {
        return;
      }
      const inputsData = {};
      for (const input of formTextInputs) {
        inputsData[input.name] = input.value;
      }
      this.eventBus.emit(EVENTS.AuthPage.Submit, inputsData, this.routeData);
    });
  }

  createError = (text) => {
    return createElementFromHTML(authError({text: text}));
  }

  getAuthFormFromDom = () => {
    return document.forms[AuthFormName];
  }
}
