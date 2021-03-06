import {EVENTS} from '../consts/EVENTS.js';
import {ErrorMessages} from '../consts/validateErrors';
import {authConfig, AuthFormName, SubmitButtonName} from '../consts/authConfig';
import {Model} from './model';
import {login, register} from '../modules/http';
import {eventBus} from '../modules/eventBus';
import {ROUTES} from '../consts/routes.js';
import {statuses} from '../consts/reqStatuses.js';
import {REGROUTES} from '../consts/routesRegExp';

export class AuthPageModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.errorMessages = new Map();
  }

  getContent = (routeData) => {
    if (routeData.path.path.match(REGROUTES.AuthPage)) {
      this.getAuthContent();
    } else {
      this.getRegContent();
    }
  }

  getAuthContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(EVENTS.AuthPage.Render.Content, {
      inputs: [
        authConfig.emailInput,
        authConfig.passwordInput,
      ],
      authFormName: AuthFormName,
      submitButtonName: SubmitButtonName,
      auth: true,
    });
  }

  redirectToHomeOrLastPage = () => {
    const redirect = new URL(location.href).searchParams.get('redirect');
    if (!redirect) {
      eventBus.emit(EVENTS.PathChanged, {path: ROUTES.homePage});
    } else {
      eventBus.emit(EVENTS.PathChanged, {path: `/${redirect}`});
    }
  }

  getRegContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(EVENTS.AuthPage.Render.Content, {
      inputs: [
        authConfig.emailInput,
        authConfig.surnameInput,
        authConfig.nameInput,
        authConfig.passwordInput,
        authConfig.repPasswordInput,
      ],
      authFormName: AuthFormName,
      submitButtonName: SubmitButtonName,
      auth: false,
    });
  }

  initializeErrorMessages = () => {
    for (const input in authConfig) {
      this.errorMessages.set(authConfig[input].name, new Set());
    }
  }

  addAndEmitError = (inputName, errorText) => {
    const currInputErrSet = this.errorMessages.get(inputName);
    if (!currInputErrSet.has(errorText)) {
      this.eventBus.emit(EVENTS.AuthPage.AddValidateError, inputName, errorText);
      currInputErrSet.add(errorText);
    }
  }

  deleteAndEmitError = (inputName, errorText) => {
    const currInputErrSet = this.errorMessages.get(inputName);
    if (currInputErrSet.has(errorText)) {
      this.eventBus.emit(EVENTS.AuthPage.DeleteValidateError, inputName, errorText);
      currInputErrSet.delete(errorText);
    }
  }

  deleteAllErrorsFromInput = (inputName) => {
    if (!inputName) {
      return;
    }

    for (const error of this.errorMessages.get(inputName)) {
      this.deleteAndEmitError(inputName, error);
    }
  }

  validateOneInput = (inputName, inputValue, passwordValue) => {
    if (!inputName) {
      return;
    }

    if (!inputValue) {
      this.addAndEmitError(inputName, ErrorMessages.EmptyField.text);
      return;
    } else {
      this.deleteAndEmitError(inputName, ErrorMessages.EmptyField.text);
    }

    for (const error of ErrorMessages[inputName]) {
      if (!error.regexp && inputName === authConfig.repPasswordInput.name) {
        if (inputValue !== passwordValue) {
          this.addAndEmitError(inputName, error.text);
        } else {
          this.deleteAndEmitError(inputName, error.text);
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

  submit = (inputsData = {}, routeData) => {
    let hasErrorInputs = false;
    for (const inputName in inputsData) {
      this.validateOneInput(inputName, inputsData[inputName], inputsData[authConfig.passwordInput.name]);
      if (this.errorMessages.get(inputName).size) {
        this.eventBus.emit(EVENTS.AuthPage.HavingWrongInput, inputName);
        hasErrorInputs = true;
      }
    }
    if (hasErrorInputs) {
      return;
    }
    if (routeData?.path?.path.match(REGROUTES.AuthPage)) {
      login(inputsData).then((response) => {
        if (!response) {
          return;
        }
        if (response?.parsedJson?.status === statuses.OK) {
          this.eventBus.emit(EVENTS.AuthPage.SuccessLogReg, response.parsedJson);
          this.redirectToHomeOrLastPage();
        } else {
          this.eventBus.emit(EVENTS.AuthPage.RenderError, '???????????????????????? ?????????? ?????? ????????????!');
        }
      }).catch(() => {
        this.eventBus.emit(EVENTS.App.ErrorPage);
      });
    } else {
      register(inputsData).then((response) => {
        if (!response) {
          return;
        }
        if (response?.parsedJson?.status === statuses.AUTHORIZED) {
          this.eventBus.emit(EVENTS.AuthPage.SuccessLogReg, response.parsedJson);
          this.redirectToHomeOrLastPage();
        } else if (response?.parsedJson?.status === statuses.ALREADY_EXIST) {
          this.eventBus.emit(EVENTS.AuthPage.RenderError, '?????????? ???????????????????????? ?????? ????????!');
        }
      }).catch(() => {
        this.eventBus.emit(EVENTS.App.ErrorPage);
      });
    }
  }
}
