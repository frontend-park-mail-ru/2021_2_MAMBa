import Events from '../consts/events.js';
import {ErrorMessages} from '../consts/validateErrors';
import {AuthInputs} from '../consts/authInputs';
import {diffSet} from "../utils/utils";

export class AuthPageModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.errorMessages = new Map();
    this.eventBus.on(Events.AuthPage.GetRegContent, this.getRegContent);
    this.eventBus.on(Events.AuthPage.GetAuthContent, this.getAuthContent);
    this.eventBus.on(Events.AuthPage.Validate, this.validate);
    this.eventBus.on(Events.AuthPage.Submit, this.submit);
  }

  getAuthContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
        AuthInputs.emailInput,
        AuthInputs.passwordInput,
      ],
      auth: true,
    });
  }

  getRegContent = () => {
    this.errorMessages.clear();
    this.initializeErrorMessages();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
        AuthInputs.emailInput,
        AuthInputs.surnameInput,
        AuthInputs.nameInput,
        AuthInputs.passwordInput,
        AuthInputs.repPasswordInput,
      ],
      auth: false,
    });
  }

  initializeErrorMessages = () => {
    for (let input in AuthInputs) {
      this.errorMessages.set(AuthInputs[input].name, new Set());
    }
  }

  validate = (inputParams = {}) => {
    let newErrorMessages = new Set();
    switch(inputParams.inputName) {
      case 'Email': {
        if (!inputParams.inputValue.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)) {
          newErrorMessages.add(ErrorMessages.wrongEmail);
        }
        break;
      }
      case 'Password': {
        if (!inputParams.inputValue.match(/^(?=.*[0-9])(?=.*[A-z])[A-zА-я0-9]{8,}$/)) {
          if (!inputParams.inputValue.match(/(?=.*[0-9])/)) {
            newErrorMessages.add(ErrorMessages.wrongPassword.atLeastOneNumber);
          }
          if (!inputParams.inputValue.match(/(?=.*[A-z])/)) {
            newErrorMessages.add(ErrorMessages.wrongPassword.atLeastOneLatin);
          }
          if (!inputParams.inputValue.match(/[a-zA-Z0-9]{8,}/)) {
            newErrorMessages.add(ErrorMessages.wrongPassword.atLeastEightSymbols);
          }
        }
        break;
      }
      case 'RepPassword': {
        if (inputParams.inputValue !== inputParams.passwordValue) {
          newErrorMessages.add(ErrorMessages.wrongPassword.notSame);
        }
        break;
      }
      case 'Name':
      case 'Surname': {
          if (inputParams.inputValue.match(/^.*[^A-zА-яЁё].*$/)) {
            newErrorMessages.add(ErrorMessages.wrongName);
          }
          break;
        }
        default: {
        }
    }

    const errorMessagesInCurrInput = this.errorMessages.get(inputParams.inputName);
    const toDeleteErrors = diffSet(errorMessagesInCurrInput, newErrorMessages);
    const toAddErrors = diffSet(newErrorMessages, errorMessagesInCurrInput);

    if (toAddErrors.size) {
      for (let error of toAddErrors) {
        errorMessagesInCurrInput.add(error);
      }
      this.eventBus.emit(Events.AuthPage.AddValidateError, inputParams.inputName, toAddErrors);
    }
    if (toDeleteErrors.size) {
      for (let error of toDeleteErrors) {
        errorMessagesInCurrInput.delete(error);
      }
      this.eventBus.emit(Events.AuthPage.DeleteValidateError, inputParams.inputName, toDeleteErrors);
    }
  }

  submit = (inputsData = {}) => {
    let hasErrors = false;
    for (let inputName in inputsData) {
      if (inputsData[inputName] === '') {
        if (!this.errorMessages.get(inputName).has(ErrorMessages.emptyField)) {
          this.eventBus.emit(Events.AuthPage.AddValidateError, inputName, new Set([ErrorMessages.emptyField]));
          this.errorMessages.get(inputName).add(ErrorMessages.emptyField);
        }
      }
      if (this.errorMessages.get(inputName).size) {
        hasErrors = true;
      }
    }
    if (hasErrors) {
      console.log('has errors');
      this.eventBus.emit(Events.AuthPage.HavingWrongInputs);
      return;
    }
    console.log('submit');
    //TODO SEND DATA TO SERVER
  }
}