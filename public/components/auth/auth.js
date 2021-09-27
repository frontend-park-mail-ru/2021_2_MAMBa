import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(auth(params));
    let content = document.createElement('div');
    content.id = 'auth-content';
    content.appendChild(template);
    return content;
}

includeStyle("auth");

export default render;