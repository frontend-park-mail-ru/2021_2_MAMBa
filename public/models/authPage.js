import Events from '../consts/events.js';
import {ErrorMessages} from '../consts/validateErrors';
import {AuthConfig, AuthFormName, SubmitButtonName} from '../consts/authConfig';

export class AuthPageModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.errorMessages = new Map();
    this.eventBus.on(Events.AuthPage.GetRegContent, this.getRegContent);
    this.eventBus.on(Events.AuthPage.GetAuthContent, this.getAuthContent);
    this.eventBus.on(Events.AuthPage.Validate, this.validateOneInput);
    this.eventBus.on(Events.AuthPage.Submit, this.submit);
  }

  getAuthContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
        AuthConfig.emailInput,
        AuthConfig.passwordInput,
      ],
      authFormName: AuthFormName,
      submitButtonName: SubmitButtonName,
      auth: true,
    });
  }

  getRegContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
        AuthConfig.emailInput,
        AuthConfig.surnameInput,
        AuthConfig.nameInput,
        AuthConfig.passwordInput,
        AuthConfig.repPasswordInput,
      ],
      authFormName: AuthFormName,
      submitButtonName: SubmitButtonName,
      auth: false,
    });
  }

  initializeErrorMessages = () => {
    for (let input in AuthConfig) {
      this.errorMessages.set(AuthConfig[input].name, new Set());
    }
  }

  addAndEmitError = (inputName, errorText) => {
    let currInputErrSet = this.errorMessages.get(inputName);
    if (!currInputErrSet.has(errorText)) {
      this.eventBus.emit(Events.AuthPage.AddValidateError, inputName, errorText);
      currInputErrSet.add(errorText);
    }
  }

  deleteAndEmitError = (inputName, errorText) => {
    let currInputErrSet = this.errorMessages.get(inputName);
    if (currInputErrSet.has(errorText)) {
      this.eventBus.emit(Events.AuthPage.DeleteValidateError, inputName, errorText);
      currInputErrSet.delete(errorText);
    }
  }

  validateOneInput = (inputName, inputValue, passwordValue) => {
    if (!inputName) {
      return;
    }

    if (!inputValue) {
      this.addAndEmitError(inputName, ErrorMessages.EmptyField.text);
    } else {
      this.deleteAndEmitError(inputName, ErrorMessages.EmptyField.text);
    }

    for (let error of ErrorMessages[inputName]) {
      if (error.regexp === undefined) {
        if (inputName === AuthConfig.repPasswordInput.name) {
          if (inputValue !== passwordValue) {
            this.addAndEmitError(inputName, error.text);
          } else {
            this.deleteAndEmitError(inputName, error.text);
          }
        }
        return;
      }
      if (!inputValue.match(error.regexp)) {
        this.addAndEmitError(inputName, error.text);
      } else {
        this.deleteAndEmitError(inputName, error.text);
      }
    }
  }

  submit = (inputsData = {}) => {
    let hasErrorInputs = false;
    for (let inputName in inputsData) {
      this.validateOneInput(inputName, inputsData[inputName], inputsData[AuthConfig.passwordInput.name]);
      if (this.errorMessages.get(inputName).size) {
        this.eventBus.emit(Events.AuthPage.HavingWrongInput, inputName);
        hasErrorInputs = true;
      }
    }
    if (!hasErrorInputs) {
      console.log('submit');
      //TODO SEND DATA TO SERVER
    }
  }
}