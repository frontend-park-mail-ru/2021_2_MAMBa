import {Events} from '../consts/events.js';
import {ErrorMessages} from '../consts/validateErrors';
import {AuthConfig, AuthFormName, SubmitButtonName} from '../consts/authConfig';
import {Model} from './model';
import {login, register} from '../modules/http';
import {eventBus} from '../modules/eventBus';

export class AuthPageModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.errorMessages = new Map();
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
    for (const input in AuthConfig) {
      this.errorMessages.set(AuthConfig[input].name, new Set());
    }
  }

  addAndEmitError = (inputName, errorText) => {
    const currInputErrSet = this.errorMessages.get(inputName);
    if (!currInputErrSet.has(errorText)) {
      this.eventBus.emit(Events.AuthPage.AddValidateError, inputName, errorText);
      currInputErrSet.add(errorText);
    }
  }

  deleteAndEmitError = (inputName, errorText) => {
    const currInputErrSet = this.errorMessages.get(inputName);
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

    for (const error of ErrorMessages[inputName]) {
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
    for (const inputName in inputsData) {
      this.validateOneInput(inputName, inputsData[inputName], inputsData[AuthConfig.passwordInput.name]);
      if (this.errorMessages.get(inputName).size) {
        this.eventBus.emit(Events.AuthPage.HavingWrongInput, inputName);
        hasErrorInputs = true;
      }
    }
    if (!hasErrorInputs) {
      if (Object.keys(inputsData).length === 2) {
        login(inputsData).then((response) => {
          if (!response) {
            return;
          }
          if (response.status === 200) {
            this.eventBus.emit(Events.AuthPage.SuccessLogReg, response.parsedJson);
            eventBus.emit(Events.PathChanged, '/');
          }
        });
      } else {
        register(inputsData).then((response) => {
          if (!response) {
            return;
          }
          if (response.status === 200) {
            this.eventBus.emit(Events.AuthPage.SuccessLogReg, response.parsedJson);
            eventBus.emit(Events.PathChanged, '/');
          }
        });
      }
    }
  }
}
