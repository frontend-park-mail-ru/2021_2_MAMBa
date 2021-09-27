import {createElementFromHTML, includeStyle} from "../../modules/utils.js";

function render(params) {
    let template = createElementFromHTML(collections(params));
    let content = document.createElement('div');
    content.id = 'collections-content';
    content.appendChild(template);
    return content;
}

includeStyle("collections");

export default render;