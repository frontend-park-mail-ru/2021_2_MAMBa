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

function collectionsPage(userData) {
  root.innerHTML = '';
  console.log(userData);
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: [{title: 'Подборки', class: 'active-btn'},
      {title: 'Жанры', class: 'menu-btn'},
      {title: 'Релизы', class: 'menu-btn'}],
    authorized: true,
    userName: userData.first_name,
  }));

  // root.appendChild(renderLoader());
  // const mask = document.querySelector('.mask');
  // window.addEventListener('load', () => {
  //   mask.classList.add('hide');
  //   setTimeout(() => {
  //     mask.remove();
  //   }, 600);
  // });
  Ajax.getFetch({url: 'https://film4u.club/api/collections/getCollections?skip=0&limit=12'})
      .then(({status, parsedBody}) => {
        root.insertBefore(renderCollections(parsedBody), root.children[1]);
      })
      .catch((status, parsedBody) => {
        errorPage();
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
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Ajax.getFetch({url: 'https://film4u.club/api/user/logout'})
          .then((response) => {
          })
      loginPage();
    });
  }
}

function signupPage() {
  root.innerHTML ='';
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: [{title: 'Подборки', class: 'menu-btn'},
      {title: 'Жанры', class: 'menu-btn'},
      {title: 'Релизы', class: 'menu-btn'}],
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
    Ajax.postFetch({
      url: 'https://film4u.club/api/user/register',
      body: {email: email, password: password, password_repeat: password,
        first_name: name, surname: surname},
    }).then((response) => {
      if (response && response.status === 201) {
        collectionsPage(response.parsedBody);
        return;
      } else {
        const oldErrors = root.querySelectorAll('.error-mes');
        if (oldErrors.length > 0) {
          root.removeChild(...oldErrors);
        }
        const error = document.createElement('div');
        error.classList.add('error-mes');
        error.innerText = 'Такой пользователь уже существует!';
        root.appendChild(error);
      }
    });
    const loginBtn = root.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        loginPage();
      });
    }
    });
};

function loginPage() {
  root.innerHTML = '';
  root.appendChild(renderHeader({
    staticPath: '/static/',
    btns: [{title: 'Подборки', class: 'menu-btn'},
      {title: 'Жанры', class: 'menu-btn'},
      {title: 'Релизы', class: 'menu-btn'}],
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
    Ajax.postFetch({
      url: 'https://film4u.club/api/user/login',
      body: {email: email, password: password},
    }).then((response) => {
      if (response && response.status === 200) {
        collectionsPage(response.parsedBody);
        return;
      } else {
        const oldErrors = root.querySelectorAll('.error-mes');
        if (oldErrors.length > 0) {
          root.removeChild(...oldErrors);
        }
        const error = document.createElement('div');
        error.classList.add('error-mes');
        error.innerText = 'Неправильный логин или пароль!';
        root.appendChild(error);
      }
    })
    const loginBtn = root.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        loginPage();
      });
    }
  });
}

function checkAuth() {
  Ajax.getFetch({
    url: 'https://film4u.club/api/user/checkAuth',
  }).then((response) => {
    if (response && response.status === 200) {
      Ajax.getFetch({
        url: `https://film4u.club/api/user/${response.parsedBody.id}`,
      }).then((response) => {
        collectionsPage(response.parsedBody);
      })
      return;
    } else {
      loginPage();
    }
  });
}

checkAuth();

root.addEventListener('click', (e) => {
  const {target} = e;

  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();
    configApp[target.dataset.section].open();
  }
});
