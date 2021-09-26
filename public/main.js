import renderHeader from "./components/header/header.js"
import renderFooter from "./components/footer/footer.js"
import renderAuth from "./components/auth/auth.js"

let root = document.getElementById("root");
puglatizer.options
root.appendChild( renderHeader({
    staticPath: '/static/',
    btns: ['Подборки', 'Жанры', 'Релизы'],
    authorized: false
}));
let content = document.createElement('div');
content.id = 'auth-content';
content.appendChild(renderAuth({
    inputs: [
        {type: 'text', name: 'email', placeholder: 'Email'},
        {type: 'text', name: 'surname', placeholder: 'Фамилия'},
        {type: 'text', name: 'name', placeholder: 'Имя'},
        {type: 'text', name: 'password', placeholder: 'Пароль'},
        {type: 'text', name: 'reppassword', placeholder: 'Повторите пароль'},
    ],
    auth:false
}));
root.appendChild(content);
root.appendChild(renderFooter());
