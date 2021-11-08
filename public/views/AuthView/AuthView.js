import {BaseView} from '../BaseView/BaseView.js';
import {authConfig, AuthFormName} from '../../consts/authConfig';
import authContent from '../../components/auth/auth.pug';
import authError from '../../components/auth/authError.pug';
import {Events} from '../../consts/events.js';
import {createElementFromHTML} from '../../utils/utils';

export class AuthView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  emitGetContent = () => {
    this.eventBus.emit(Events.AuthPage.GetContent, this.routeData);
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
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addErrorMessage = (inputName, errorMessage) => {
    if (!inputName || !errorMessage) {
      return;
    }
    const authForm = this.getAuthFormFromDom();
    const errorInput = authForm[inputName];
    errorInput.classList.add('error-input');
    authForm.insertBefore(this.createError(errorMessage), errorInput);
  }

  deleteErrorMessage = (inputName, errorMessage) => {
    if (!inputName || !errorMessage) {
      return;
    }
    const errorInput = document.forms[AuthFormName][inputName];
    errorInput.classList.remove('error-input');
    const errorBlocks = document.forms[AuthFormName].querySelectorAll('.error-text');
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
    errorInput.classList.add('error-input_animated');
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
      input.addEventListener('keyup', () => {
        this.eventBus.emit(Events.AuthPage.Validate, input.name, input.value, input.name ===
          authConfig.repPasswordInput.name ? this.getAuthFormFromDom()[authConfig.passwordInput.name].value : '');
      });
      input.addEventListener('animationend', () => {
        input.classList.remove('error-input_animated');
      });
    }
  }

  addSubmitListener = () => {
    const authForm = this.getAuthFormFromDom();
    const submitBtn = document.querySelector('.auth-btn');
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
      this.eventBus.emit(Events.AuthPage.Submit, inputsData, this.routeData);
    });
  }

  createError = (text) => {
    return createElementFromHTML(authError({text: text}));
  }

  getAuthFormFromDom = () => {
    return document.forms[AuthFormName];
  }
}
