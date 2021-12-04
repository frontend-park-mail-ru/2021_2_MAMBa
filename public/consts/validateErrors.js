import {authConfig} from './authConfig';

export const ErrorMessages = {
  [authConfig.emailInput.name]: [{
    text: 'Неправильный email!',
    regexp: new RegExp('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)' +
        '*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$', 'i'),
  }],
  [authConfig.passwordInput.name]: [{
    text: 'Пароль должен содержать хотя бы 1 цифру!',
    regexp: /(?=.*[0-9])/,
  }, {
    text: 'Пароль должен содержать хотя бы 1 латинскую букву!',
    regexp: /(?=.*[A-z])/,
  }, {
    text: 'Пароль должен содержать хотя бы 8 символов!',
    regexp: /[а-яА-Яa-zA-Z0-9]{8,}/,
  }],
  [authConfig.repPasswordInput.name]: [{
    text: 'Пароли не совпадают!',
  }],
  [authConfig.nameInput.name]: [{
    text: 'Количество символов меньше 2 или больше 30 или введены небуквенные символы!',
    regexp: /^[^0-9_!.,\-¡?÷¿/\\+=@#$%ˆ&*(){}| ~<>;:[\]]{2,30}$/,
  }],
  [authConfig.surnameInput.name]: [{
    text: 'Количество символов меньше 2 или больше 30 или введены небуквенные символы!',
    regexp: /^[^0-9_!.,\-¡?÷¿/\\+=@#$%ˆ&*(){}| ~<>;:[\]]{2,30}$/,
  }],
  EmptyField: {
    text: 'Заполните поле!',
  },
};
