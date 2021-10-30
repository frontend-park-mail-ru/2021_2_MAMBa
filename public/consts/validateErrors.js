import {AuthConfig} from './authConfig';

export const ErrorMessages = {
  [AuthConfig.emailInput.name]: [
    {text: 'Неправильный email!',
      regexp: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i},
  ],
  [AuthConfig.passwordInput.name]: [
    {text: 'Пароль должен содержать хотя бы 1 цифру!', regexp: /(?=.*[0-9])/},
    {text: 'Пароль должен содержать хотя бы 1 латинскую букву!', regexp: /(?=.*[A-z])/},
    {text: 'Пароль должен содержать хотя бы 8 символов!', regexp: /[a-zA-Z0-9]{8,}/},
  ],
  [AuthConfig.repPasswordInput.name]: [{text: 'Пароли не совпадают!'}],
  [AuthConfig.nameInput.name]: [
    {text: 'Введены небуквенные символы или их длина меньше 2 или больше 30!', regexp: /^[^0-9_!.,\-¡?÷¿/\\+=@#$%ˆ&*(){}| ~<>;:[\]]{2,30}$/},
  ],
  [AuthConfig.surnameInput.name]: [
    {text: 'Введены небуквенные символы или их длина меньше 2 или больше 30!', regexp: /^[^0-9_!.,\-¡?÷¿/\\+=@#$%ˆ&*(){}| ~<>;:[\]]{2,30}$/},
  ],
  EmptyField: {text: 'Заполните поле!'},
};
