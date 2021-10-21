import { ROOT } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import {AuthInputs} from '../../consts/authInputs';
import Loader from '../../components/loader/loader.pug';
import AuthContent from '../../components/auth/auth.pug';
import Events from '../../consts/events.js';

export class AuthView extends BaseView {
  constructor(eventBus, { data = {} } = {}) {
    super(eventBus, data);
    this.eventBus.on(Events.AuthPage.Render.Page, this.render);
    this.eventBus.on(Events.AuthPage.Render.Content, this.renderContent);
    this.eventBus.on(Events.AuthPage.AddValidateError, this.addErrorMessages);
    this.eventBus.on(Events.AuthPage.DeleteValidateError, this.deleteErrorMessages);
    this.eventBus.on(Events.AuthPage.HavingWrongInputs, this.animateWrongInputs);
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
      this.deleteAllErrorMessages();
      this.addValidateListeners();
      this.addLinkListener();
      this.addSubmitListener();
    }
    else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }

  addErrorMessages = (inputName, errorMessages) => {
    if (!inputName || !errorMessages) {
      return;
    }
    const authForm = document.forms.authForm;
    const errorInput = authForm[inputName];
    errorInput.classList.add('error-input');
    errorMessages.forEach((value) => {
        authForm.insertBefore(this.createError(value), errorInput);
    })
  }

  deleteErrorMessages = (inputName, errorMessages) => {
    if (!errorMessages.size || !inputName) {
      return;
    }
    const errorInput = document.forms.authForm[inputName];
    errorInput.classList.remove('error-input');
    const errorBlocks = document.forms.authForm.querySelectorAll('.error-text');
    if (!errorBlocks.length) {
      return;
    }
    for (let errorBlock of errorBlocks) {
      if (errorMessages.has(errorBlock.innerText)) {
        errorBlock.remove();
      }
    }
  }

  deleteAllErrorMessages = () => {
    const errorBlocks = document.querySelectorAll('.error-text');
    if (!errorBlocks.length) {
      return;
    }
    for (let errorBlock in errorBlocks) {
      errorBlock.remove();
    }
  }

  animateWrongInputs = () => {
    const errorInputs = document.querySelectorAll('.error-input');
    if (!errorInputs.length) {
      return;
    }
    for (let input of errorInputs) {
        input.classList.add('animated');
    }
  }

  addValidateListeners = () => {
    const authForm = document.forms.authForm;
    if (!authForm) {
      return;
    }
    const formTextInputs = authForm.querySelectorAll('.text-inputs');
    for (const input of formTextInputs) {
      input.addEventListener('keyup', () => {
        this.eventBus.emit(Events.AuthPage.Validate, {
          inputName: input.name,
          inputValue: input.value,
          passwordValue: input.name === AuthInputs.repPasswordInput.name  ?
              document.forms.authForm[AuthInputs.passwordInput.name].value : '',
        });
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
    const authForm = document.forms.authForm;
    const submitBtn = authForm.submitBtn;
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