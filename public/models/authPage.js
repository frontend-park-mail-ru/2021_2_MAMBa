import Events from '../consts/events.js';
import { getInfoAboutActor } from '../modules/http';
import {createError} from "../utils/utils";

export class AuthPageModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.errors = new Set();
    this.eventBus.on(Events.AuthPage.GetRegContent, this.getRegContent);
    this.eventBus.on(Events.AuthPage.GetAuthContent, this.getAuthContent);
    this.eventBus.on(Events.AuthPage.Validate, this.validate);
    this.eventBus.on(Events.AuthPage.Submit, this.submit);
  }

  getAuthContent = () => {
    this.errors.clear();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
        {type: 'email', name: 'Email', placeholder: 'Email'},
        {type: 'password', name: 'Password', placeholder: 'Пароль'},
      ],
      auth: true,
    });
  }

  getRegContent = () => {
    this.errors.clear();
    this.eventBus.emit(Events.AuthPage.Render.Content, {
      inputs: [
      {type: 'email', name: 'Email', placeholder: 'Email'},
      {type: 'text', name: 'Surname', placeholder: 'Фамилия'},
      {type: 'text', name: 'Name', placeholder: 'Имя'},
      {type: 'password', name: 'Password', placeholder: 'Пароль'},
      {type: 'password', name: 'RepPassword', placeholder:
      'Повторите пароль'},
    ],
      auth: false,
    });
  }

  validate = (inputParams = {}) => {
    let errorMessages = new Set();
    switch(inputParams.inputName) {
      case 'Email': {
        if (!inputParams.inputValue.match(/\S+@\S+\.\S+/)) {
         errorMessages.add('Неправильный email!');
        }
        break;
      }
      case 'Password': {
        if (!inputParams.inputValue.match(/^(?=.*[0-9])(?=.*[A-z])[A-zА-я0-9]{8,}$/)) {
          if (!inputParams.inputValue.match(/(?=.*[0-9])/)) {
            errorMessages.add('Пароль должен содержать хотя бы 1 цифру!');
          }
          if (!inputParams.inputValue.match(/(?=.*[A-z])/)) {
            errorMessages.add('Пароль должен содержать хотя бы 1 латинскую букву!');
          }
          if (!inputParams.inputValue.match(/[a-zA-Z0-9]{8,}/)) {
            errorMessages.add('Пароль должен содержать хотя бы 8 символов!');
          }
        }
        break;
      }
      case 'RepPassword': {
        if (inputParams.inputValue !== inputParams.passwordValue) {
          errorMessages.add('Пароль должен содержать хотя бы 8 символов!');
        }
        break;
      }
      case 'Name':
        case 'Surname': {
          if (inputParams.inputValue.match(/^.*[^A-zА-яЁё].*$/)) {
            errorMessages.add('Недопускаются цифры и спец символы!');
          }
          break;
        }
        default: {
        }
    }
    if (!errorMessages.size) {
      this.eventBus.emit(Events.AuthPage.AddValidateError, inputParams.inputValue, errorMessages);
      this.errors.add(inputParams.inputName);
    } else {
      this.eventBus.emit(Events.AuthPage.DeleteValidateError, inputParams.inputValue);
      this.errors.delete(inputParams.inputName);
    }
  }

  submit = () => {

  }
}