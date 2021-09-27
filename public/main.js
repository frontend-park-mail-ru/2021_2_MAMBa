import renderCollections from "./components/collections/collections.js"
import renderHeader from "./components/header/header.js"
import renderFooter from "./components/footer/footer.js"
import renderAuth from "./components/auth/auth.js"
import renderLoader from "./components/loader/loader.js";

let root = document.getElementById("root");

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
}

function collectionsPage() {
    root.innerHTML = '';
    root.appendChild(renderLoader());
    let mask = document.querySelector('.mask');

    window.addEventListener('load', () => {
        mask.classList.add('hide');
        setTimeout(() => {
            mask.remove();
        }, 5000);
    });
    root.appendChild(renderHeader({
        staticPath: '/static/',
        btns: ['Подборки', 'Жанры', 'Релизы'],
        authorized: false
    }));

    Ajax.ajaxGet({
        url: '/collections/getCollections/skip=0&limit=12',
        callback: (status, responseText) => {
            try {
                const data = JSON.parse(responseText);
                root.appendChild(renderCollections(data));
            } catch (e) {
                console.log(e);
                alert('ОШИБКА СЕРВЕРА');
                errorPage();
            }
        }
    });
    root.appendChild(renderFooter());
}

function signupPage() {
    root.innerHTML = '';
    root.appendChild(renderHeader({
        staticPath: '/static/',
        btns: ['Подборки', 'Жанры', 'Релизы'],
        authorized: false
    }));
    root.appendChild(renderAuth({
        inputs: [
            {type: 'text', name: 'email', placeholder: 'Email'},
            {type: 'text', name: 'surname', placeholder: 'Фамилия'},
            {type: 'text', name: 'name', placeholder: 'Имя'},
            {type: 'text', name: 'password', placeholder: 'Пароль'},
            {type: 'text', name: 'reppassword', placeholder: 'Повторите пароль'},
        ],
        auth: false
    }));
    root.appendChild(renderFooter());
}

function loginPage() {
    root.innerHTML = '';
    root.appendChild(renderHeader({
        staticPath: '/static/',
        btns: ['Подборки', 'Жанры', 'Релизы'],
        authorized: false
    }));
    root.appendChild(renderAuth({
        inputs: [
            {type: 'text', name: 'email', placeholder: 'Email'},
            {type: 'text', name: 'password', placeholder: 'Пароль'},
        ],
        auth: true
    }));
    root.appendChild(renderFooter());
    let sendBtn = document.forms.authForm.submitBtn;
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.forms.authForm.email.value.trim();
        const password = document.forms.authForm.password.value.trim();
        Ajax.ajaxPost({
            url: '/login',
            body: {email, password},
            callback: (status) => {
                if (status === 200) {
                    collectionsPage().then();
                    return;
                }
                alert('Wrong pass or email');
            }
        });
    })
}

collectionsPage();

function errorPage() {
    root.innerHTML = '<h1>Sorry something went wrong</h1>';
}

// signupPage();

root.addEventListener('click', e => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();

        configApp[target.dataset.section].open();
    }
})
