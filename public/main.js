import renderHeader from "./components/header/header.js"
import renderFooter from "./components/footer/footer.js"

document.addEventListener("DOMContentLoaded", () => {
    let root = document.getElementById("root");
    root.appendChild( renderHeader({
        staticPath: '/static/',
        btns: ['Подборки', 'Жанры', 'Релизы'],
        authorized: false
    }));
    let bg = document.createElement('img');
    bg.src = '/static/pics/bg_auth.jpg';
    bg.id = 'authlog-bg';
    root.appendChild(bg);
    root.appendChild(renderFooter());
})
