import {renderHeader} from './components/header/header.js';
import {renderFooter} from './components/footer/footer.js';
import {renderAuth} from './components/auth/auth.js';
import {renderLoader} from './components/loader/loader.js';
import {renderCollections} from './components/collections/collections.js';
import {foundErrorFields, addFocusOutListeners} from './utils/utils.js';

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

function collectionsPage() {
  root.innerHTML = '';

  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: ['Подборки', 'Жанры', 'Релизы'],
    authorized: false,
  }));

  root.appendChild(renderLoader());
  const mask = document.querySelector('.mask');
  window.addEventListener('load', () => {
    mask.classList.add('hide');
    setTimeout(() => {
      mask.remove();
    }, 600);
  });

  Ajax.ajaxGet({
    url: '/collections/getCollections/skip=0&limit=12',
    callback: (status, responseText) => {
      try {
        const data = JSON.parse(responseText);
        root.insertBefore(renderCollections(data), root.children[1]);
      } catch (e) {
        errorPage();
      }
    },
  });
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

function signupPage() {
  root.innerHTML ='';
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: ['Подборки', 'Жанры', 'Релизы'],
    authorized: false,
  }));
  root.appendChild(renderAuth({
    inputs: [
      {type: 'email', name: 'email', placeholder: 'Email'},
      {type: 'text', name: 'surname', placeholder: 'Фамилия'},
      {type: 'text', name: 'name', placeholder: 'Имя'},
      {type: 'password', name: 'password', placeholder: 'Пароль'},
      {type: 'password', name: 'reppassword', placeholder: 'Повторите пароль'},
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
  const authForm = document.forms.authForm;
  const sendBtn = authForm.submitBtn;
  addFocusOutListeners(authForm);
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (foundErrorFields(authForm)) {
      return;
    }

    const email = authForm.email.value.trim();
    const password = authForm.password.value.trim();
    const name = authForm.name.value.trim();
    const surname = authForm.surname.value.trim();
    Ajax.ajaxPost({
      url: '/signup',
      body: {email, password, name, surname},
      callback: (status) => {
        console.log(status);
        if (status === 201) {
          collectionsPage();
          return;
        }

        console.log('Wrong data');
      },
    });
  });
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
      {type: 'email', name: 'email', placeholder: 'Email'},
      {type: 'password', name: 'password', placeholder: 'Пароль'},
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
  const authForm = document.forms.authForm;
  const sendBtn = authForm.submitBtn;

  addFocusOutListeners(authForm);
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (foundErrorFields(authForm)) {
      return;
    }

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

function errorPage() {
  root.innerHTML = '<h1>Sorry something went wrong</h1>';
}

collectionsPage();

root.addEventListener('click', (e) => {
  const {target} = e;

  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();

    configApp[target.dataset.section].open();
  }
});
