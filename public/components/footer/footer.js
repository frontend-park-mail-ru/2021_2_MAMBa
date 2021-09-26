import {createElementFromHTML, includeStyle} from "../../modules/utils.js";
import {footer} from "../../templates.js"

function render(params) {
    let template = createElementFromHTML(footer(params));
    return template;
}

includeStyle("footer");

export default render;