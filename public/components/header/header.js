import {createElementFromHTML, includeStyle} from "../../modules/utils.js";
import {header} from "../../templates.js"

function render(params) {
    console.log('headerrr');
    let template = createElementFromHTML(header(params));
    return template;
}

includeStyle("header");

export default render;
