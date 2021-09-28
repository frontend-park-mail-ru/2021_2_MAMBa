import {renderHeader} from './components/header/header.js';
import {renderFooter} from './components/footer/footer.js';
import {renderAuth} from './components/auth/auth.js';

const root = document.getElementById('root');

const configApp = {
  signup: {
    href: '/signup',
    name: 'Регистрация',
    open: signupPage,
  },
  login: {
    href: '/login',
    name: 'Авторизация',
    open: loginPage,
  },
  collections: {
    href: '/collections',
    name: 'Подборки',
    open: collectionsPage,
  },
};

function signupPage() {
  root.innerHTML ='';
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: ['Подборки', 'Жанры', 'Релизы'],
    authorized: false,
  }));
  root.appendChild(renderAuth({
    inputs: [
      {type: 'text', name: 'email', placeholder: 'Email'},
      {type: 'text', name: 'surname', placeholder: 'Фамилия'},
      {type: 'text', name: 'name', placeholder: 'Имя'},
      {type: 'text', name: 'password', placeholder: 'Пароль'},
      {type: 'text', name: 'reppassword', placeholder: 'Повторите пароль'},
    ],
    url: {
      signup: '/signup',
      login: '/login',
    },
    auth: false,
  }));
  root.appendChild(renderFooter({
    url: {
      vk: 'https://vk.com/feed',
      inst: 'https://instagram.com/',
      alex: '',
      max: '',
      mar: '',
      bor: '',
    },
  }));
}

function loginPage() {
  root.innerHTML ='';
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: ['Подборки', 'Жанры', 'Релизы'],
    authorized: false,
  }));
  root.appendChild(renderAuth({
    inputs: [
      {type: 'text', name: 'email', placeholder: 'Email'},
      {type: 'text', name: 'password', placeholder: 'Пароль'},
    ],
    url: {
      signup: '/signup',
      login: '/login',
    },
    auth: true,
  }));
  root.appendChild(renderFooter({
    url: {
      vk: 'https://vk.com/feed',
      inst: 'https://instagram.com/',
      alex: '',
      max: '',
      mar: '',
      bor: '',
    },
  }));
  const sendBtn = document.forms.authForm.submitBtn;
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.forms.authForm.email.value.trim();
    const password = document.forms.authForm.password.value.trim();
    Ajax.ajaxPost({
      url: '/login',
      body: {email, password},
      callback: (status) => {
        if (status === 200) {
          collectionsPage();
          return;
        }

        console.log('Wrong pass or email');
      },
    });
  });
}

function collectionsPage() {
  root.innerHTML = '<h1>SUCCESS</h1>';
}

signupPage();

root.addEventListener('click', (e) => {
  const {target} = e;

  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();
    configApp[target.dataset.section].open();
  }
});
